import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalUploadRecortarImagemPageRoutingModule } from './modal-upload-recortar-imagem-routing.module';

import { ModalUploadRecortarImagemPage } from './modal-upload-recortar-imagem.page';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalUploadRecortarImagemPageRoutingModule,
    ImageCropperModule
  ],
  declarations: [ModalUploadRecortarImagemPage]
})
export class ModalUploadRecortarImagemPageModule {}
