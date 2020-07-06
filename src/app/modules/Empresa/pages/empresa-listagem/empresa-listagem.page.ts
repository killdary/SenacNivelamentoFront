import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { EmpresaModel } from '../../models/empresa.model';
import { PermissaoVisualizar } from 'src/app/modules/utils/permitions/permissaoVisualizar.util';

@Component({
  selector: 'app-empresa-listagem',
  templateUrl: './empresa-listagem.page.html',
  styleUrls: ['./empresa-listagem.page.scss'],
})
export class EmpresaListagemPage extends PermissaoVisualizar implements OnInit {

  //variaveis da tabela
  public data: Data;
  public colunas: any;
  public pagina = 0;
  public limitePaginas: number = 10;
  public filtro: string = "";
  public dadosTabela: any = {
    data: [],
    count: 0
  };
  public mensagens = {
    'emptyMessage': 'Não há dados a serem exibidos',
    'totalMessage': 'Resultado(s)'
  };
  
  constructor(
    private http: HttpClient,
    private empresaService: EmpresaService,
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router) { 
      super();

      this.colunas = [
        { name: 'Nome' },
        { name: 'NomeFantasia' },
        { name: 'CNPJ' }
      ];
    }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.buscarEmpresas(this.pagina, this.limitePaginas);
  }

  async buscarEmpresas(pageindex: number = 0, pagesize: number = 9999){

    const loading = await this.loadingCtrl.create({
      message: 'Buscando...'
    });
    await loading.present();

    this.empresaService.listarEmpresas(
      {        
        pageindex: pageindex,
        pagesize: pagesize,
        filter: this.filtro
      })
      .subscribe(
        (dados) => {
          this.dadosTabela.data = dados.data;
          this.dadosTabela.count = dados.rowCount;
          loading.dismiss();
        },
        (error) => {
          this.mostrarMsg("Houve um erro na consulta das empresas. Por favor tente novamente.");
          console.log(error);
          loading.dismiss();
        }
      );
  }
  
  async filtroPagina() {
    this.pagina = 0;
    await this.buscarEmpresas(this.pagina, this.limitePaginas);
  }

  async apresentarAlertaDelecao(empresa: EmpresaModel) {

    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: `Você tem certeza que deseja deletar o usuário <strong>${empresa.nome}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
          }
        }, {
          text: 'Confimar',
          cssClass: 'secondary',
          handler: async () => {

            const loading = await this.loadingCtrl.create({
              message: 'Deletando...'
            });
            await loading.present();
            
            this
              .empresaService
              .delete(empresa.id.toString())
              .subscribe(
                async (resposta) => {
                  this.mostrarMsg("O usuário foi deletado com sucesso.");
                  await this.buscarEmpresas(0, this.limitePaginas);
                  loading.dismiss();
                },
                (error) => {
                  this.mostrarMsg(error.message);
                  console.log(error);
                  loading.dismiss();
                }
              );
          }
        }
      ]
    });

    await alert.present();
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
  

}
