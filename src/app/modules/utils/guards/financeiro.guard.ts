import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { PermitionUtil } from '../permitions/permition.util';

@Injectable()
export class FinanceiroGuard implements CanActivate{
    constructor(){}

    canActivate(){
        return PermitionUtil.isFinanceiro();
    }
}