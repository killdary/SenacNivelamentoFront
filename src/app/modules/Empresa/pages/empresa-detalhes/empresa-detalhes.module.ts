import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpresaDetalhesPageRoutingModule } from './empresa-detalhes-routing.module';

import { EmpresaDetalhesPage } from './empresa-detalhes.page';
import { ComponentsModule } from 'src/app/modules/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    EmpresaDetalhesPageRoutingModule
  ],
  declarations: [EmpresaDetalhesPage]
})
export class EmpresaDetalhesPageModule {}
