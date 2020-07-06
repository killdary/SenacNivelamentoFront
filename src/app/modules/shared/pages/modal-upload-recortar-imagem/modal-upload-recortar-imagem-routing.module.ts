import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalUploadRecortarImagemPage } from './modal-upload-recortar-imagem.page';

const routes: Routes = [
  {
    path: '',
    component: ModalUploadRecortarImagemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalUploadRecortarImagemPageRoutingModule {}
