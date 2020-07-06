import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, Data } from '@angular/router';
import { CargoService } from '../../Service/cargo.service';
import { CargoModel } from '../../Model/cargo.model';
import { ENivelAcesso, ENivelAcessoDescricao } from '../../enums/eNivelAcesso.enum';
import { PermissaoVisualizar } from 'src/app/modules/utils/permitions/permissaoVisualizar.util';

@Component({
  selector: 'app-cargo-listagem',
  templateUrl: './cargo-listagem.page.html',
  styleUrls: ['./cargo-listagem.page.scss'],
})
export class CargoListagemPage extends PermissaoVisualizar implements OnInit {

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
    private cargoService: CargoService,
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router) { 
      super();
      this.colunas = [
        { name: 'Nome' },
        { name: 'Sigla' },
        { name: 'NivelAcesso' }
      ];
    }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.buscarCargos(this.pagina, this.limitePaginas);
  }

  async buscarCargos(pageindex: number = 0, pagesize: number = 9999){

    const loading = await this.loadingCtrl.create({
      message: 'Buscando...'
    });
    await loading.present();

    this.cargoService.listarCargos(
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
          this.mostrarMsg("Houve um erro na consulta dos cargos. Por favor tente novamente.");
          console.log(error);
          loading.dismiss();
        }
      );
  }
  
  async filtroPagina() {
    this.pagina = 0;
    await this.buscarCargos(this.pagina, this.limitePaginas);
  }

  async apresentarAlertaDelecao(cargo: CargoModel) {

    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: `Você tem certeza que deseja deletar o cargo <strong>${cargo.nome}</strong>?`,
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
              .cargoService
              .delete(cargo.id.toString())
              .subscribe(
                async (resposta) => {
                  this.mostrarMsg("O cargo foi deletado com sucesso.");
                  await this.buscarCargos(0, this.limitePaginas);
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

  formatarNivel(nivel: ENivelAcesso){
    return ENivelAcessoDescricao.get(nivel);
  }
  

}