import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductInterface} from '../../../../view-models/product.interface';
import {ProductImageInterface} from '../../../../view-models/product-image.interface';
import {LoadingController, ToastController} from '@ionic/angular';


@Component({
  selector: 'app-user-product-register',
  templateUrl: './user-product-register.component.html',
  styleUrls: ['./user-product-register.component.scss'],
})
export class UserProductRegisterComponent implements OnInit {

  image;
  userProduct: ProductInterface;
  imgUploadLoading;
  tags;
  tmpTag;
  tmpImages = [];

  constructor(private http: HttpClient,
              private toastController: ToastController,
              private loadingController: LoadingController) {
    this.userProduct = {};
    this.tags = [];
  }

  ngOnInit() {}

  async upload(str: any): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Enviando imagem',
    });
    await loading.present();
    const formData = new FormData();
    this.image = str.target.files[0];
    formData.append('image', this.image);
    console.log(formData, this.image);
    this.http.post('https://public-variables.000webhostapp.com/beta.php', formData)
      .toPromise().then(async res => {
        console.log(res);
        // @ts-ignore
      this.tmpImages.push('https://public-variables.000webhostapp.com/upload/'.concat(res.url));
      console.log(this.tmpImages);
      await loading.dismiss();
      // @ts-ignore
      const toast = await this.toastController.create({message: res.msg, duration: 2000});
      await toast.present();
    }).catch(async error => {
      console.log(error);
      await loading.dismiss();
      const toast = await this.toastController.create({message: 'Falha ao enviar imagem', duration: 2000});
      await toast.present();
    });
  }

  addToTags(tag: string){
    this.tags.push(tag);
    this.tmpTag = '';
  }

}
