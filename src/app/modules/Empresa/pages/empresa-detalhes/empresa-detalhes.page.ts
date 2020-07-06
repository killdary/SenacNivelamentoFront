import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ValidateBrService } from 'angular-validate-br';
import { EmpresaModel } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa.service';
import { ResponseModel, NotificationsModel } from 'src/app/modules/utils/models/response.model';
import { ModalShowErrosComponent } from 'src/app/modules/shared/components/modal-show-erros/modal-show-erros.component';
import { ModelUploadRecortarImagemComponent } from 'src/app/modules/shared/pages/model-upload-recortar-imagem/model-upload-recortar-imagem.component';
import { ModalUploadRecortarImagemPage } from 'src/app/modules/shared/pages/modal-upload-recortar-imagem/modal-upload-recortar-imagem.page';

@Component({
  selector: 'app-empresa-detalhes',
  templateUrl: './empresa-detalhes.page.html',
  styleUrls: ['./empresa-detalhes.page.scss'],
})
export class EmpresaDetalhesPage implements OnInit {


  public url: string = ''
  public imagemBlob: File;
  public urlApi = environment.apiEndPoint;
  public urlImagem = '';

  public dataFromModal: any;
  public form: FormGroup;
  public desabilitarCampos: boolean = false;
  public usuario: any;
  public imagemDefault = '../../../../../assets/img/imagem_senac.png';
  public operacao: string = 'cadastrar';

  public titulo: string = "Cadastro";

  //variaveis de dados
  public empresa: EmpresaModel;

