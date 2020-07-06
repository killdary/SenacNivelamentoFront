import { BaseService } from '../../utils/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class FuncionarioService extends BaseService{
    API_URL='funcionario';

    constructor(public http: HttpClient){
        super(http)
    }

    public buscarPorId(id: number):Observable<any>{
        return this.http.get<any>(`${this.getApiUrl()}/${id}`);
    }

    public listarFuncionarios(filtro: any): Observable<any>{
        return this.http.get<any>(this.getApiUrl()+this.prepararParametros(filtro));
    }   

}