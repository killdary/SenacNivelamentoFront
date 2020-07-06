import { Component, OnInit } from '@angular/core';
import { FuncionarioModel } from 'src/app/modules/Funcionario/models/funcionario.model';
import { environment } from 'src/environments/environment';
import { SecurityUtil } from 'src/app/modules/utils/security/security.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {

  funcionario: FuncionarioModel;
  urlAPI = environment.apiEndPoint;

  constructor(private router:Router) { }

  ngOnInit() {
    let dados = SecurityUtil.get();
    this.funcionario = dados.funcionario;
    this.funcionario.imagem = `${this.urlAPI}/${this.funcionario.imagem}`;
  }

  logout(){
    this.router.navigate(['/login']);
  }



}
