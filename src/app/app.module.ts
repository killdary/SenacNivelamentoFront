import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FrameComponent } from './modules/shared/pages/frame/frame.component';
import { ComponentsModule } from './modules/shared/components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { EmpresaService } from './modules/Empresa/services/empresa.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CargoService } from './modules/Cargo/Service/cargo.service';
import { FuncionarioService } from './modules/Funcionario/services/funcionario.service';
import { AutorizadoGuard } from './modules/utils/guards/autorizado.guard';
import { AdministradorGuard } from './modules/utils/guards/administrador.guard';
import { FinanceiroGuard } from './modules/utils/guards/financeiro.guard';
import { UsuarioGuard } from './modules/utils/guards/usuario.guard';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    ImageCropperModule],
  providers: [
    AutorizadoGuard,
    AdministradorGuard,
    FinanceiroGuard,
    UsuarioGuard,
    StatusBar,
    SplashScreen,
    EmpresaService,
    CargoService,
    FuncionarioService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
