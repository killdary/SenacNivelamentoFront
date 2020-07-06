import { ENivelAcesso } from '../../Cargo/enums/eNivelAcesso.enum';
import { FuncionarioModel } from '../../Funcionario/models/funcionario.model';

export class SecurityUtil{
    
    public static set(funcionario: FuncionarioModel) {
        const data = JSON.stringify(funcionario);
        localStorage.setItem('tnc.data', btoa(data));
    }

    public static get(): any {
        const data = localStorage.getItem('tnc.data');
        if (data) {
            return JSON.parse(atob(data));
        } else {
            return null;
        }
    }
    
    public static hasToken(): boolean {
        const usuario = this.get();

        if (usuario && usuario.token)
            return true;
        else
            return false;
    }

    public static isInRole(role: ENivelAcesso): boolean {
        const usuario = this.get();

        if (!usuario.funcionario) 
            return false;

        if (!usuario.funcionario.cargo || !usuario.funcionario.cargo.nivelAcesso) 
            return false;
        
        if ( usuario.funcionario.cargo.nivelAcesso == role) 
            return true;

        return false;
    }

    public static clear() {
        localStorage.removeItem('tnc.data');
    }
}