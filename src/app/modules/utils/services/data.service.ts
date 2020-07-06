import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService
{
    public baseUrl = environment.apiEndPoint;

    constructor(private http: HttpClient){}

    public authenticate(data: any){
        return this.http.post(`${this.baseUrl}/api/account/login`, data);
    }


}