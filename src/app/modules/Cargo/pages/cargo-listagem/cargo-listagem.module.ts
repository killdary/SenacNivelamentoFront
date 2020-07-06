import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargoListagemPageRoutingModule } from './cargo-listagem-routing.module';

import { CargoListagemPage } from './cargo-listagem.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ComponentsModule } from 'src/app/modules/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    ComponentsModule,
    CargoListagemPageRoutingModule
  ],
  declarations: [CargoListagemPage]
})
export class CargoListagemPageModule {}
