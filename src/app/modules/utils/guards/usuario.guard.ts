import { CanActivate } from '@angular/router';
import { PermitionUtil } from '../permitions/permition.util';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioGuard implements CanActivate{
    constructor(){}

    canActivate(){
        return PermitionUtil.IsUsuario();
    }
}