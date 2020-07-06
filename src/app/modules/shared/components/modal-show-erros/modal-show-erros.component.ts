import { Component, OnInit, Input } from '@angular/core';
import { NotificationsModel } from 'src/app/modules/utils/models/response.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-show-erros',
  templateUrl: './modal-show-erros.component.html',
  styleUrls: ['./modal-show-erros.component.scss'],
})
export class ModalShowErrosComponent implements OnInit {

  @Input() notifications:NotificationsModel[];
  @Input() tituloModal:string;
  @Input() operacao:string;
  
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  fecharModal() {
    this.modalCtrl.dismiss();
  }
}
