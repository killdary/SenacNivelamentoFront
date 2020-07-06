import { ENivelAcesso } from '../../Cargo/enums/eNivelAcesso.enum';
import { SecurityUtil } from '../security/security.util';

export class PermitionUtil {

    public static isAdministrador() {
        return SecurityUtil.isInRole(ENivelAcesso.administrador);
    }

    public static isFinanceiro() {
        return SecurityUtil.isInRole(ENivelAcesso.financeiro) || this.isAdministrador();
    }

    public static IsUsuario() {
        return SecurityUtil.isInRole(ENivelAcesso.usuario) || this.isAdministrador();
    }
}