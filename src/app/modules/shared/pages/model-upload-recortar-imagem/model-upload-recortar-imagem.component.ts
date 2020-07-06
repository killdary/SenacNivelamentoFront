import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observer, Observable } from 'rxjs';

@Component({
  selector: 'app-model-upload-recortar-imagem',
  templateUrl: './model-upload-recortar-imagem.component.html',
  styleUrls: ['./model-upload-recortar-imagem.component.scss'],
})
export class ModelUploadRecortarImagemComponent implements OnInit {

  @Input() imagemUrl: string = '../../../../../assets/img/imagem_senac.png';

  url: string = ''
  imageChangedEvent: any = '';
  croppedImage: any = '../../../../../assets/img/imagem_senac.png';
  fileToUpload: File;
  imageBase64String = '';
  retornarDadosModal: any = {};
  nameImage: string;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.url = '../../../../../assets/img/imagem_senac.png';

    this.getBase64ImageFromURL(this.imagemUrl).subscribe(base64data => {
      this.imagemUrl = 'data:image/jpg;base64,' + base64data;
    });
  }

  
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

    this.fileToUpload = this.base64ToFile(
      event.base64,
      this.nameImage,
    );
  }

  previewImagem(evento: any) {
    this.imageChangedEvent = event;
    if (evento.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(evento.target.files[0]);
      this.nameImage = evento.target.files[0].name;
      if (this.nameImage == undefined) {
        this.nameImage = "padrap.png"
      }
      reader.onload = (event: any) => {
        this.imagemUrl = event.target.result;
      }
    }
  }
  
  

  base64ToFile(data, filename) {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  salvarModal(){
    this.retornarDadosModal.image = this.croppedImage; 
    this.retornarDadosModal.imageBlob = this.fileToUpload; 
    this.fecharModal();
  }

  fecharModal() {
    this.modalCtrl.dismiss(this.retornarDadosModal);
  }
  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;  img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
}
