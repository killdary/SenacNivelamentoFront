import { EntidadeModel } from '../../utils/models/entidade.model';
import { EmpresaModel } from '../../Empresa/models/empresa.model';
import { CargoModel } from '../../Cargo/Model/cargo.model';

export class FuncionarioModel extends EntidadeModel{    
    public nome?:string;
    public login?:string;
    public senha?:string;
    public cpf?:string;
    public logradouro?:string;
    public numero?:number;
    public bairro?:string;
    public cidade?:string;
    public estado?:string;
    public cep?:number;
    public pais?:string;
    public imagem?:string;
    public empresa?:EmpresaModel;
    public empresaId?:Number;
    public cargo?:CargoModel;
    public cargoId?:Number;
    public dataExclusao?:Date;
}