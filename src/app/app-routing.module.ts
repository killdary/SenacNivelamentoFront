import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FrameComponent } from './modules/shared/pages/frame/frame.component';
import { AutorizadoGuard } from './modules/utils/guards/autorizado.guard';
import { AdministradorGuard } from './modules/utils/guards/administrador.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    component: FrameComponent,
    canActivate:[AutorizadoGuard],
    children: [
      { path: '', loadChildren:  './modules/Empresa/pages/empresa-listagem/empresa-listagem.module#EmpresaListagemPageModule' },
      { path: 'empresaListagem', loadChildren:  './modules/Empresa/pages/empresa-listagem/empresa-listagem.module#EmpresaListagemPageModule' },
      { 
        path: 'empresaDetalhes', 
        loadChildren:  './modules/Empresa/pages/empresa-detalhes/empresa-detalhes.module#EmpresaDetalhesPageModule',
        canActivate:[AdministradorGuard]
      },
      { 
        path: 'empresaDetalhes/:id', 
        loadChildren:  './modules/Empresa/pages/empresa-detalhes/empresa-detalhes.module#EmpresaDetalhesPageModule' },
      { path: 'cargoListagem', loadChildren:  './modules/Cargo/pages/cargo-listagem/cargo-listagem.module#CargoListagemPageModule' },
      {
        path: 'cargoDetalhes', 
        loadChildren:  './modules/Cargo/pages/cargo-detalhes/cargo-detalhes.module#CargoDetalhesPageModule',
        canActivate:[AdministradorGuard] 
      },
      { path: 'cargoDetalhes/:id', loadChildren:  './modules/Cargo/pages/cargo-detalhes/cargo-detalhes.module#CargoDetalhesPageModule' },
      { path: 'funcionarioListagem', loadChildren:  './modules/Funcionario/pages/funcionario-listagem/funcionario-listagem.module#FuncionarioListagemPageModule' },
      { 
        path: 'funcionarioDetalhes', 
        loadChildren:  './modules/Funcionario/pages/funcionario-detalhes/funcionario-detalhes.module#FuncionarioDetalhesPageModule',
        canActivate:[AdministradorGuard] 
      },
      { path: 'funcionarioDetalhes/:id', loadChildren:  './modules/Funcionario/pages/funcionario-detalhes/funcionario-detalhes.module#FuncionarioDetalhesPageModule' },
    ]
  },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'empresa',
    loadChildren: () => import('./modules/Empresa/pages/empresa/empresa.module').then( m => m.EmpresaPageModule)
  },
  {
    path: 'cargo',
    loadChildren: () => import('./modules/Cargo/pages/cargo/cargo.module').then( m => m.CargoPageModule)
  },
  {
    path: 'funcionario',
    loadChildren: () => import('./modules/Funcionario/pages/funcionario/funcionario.module').then( m => m.FuncionarioPageModule)
  },
  {
    path: 'empresa-detalhes',
    loadChildren: () => import('./modules/Empresa/pages/empresa-detalhes/empresa-detalhes.module').then( m => m.EmpresaDetalhesPageModule)
  },
  {
    path: 'empresa-listagem',
    loadChildren: () => import('./modules/Empresa/pages/empresa-listagem/empresa-listagem.module').then( m => m.EmpresaListagemPageModule)
  },
  {
    path: 'modal-upload-recortar-imagem',
    loadChildren: () => import('./modules/shared/pages/modal-upload-recortar-imagem/modal-upload-recortar-imagem.module').then( m => m.ModalUploadRecortarImagemPageModule)
  },
  {
    path: 'cargo-detalhes',
    loadChildren: () => import('./modules/Cargo/pages/cargo-detalhes/cargo-detalhes.module').then( m => m.CargoDetalhesPageModule)
  },
  {
    path: 'cargo-listagem',
    loadChildren: () => import('./modules/Cargo/pages/cargo-listagem/cargo-listagem.module').then( m => m.CargoListagemPageModule)
  },
  {
    path: 'funcionario-listagem',
    loadChildren: () => import('./modules/Funcionario/pages/funcionario-listagem/funcionario-listagem.module').then( m => m.FuncionarioListagemPageModule)
  },
  {
    path: 'funcionario-detalhes',
    loadChildren: () => import('./modules/Funcionario/pages/funcionario-detalhes/funcionario-detalhes.module').then( m => m.FuncionarioDetalhesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/Account/pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./modules/shared/pages/not-found-page/not-found-page.module').then( m => m.NotFoundPagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
