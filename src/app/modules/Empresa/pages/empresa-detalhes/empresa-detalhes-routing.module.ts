import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpresaDetalhesPage } from './empresa-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresaDetalhesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaDetalhesPageRoutingModule {}
