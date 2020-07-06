import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuncionarioDetalhesPageRoutingModule } from './funcionario-detalhes-routing.module';

import { FuncionarioDetalhesPage } from './funcionario-detalhes.page';
import { ComponentsModule } from 'src/app/modules/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    FuncionarioDetalhesPageRoutingModule
  ],
  declarations: [FuncionarioDetalhesPage]
})
export class FuncionarioDetalhesPageModule {}
