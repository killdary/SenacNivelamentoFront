import { EntidadeModel } from '../../utils/models/entidade.model';

export class EmpresaModel extends EntidadeModel{
    public nome?:string;
    public nomeFantasia?:string;
    public cnpj?:string;
    public logradouro?:string;
    public numero?:number;
    public bairro?:string;
    public cidade?:string;
    public estado?:string;
    public cep?:number;
    public pais?:string;
    public imagem?:string;
}