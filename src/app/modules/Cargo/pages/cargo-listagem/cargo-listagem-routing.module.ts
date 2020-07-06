import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargoListagemPage } from './cargo-listagem.page';

const routes: Routes = [
  {
    path: '',
    component: CargoListagemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargoListagemPageRoutingModule {}
