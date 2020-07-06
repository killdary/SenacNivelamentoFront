import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SecurityUtil } from '../security/security.util';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class BaseService
{
    abstract API_URL: string;
    BASE_URL= `${environment.apiEndPoint}/api`;

    httpOptions = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
        // Authorization: `Bearer ${SecurityUtil.get().token}`,
      })
    }

    
  constructor(@Inject('http') public http: HttpClient) {
  }

  prepararParametros(filtro: any): string {
    let params = '?';

    Object.keys(filtro)
      .forEach(key => filtro[key] === null && delete filtro[key]);

    if (filtro) {
      const paramsList = Object.keys(filtro)
      .map((param) => this.retornarParametrosComArray(param.toString(), filtro[param]))
      .join('&');

      params = params + paramsList;
    }

    return params;
  }

  retornarParametrosComArray(nome: string, campo: any): string {
    let textoArray = '';
    let caracterLigacao = '';
    if (Array.isArray(campo)) {
      campo.forEach(valor => {
        textoArray += caracterLigacao + nome  + '=' + valor;
        caracterLigacao = '&';
      });
      return textoArray;
    }
    return nome  + '=' + encodeURIComponent(campo);
  }
  
  getApiUrl = () => `${this.BASE_URL}/${this.API_URL}`;
  
  public salvarImagem(id: string, imagem: any): Observable<any>{
    return this.http.post<any>(`${this.getApiUrl()}/imagem/${id}`, imagem, this.httpOptions);
  }    

  save = (model: any): Observable<any> => this.http.post<any>(this.getApiUrl(), model, this.httpOptions);
  
  update = (model: any): Observable<any> => this.http.put<any>(this.getApiUrl(), model, this.httpOptions);

  delete = (id: string): Observable<any> => this.http.delete<any>(`${this.getApiUrl()}/${id}`, this.httpOptions);
}