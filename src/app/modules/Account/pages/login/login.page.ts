import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/modules/utils/services/data.service';
import { SecurityUtil } from 'src/app/modules/utils/security/security.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 
  public hide = true;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private service: DataService
    ) { 
      this.form = this.fb.group({
        login: ['killdary', Validators.compose([
          Validators.required
        ])],
        senha:['123456', Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required
        ])]
      });
    }

  ngOnInit() {
    SecurityUtil.clear();
  }

  toggleIcon(){
    this.hide = !this.hide;
  }

  async submit(){
    if (this.form.invalid) {
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Autenticando...'
    });
    await loading.present();

    this
      .service
      .authenticate(this.form.value)
      .subscribe(
        (resposta: any) =>{
          SecurityUtil.set(resposta.data);
          this.navCtrl.navigateRoot('/');
          loading.dismiss();
        },
        (error)=>{
          this.showError('Usuário ou senha inválidos.');
          loading.dismiss();
        }
      );
  }
  
  async showError(message) {
    const error = await this.toastCtrl.create({ message: message, duration: 3000,
    buttons:[{
      text: 'Fechar',
      role: 'cancel'
    }] });
    error.present();
  }
}
