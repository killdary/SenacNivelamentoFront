import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargoDetalhesPage } from './cargo-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: CargoDetalhesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargoDetalhesPageRoutingModule {}
