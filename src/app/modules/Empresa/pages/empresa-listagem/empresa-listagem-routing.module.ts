import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpresaListagemPage } from './empresa-listagem.page';

const routes: Routes = [
  {
    path: '',
    component: EmpresaListagemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaListagemPageRoutingModule {}
