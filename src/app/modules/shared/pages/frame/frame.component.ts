import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { PermitionUtil } from 'src/app/modules/utils/permitions/permition.util';
import { FuncionarioModel } from 'src/app/modules/Funcionario/models/funcionario.model';
import { SecurityUtil } from 'src/app/modules/utils/security/security.util';
import { PermissaoVisualizar } from 'src/app/modules/utils/permitions/permissaoVisualizar.util';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
})
export class FrameComponent extends PermissaoVisualizar implements OnInit {

  funcionario: FuncionarioModel;

  constructor(
    private menuCtrl: MenuController,
    private navCtrl: NavController
  ) { super(); }

  ngOnInit() {
  }

  goToPage(page: string) {
    this.menuCtrl.close();
    this.navCtrl.navigateRoot(page);
  }

  get funcionarioId() {
    let dados = SecurityUtil.get();
    this.funcionario = dados.funcionario;
    return this.funcionario.id;
  }

}
