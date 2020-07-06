import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuncionarioModel } from '../../models/funcionario.model';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateBrService } from 'angular-validate-br';
import { FuncionarioService } from '../../services/funcionario.service';
import { ResponseModel, NotificationsModel } from 'src/app/modules/utils/models/response.model';
import { ModalShowErrosComponent } from 'src/app/modules/shared/components/modal-show-erros/modal-show-erros.component';
import { ModalUploadRecortarImagemPage } from 'src/app/modules/shared/pages/modal-upload-recortar-imagem/modal-upload-recortar-imagem.page';
import { CargoService } from 'src/app/modules/Cargo/Service/cargo.service';
import { EmpresaService } from 'src/app/modules/Empresa/services/empresa.service';
import { CargoModel } from 'src/app/modules/Cargo/Model/cargo.model';
import { EmpresaModel } from 'src/app/modules/Empresa/models/empresa.model';
import { forkJoin } from 'rxjs';
import { PermissaoVisualizar } from 'src/app/modules/utils/permitions/permissaoVisualizar.util';

@Component({
  selector: 'app-funcionario-detalhes',
  templateUrl: './funcionario-detalhes.page.html',
  styleUrls: ['./funcionario-detalhes.page.scss'],
})
export class FuncionarioDetalhesPage extends PermissaoVisualizar implements OnInit {


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
  public funcionario: FuncionarioModel;
  public listaCargos: CargoModel[]=[];
  public listaEmpresas: EmpresaModel[]=[];

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
    'login': [
      { type: 'required', message: 'O login é obrigatorio.' }
    ],
    'senha': [
      { type: 'required', message: 'A senha é obrigatoria.' },
      { type: 'minlength', message: 'A senha deve ter no mínimo 6 caracters.' }
    ],
    'confirmarSenha': [
      { type: 'required', message: 'A senha é obrigatoria.' },
      { type: 'minlength', message: 'A senha deve ter no mínimo 6 caracters.' }
    ],
    'cpf': [
      { type: 'required', message: 'O cpf é obrigatorio.' },
      { type: 'cpfvalidator', message: 'O cpf é inválido.' }
    ],
    'logradouro': [
      { type: 'required', message: 'O Logradouro é obrigatorio.' }
    ],
    'numero': [
      { type: 'required', message: 'O número é obrigatorio.' },
      { type: 'min', message: 'O número deve ser positivo.' }
    ],
    'empresa': [
      { type: 'required', message: 'O empresa é obrigatoria.' }
    ],
    'cargo': [
      { type: 'required', message: 'O cargo é obrigatorio.' }
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
    private funcionarioService: FuncionarioService,
    private cargoService: CargoService,
    private empresaService: EmpresaService,
    public modalCtrl: ModalController) {
    
     super();

    this.form = this.fb.group({
      id: [''],
      nome: ['', Validators.compose([
        Validators.required
      ])],
      login: ['', Validators.compose([
        Validators.required
      ])],
      senha: ['', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])],
      confirmarSenha: ['', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])],
      cpf: ['', Validators.compose([
        Validators.required,
        this.validateBrService.cpf
      ])],
      logradouro: ['', Validators.compose([
        Validators.required
      ])],
      numero: ['', Validators.compose([
        Validators.required,
        Validators.min(0),
      ])],
      empresa: ['', Validators.compose([
        Validators.required
      ])],
      cargo: ['', Validators.compose([
        Validators.required
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
    },
    { validator: this.confirmarSenha });

    this.url = this.imagemDefault;
  }

  confirmarSenha(group: FormGroup) {
    let senha = group.get('senha').value;
    let confirmarSenha = group.get('confirmarSenha').value;

    return senha === confirmarSenha ? null : { notSame: true }
  }

  ngOnInit() {
    
    this.buscarDados();
  }
  


  async buscarDados(){
    
    const loading = await this.loadingCtrl.create({
      message: 'Buscando...'
    });
    await loading.present();

    let cargos = this.cargoService.listarCargos({pageindex: 0, pagesize: 9999});
    let empresas = this.empresaService.listarEmpresas({pageindex: 0, pagesize: 9999});

    forkJoin([cargos, empresas]).subscribe((result) => {
      this.listaCargos = result[0].data;
      this.listaEmpresas = result[1].data;
      loading.dismiss();
    },
    (error)=>{
      this.mostrarMsg("Houve um erro na consulta dos dados de cargos e empresas. Por favor tente novamente.");
      console.log(error);
      loading.dismiss();
    });
  }


  ionViewDidEnter() {
    
    let id = +this.route.snapshot.paramMap.get("id");
    if (id) {
      this.buscarFuncionario(id);
      this.titulo = 'Visualização';
      this.desabilitarCampos = true;
    }

    this.operacao = history.state.operacao? history.state.operacao: 'cadastrar';
    if (this.operacao && this.operacao == 'editar') {
      this.desabilitarCampos = false;
      this.titulo = 'Editar';

    } else {
      this.funcionario = {
        id: 0,
        nome: 'Empresa 1',
        login: 'Empresa Fantasia 1',
        senha: '123456',
        pais: 'Brasil',
        bairro: 'Centro',
        cep: 62360000,
        cidade: 'Ibiapina',
        cpf: '008.971.933-69',
        dataAtualizacao: '',
        dataCriacao: '',
        estado: 'Ceará',
        logradouro: 'Rua Teste Empresa',
        numero: 1,
        empresaId:0,
        cargoId:0
      }
      this.preencherFormulario();
    }

  }

  preencherFormulario() {

    this.form.controls['id'].setValue(this.funcionario.id);
    this.form.controls['nome'].setValue(this.funcionario.nome);
    this.form.controls['login'].setValue(this.funcionario.login);
    this.form.controls['senha'].setValue(this.funcionario.senha);
    this.form.controls['confirmarSenha'].setValue(this.funcionario.senha);
    this.form.controls['empresa'].setValue(this.funcionario.empresaId.toString());
    this.form.controls['cargo'].setValue(this.funcionario.cargoId.toString());
    this.form.controls['pais'].setValue(this.funcionario.pais);
    this.form.controls['bairro'].setValue(this.funcionario.bairro);
    this.form.controls['cep'].setValue(this.funcionario.cep);
    this.form.controls['cidade'].setValue(this.funcionario.cidade);
    this.form.controls['cpf'].setValue(this.funcionario.cpf);
    this.form.controls['dataUltimaAtualizacao'].setValue(this.funcionario.dataAtualizacao);
    this.form.controls['dataCriacao'].setValue(this.funcionario.dataCriacao);
    this.form.controls['estado'].setValue(this.funcionario.estado);
    this.form.controls['logradouro'].setValue(this.funcionario.logradouro);
    this.form.controls['numero'].setValue(this.funcionario.numero);

    this.urlImagem =  '../../../../../assets/img/imagem_senac.png';
    if (this.funcionario.imagem) {
      this.urlImagem = `${this.urlApi}/${this.funcionario.imagem}`;
    }

  }

  async buscarFuncionario(id: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Buscando...'
    });
    await loading.present();

    this.funcionarioService
      .buscarPorId(id)
      .subscribe(
        (dados: ResponseModel) => {
          loading.dismiss();
          if (!dados.success) {
            this.funcionario = dados.data;
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

    let funcionario = new FuncionarioModel();
    funcionario.id = this.form.get('id').value;
    funcionario.nome = this.form.get('nome').value;
    funcionario.login = this.form.get('login').value;
    funcionario.senha = this.form.get('senha').value;
    funcionario.empresaId = +this.form.get('empresa').value;
    funcionario.cargoId = +this.form.get('cargo').value;
    funcionario.pais = this.form.get('pais').value;
    funcionario.bairro = this.form.get('bairro').value;
    funcionario.cep = this.form.get('cep').value;
    funcionario.cidade = this.form.get('cidade').value;
    funcionario.cpf = this.form.get('cpf').value;
    funcionario.dataAtualizacao = this.form.get('dataUltimaAtualizacao').value;
    funcionario.dataCriacao = this.form.get('dataCriacao').value;
    funcionario.estado = this.form.get('estado').value;
    funcionario.logradouro = this.form.get('logradouro').value;
    funcionario.numero = this.form.get('numero').value;

    if (this.operacao == 'cadastrar') {
      this.salvarFuncionario(funcionario, loading);
    }
    else {
      this.editarFuncionario(funcionario, loading);
    }
  }
  
  salvarFuncionario(funcionario: FuncionarioModel, loading: any) {
    this.funcionarioService.save(funcionario).subscribe(
      (resposta) => {                  
        if (this.imagemBlob) {
          let form = new FormData();
          form.append('imagem', this.imagemBlob);

          this.funcionarioService.salvarImagem(resposta.id.toString(), form).subscribe(
            (resposta) => {      
              this.mostrarMsg(`O funcionário ${resposta.nome} foi salvo com sucesso.`);
              loading.dismiss();
              this.router.navigate(['/empresaListagem']);            
            },
            (error) => {
              this.mostrarMsg("Houve um erro ao tentar salvar a imagem do funcionario. Por favor cadastre uma imagem novamente.");
              console.log(error);
              loading.dismiss();
            });      
        }
        else {
          this.mostrarMsg(`O funcionário ${resposta.nome} foi salvo com sucesso.`);
          console.log(resposta);
          loading.dismiss();
          this.router.navigate(['/funcionarioListagem']);
        }

      },
      (error) => {
        this.mostrarMsg("Houve um erro ao tentar salvar o funcionário. Por favor tente novamente.");
        console.log(error);
        loading.dismiss();
      }
    )
  } 

  editarFuncionario(funcionario: FuncionarioModel, loading: any) {
    this.funcionarioService.update(funcionario).subscribe(
      (resposta) => {                  
        if (this.imagemBlob) {
          let form = new FormData();
          form.append('imagem', this.imagemBlob);

          this.funcionarioService.salvarImagem(resposta.id.toString(), form).subscribe(
            (resposta) => {      
              this.mostrarMsg(`O funcionário ${resposta.nome} foi editado com sucesso.`);
              loading.dismiss();
              this.router.navigate(['/funcionarioListagem']);            
            },
            (error) => {
              this.mostrarMsg("Houve um erro ao tentar editar a imagem do funcionário. Por favor cadastre uma imagem novamente.");
              console.log(error);
              loading.dismiss();
            });      
        }
        else {
          this.mostrarMsg(`O funcionário ${resposta.nome} foi editado com sucesso.`);
          console.log(resposta);
          loading.dismiss();
          this.router.navigate(['/funcionarioListagem']);
        }

      },
      (error) => {
        this.mostrarMsg("Houve um erro ao tentar editar o funcionário. Por favor tente novamente.");
        console.log(error);
        loading.dismiss();
      }
    )
  } 

}
