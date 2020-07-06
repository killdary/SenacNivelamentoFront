import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuncionarioListagemPageRoutingModule } from './funcionario-listagem-routing.module';

import { FuncionarioListagemPage } from './funcionario-listagem.page';
import { ComponentsModule } from 'src/app/modules/shared/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FuncionarioListagemPageRoutingModule,
    NgxDatatableModule,
    ComponentsModule
  ],
  declarations: [FuncionarioListagemPage]
})
export class FuncionarioListagemPageModule {}
