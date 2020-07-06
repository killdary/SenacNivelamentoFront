import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpresaListagemPageRoutingModule } from './empresa-listagem-routing.module';

import { EmpresaListagemPage } from './empresa-listagem.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ComponentsModule } from 'src/app/modules/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpresaListagemPageRoutingModule,
    NgxDatatableModule,
    ComponentsModule
  ],
  declarations: [EmpresaListagemPage]
})
export class EmpresaListagemPageModule {}
