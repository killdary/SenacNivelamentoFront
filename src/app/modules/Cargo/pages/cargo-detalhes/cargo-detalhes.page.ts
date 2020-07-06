import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargoModel } from '../../Model/cargo.model';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CargoService } from '../../Service/cargo.service';
import { ResponseModel, NotificationsModel } from 'src/app/modules/utils/models/response.model';
import { ModalShowErrosComponent } from 'src/app/modules/shared/components/modal-show-erros/modal-show-erros.component';
import { ENivelAcessoDescricao, ENivelAcesso } from '../../enums/eNivelAcesso.enum';

@Component({
  selector: 'app-cargo-detalhes',
  templateUrl: './cargo-detalhes.page.html',
  styleUrls: ['./cargo-detalhes.page.scss'],
})
export class CargoDetalhesPage implements OnInit {

  public dataFromModal: any;
  public form: FormGroup;
  public desabilitarCampos: boolean = false;
  public usuario: any;
  public operacao: string = 'cadastrar';

  public titulo: string = "Cadastro";
  public niveis = ENivelAcesso;
  

  //variaveis de dados
  public cargo: CargoModel;

  //msg de validacao
  public mensagens_validacao = {
    'nome': [
      { type: 'required', message: 'O nome é obrigatorio.' }
    ],
    'sigla': [
      { type: 'required', message: 'a sigla é obrigatoria.' }
    ]
  }

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private router: Router,
    private cargoService: CargoService,
    public modalCtrl: ModalController) {

    this.form = this.fb.group({
      id: [''],
      nome: ['', Validators.compose([
        Validators.required
      ])],
      sigla: ['', Validators.compose([
        Validators.required
      ])],
      nivelAcesso: ['', Validators.compose([
        Validators.required
      ])],
      dataCriacao: '',
      dataUltimaAtualizacao: ''
    });
  }

  ngOnInit() {
  }


  ionViewDidEnter() {
    let id = +this.route.snapshot.paramMap.get("id");
    if (id) {
      this.buscarCargo(id);
      this.titulo = 'Visualização';
      this.desabilitarCampos = true;
    }

    this.operacao = history.state.operacao? history.state.operacao: 'cadastrar';
    if (this.operacao && this.operacao == 'editar') {
      this.desabilitarCampos = false;
      this.titulo = 'Editar';

    } else {
      this.cargo = {
        id: 0,
        nome: 'Cargo 1',
        sigla:'C1',
        nivelAcesso:0
      }
      this.preencherFormulario();
    }

  }

  preencherFormulario() {

    this.form.controls['id'].setValue(this.cargo.id);
    this.form.controls['nome'].setValue(this.cargo.nome);
    this.form.controls['sigla'].setValue(this.cargo.sigla);
    this.form.controls['nivelAcesso'].setValue(this.cargo.nivelAcesso.toString());
    this.form.controls['dataUltimaAtualizacao'].setValue(this.cargo.dataAtualizacao);
    this.form.controls['dataCriacao'].setValue(this.cargo.dataCriacao);

  }

  async buscarCargo(id: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Buscando...'
    });
    await loading.present();

    this.cargoService
      .buscarPorId(id)
      .subscribe(
        (dados: ResponseModel) => {
          loading.dismiss();
          if (!dados.success) {
            this.cargo = dados.data;
            this.preencherFormulario();
          }
          else {
            this.exibeErrosModal(dados.notifications, "Erro Consula do cargo", "Erros");
          }
        },
        (error) => {
          this.mostrarMsg("Houve um erro ao tentar buscar os dados do cargo. Por favor tente novamente.");
          console.log(error);
          loading.dismiss();
        }
      )
  }

  async mostrarMsg(message) {
    const error = await this.toastCtrl.create({
      message: message, duration: 3000,
      buttons: [{
        text: 'Fechar',
        role: 'cancel'
      }]
    });
    error.present();
  }

  async exibeErrosModal(notifications: NotificationsModel[], tituloModal: string, operacao: string) {
    let modal = await this.modalCtrl.create({
      component: ModalShowErrosComponent,
      cssClass: 'modal-recotar-imagem',
      componentProps: {
        'notifications': notifications,
        'tituloModal': tituloModal,
        'operacao': operacao
      }
    });
    await modal.present();

    modal.onDidDismiss();
  }

  async submit(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Salvando...'
    });
    await loading.present();

    let empresa = new CargoModel();
    empresa.id = this.form.get('id').value;
    empresa.nome = this.form.get('nome').value;
    empresa.sigla = this.form.get('sigla').value;
    empresa.nivelAcesso = +this.form.get('nivelAcesso').value;
    empresa.dataAtualizacao = this.form.get('dataUltimaAtualizacao').value;
    empresa.dataCriacao = this.form.get('dataCriacao').value;

    if (this.operacao == 'cadastrar') {
      this.salvarCargo(empresa, loading);
    }
    else {
      this.editarCargo(empresa, loading);
    }
  }
  
  salvarCargo(cargo: CargoModel, loading: any) {
    this.cargoService.save(cargo).subscribe(
      (resposta) => {    
        this.mostrarMsg(`o cargo ${resposta.nome} foi salvo com sucesso.`);
        console.log(resposta);
        loading.dismiss();
        this.router.navigate(['/cargoListagem']);

      },
      (error) => {
        this.mostrarMsg("Houve um erro ao tentar salvar o cargo. Por favor tente novamente.");
        console.log(error);
        loading.dismiss();
      }
    )
  } 

  editarCargo(cargo: CargoModel, loading: any) {
    this.cargoService.update(cargo).subscribe(
      (resposta) => {        
        this.mostrarMsg(`o cargo ${resposta.nome} foi editado com sucesso.`);
        loading.dismiss();
        this.router.navigate(['/cargoListagem']);   
      },
      (error) => {
        this.mostrarMsg("Houve um erro ao tentar editar o cargo . Por favor tente novamente.");
        console.log(error);
        loading.dismiss();
      }
    )
  } 

  retornarDescricalNivelAcesso(){
    let values = Object.values(ENivelAcesso).filter(key => isNaN(Number(ENivelAcesso[key])));
    let options = values.map(c=> {
      return {
        value: c,
        description: ENivelAcessoDescricao.get(+c) 
      }
    })
    return options;
  }

}
