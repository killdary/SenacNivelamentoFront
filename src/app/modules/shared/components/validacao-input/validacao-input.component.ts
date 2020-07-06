import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-validacao-input',
  templateUrl: './validacao-input.component.html',
  styleUrls: ['./validacao-input.component.scss'],
})
export class ValidacaoInputComponent implements OnInit {

  @Input() mensagem_validacao:any[]=[];
  @Input() form: FormBuilder;
  @Input() campo: string;
  
  constructor() { }

  ngOnInit() {}

}
