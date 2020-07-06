import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargoDetalhesPageRoutingModule } from './cargo-detalhes-routing.module';

import { CargoDetalhesPage } from './cargo-detalhes.page';
import { ComponentsModule } from 'src/app/modules/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    CargoDetalhesPageRoutingModule
  ],
  declarations: [CargoDetalhesPage]
})
export class CargoDetalhesPageModule {}
