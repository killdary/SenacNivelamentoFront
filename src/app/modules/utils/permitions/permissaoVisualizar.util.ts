import { PermitionUtil } from './permition.util';

export class PermissaoVisualizar{  
  get isAdministrador(){
    return PermitionUtil.isAdministrador();
  }

  get isFinanceiro(){
    return PermitionUtil.isFinanceiro();
  }

  get IsUsuario(){
    return PermitionUtil.IsUsuario();
  }
}