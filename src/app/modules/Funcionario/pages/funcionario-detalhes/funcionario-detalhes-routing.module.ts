import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuncionarioDetalhesPage } from './funcionario-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: FuncionarioDetalhesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionarioDetalhesPageRoutingModule {}
