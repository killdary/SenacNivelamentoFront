import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserCardComponent } from './user-card/user-card.component';
import { ValidacaoInputComponent } from './validacao-input/validacao-input.component';

@NgModule({
  declarations: [
      NavBarComponent,
      UserCardComponent,
      ValidacaoInputComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[    
    NavBarComponent,
    UserCardComponent,
    ValidacaoInputComponent
  ]
})
export class ComponentsModule { }
