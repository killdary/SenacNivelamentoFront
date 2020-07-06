import { EntidadeModel } from '../../utils/models/entidade.model';
import { ENivelAcesso } from '../enums/eNivelAcesso.enum';

export class CargoModel extends EntidadeModel{
    public nome?:string;
    public sigla?: string;
    public nivelAcesso?:ENivelAcesso;
}