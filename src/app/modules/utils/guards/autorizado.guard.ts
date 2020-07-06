import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SecurityUtil } from '../security/security.util';


@Injectable()
export class AutorizadoGuard implements CanActivate{
    
    constructor(private router: Router){}

    canActivate() {
        const usuario = SecurityUtil.get();
        if (!usuario || !usuario.token) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}