  //msg de validacao
  public mensagens_validacao = {
    'id': [
      { type: 'required', message: 'O login é obrigatório.' },
      { type: 'minlength', message: 'O login deve ter no mínimo 5 caracters.' },
      { type: 'maxlength', message: 'O login deve ter no mínimo 20 caracters.' }
    ],
    'nome': [
      { type: 'required', message: 'O nome é obrigatorio.' }
    ],
    'nomeFantasia': [
      { type: 'required', message: 'O nome fantasia é obrigatorio.' }
    ],
    'cnpj': [
      { type: 'required', message: 'O cnpj é obrigatorio.' },
      { type: 'cnpjvalidator', message: 'O cnpj é inválido.' }
    ],
    'logradouro': [
      { type: 'required', message: 'O Logradouro é obrigatorio.' }
    ],
    'numero': [
      { type: 'required', message: 'O número é obrigatorio.' },
      { type: 'min', message: 'O número deve ser positivo.' }
    ],
    'bairro': [
      { type: 'required', message: 'O bairro é obrigatorio.' }
    ],
    'cidade': [
      { type: 'required', message: 'O cidade é obrigatorio.' }
    ],
    'estado': [
      { type: 'required', message: 'O estado é obrigatorio.' }
    ],
    'cep': [
      { type: 'required', message: 'O cep é obrigatorio.' }
    ],
    'pais': [
      { type: 'required', message: 'O país é obrigatorio.' }
    ],
    'dataNascimento': [
      { type: 'required', message: 'A data de nascimento é obrigatoria.' }
    ],
  }

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private router: Router,
    private validateBrService: ValidateBrService,
    private empresaService: EmpresaService,
    public modalCtrl: ModalController) {

    this.form = this.fb.group({
      id: [''],
      nome: ['', Validators.compose([
        Validators.required
      ])],
      nomeFantasia: ['', Validators.compose([
        Validators.required
      ])],
      cnpj: ['', Validators.compose([
        Validators.required,
        this.validateBrService.cnpj
      ])],
      logradouro: ['', Validators.compose([
        Validators.required
      ])],
      numero: ['', Validators.compose([
        Validators.required,
        Validators.min(0),
      ])],
      bairro: ['', Validators.compose([
        Validators.required
      ])],
      cidade: ['', Validators.compose([
        Validators.required
      ])],
      estado: ['', Validators.compose([
        Validators.required
      ])],
      cep: ['', Validators.compose([
        Validators.required
      ])],
      pais: ['', Validators.compose([
        Validators.required
      ])],
      dataCriacao: '',
      dataUltimaAtualizacao: ''
    });


    this.url = this.imagemDefault;
  }

  ngOnInit() {
  }


  ionViewDidEnter() {
    let id = +this.route.snapshot.paramMap.get("id");
    if (id) {
      this.buscarEmpresa(id);
      this.titulo = 'Visualização';
      this.desabilitarCampos = true;
    }

    this.operacao = history.state.operacao? history.state.operacao: 'cadastrar';
    if (this.operacao && this.operacao == 'editar') {
      this.desabilitarCampos = false;
      this.titulo = 'Editar';

    } else {
      this.empresa = {
        id: 0,
        nome: 'Empresa 1',
        nomeFantasia: 'Empresa Fantasia 1',
        pais: 'Brasil',
        bairro: 'Centro',
        cep: 62360000,
        cidade: 'Ibiapina',
        cnpj: '48.864.019/0001-02',
        dataAtualizacao: '',
        dataCriacao: '',
        estado: 'Ceará',
        logradouro: 'Rua Teste Empresa',
        numero: 1
      }
      this.preencherFormulario();
    }

  }

  preencherFormulario() {

    this.form.controls['id'].setValue(this.empresa.id);
    this.form.controls['nome'].setValue(this.empresa.nome);
    this.form.controls['nomeFantasia'].setValue(this.empresa.nomeFantasia);
    this.form.controls['pais'].setValue(this.empresa.pais);
    this.form.controls['bairro'].setValue(this.empresa.bairro);
    this.form.controls['cep'].setValue(this.empresa.cep);
    this.form.controls['cidade'].setValue(this.empresa.cidade);
    this.form.controls['cnpj'].setValue(this.empresa.cnpj);
    this.form.controls['dataUltimaAtualizacao'].setValue(this.empresa.dataAtualizacao);
    this.form.controls['dataCriacao'].setValue(this.empresa.dataCriacao);
    this.form.controls['estado'].setValue(this.empresa.estado);
    this.form.controls['logradouro'].setValue(this.empresa.logradouro);
    this.form.controls['numero'].setValue(this.empresa.numero);

    this.urlImagem =  '../../../../../assets/img/imagem_senac.png';
    if (this.empresa.imagem) {
      this.urlImagem = `${this.urlApi}/${this.empresa.imagem}`;
    }

  }

  async buscarEmpresa(id: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Buscando...'
    });
    await loading.present();

    this.empresaService
      .buscarPorId(id)
      .subscribe(
        (dados: ResponseModel) => {
          loading.dismiss();
          if (!dados.success) {
            this.empresa = dados.data;
            this.preencherFormulario();
          }
          else {
            this.exibeErrosModal(dados.notifications, "Erro Consula da empresa", "Erros");
          }
        },
        (error) => {
          this.mostrarMsg("Houve um erro ao tentar buscar os dados da empresa. Por favor tente novamente.");
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

  
  async alterarImagemModal() {
    const modal = await this.modalCtrl.create({
      component: ModalUploadRecortarImagemPage,
      cssClass: 'modal-recotar-imagem',
      componentProps: {
        'imagemUrl': this.urlImagem
      }
    });
    await modal.present();

    modal.onDidDismiss()
      .then(resposta => {
        if (resposta.data.image) {
          this.urlImagem = resposta.data.image;
          this.imagemBlob = resposta.data.imageBlob;
        }

      })
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

    let empresa = new EmpresaModel();
    empresa.id = this.form.get('id').value;
    empresa.nome = this.form.get('nome').value;
    empresa.nomeFantasia = this.form.get('nomeFantasia').value;
    empresa.pais = this.form.get('pais').value;
    empresa.bairro = this.form.get('bairro').value;
    empresa.cep = this.form.get('cep').value;
    empresa.cidade = this.form.get('cidade').value;
    empresa.cnpj = this.form.get('cnpj').value;
    empresa.dataAtualizacao = this.form.get('dataUltimaAtualizacao').value;
    empresa.dataCriacao = this.form.get('dataCriacao').value;
    empresa.estado = this.form.get('estado').value;
    empresa.logradouro = this.form.get('logradouro').value;
    empresa.numero = this.form.get('numero').value;

    if (this.operacao == 'cadastrar') {
      this.salvarEmpresa(empresa, loading);
    }
    else {
      this.editarEmpresa(empresa, loading);
    }
  }
  
  salvarEmpresa(empresa: EmpresaModel, loading: any) {
    this.empresaService.save(empresa).subscribe(
      (resposta) => {                  
        if (this.imagemBlob) {
          let form = new FormData();
          form.append('imagem', this.imagemBlob);

          this.empresaService.salvarImagem(resposta.id.toString(), form).subscribe(
            (resposta) => {      
              this.mostrarMsg(`A empresa ${resposta.nome} foi salva com sucesso.`);
              loading.dismiss();
              this.router.navigate(['/empresaListagem']);            
            },
            (error) => {
              this.mostrarMsg("Houve um erro ao tentar salvar a imagem da empresa. Por favor cadastrar uma imagem novamente.");
              console.log(error);
              loading.dismiss();
            });      
        }
        else {
          this.mostrarMsg(`A empresa ${resposta.nome} foi salva com sucesso.`);
          console.log(resposta);
          loading.dismiss();
          this.router.navigate(['/empresaListagem']);
        }

      },
      (error) => {
        this.mostrarMsg("Houve um erro ao tentar salvar a empresa. Por favor tente novamente.");
        console.log(error);
        loading.dismiss();
      }
    )
  } 

  editarEmpresa(empresa: EmpresaModel, loading: any) {
    this.empresaService.update(empresa).subscribe(
      (resposta) => {                  
        if (this.imagemBlob) {
          let form = new FormData();
          form.append('imagem', this.imagemBlob);

          this.empresaService.salvarImagem(resposta.id.toString(), form).subscribe(
            (resposta) => {      
              this.mostrarMsg(`A empresa ${resposta.nome} foi editada com sucesso.`);
              loading.dismiss();
              this.router.navigate(['/empresaListagem']);            
            },
            (error) => {
              this.mostrarMsg("Houve um erro ao tentar editar a imagem da empresa. Por favor cadastrar uma imagem novamente.");
              console.log(error);
              loading.dismiss();
            });      
        }
        else {
          this.mostrarMsg(`A empresa ${resposta.nome} foi editada com sucesso.`);
          console.log(resposta);
          loading.dismiss();
          this.router.navigate(['/empresaListagem']);
        }

      },
      (error) => {
        this.mostrarMsg("Houve um erro ao tentar editar a empresa. Por favor tente novamente.");
        console.log(error);
        loading.dismiss();
      }
    )
  } 

}
