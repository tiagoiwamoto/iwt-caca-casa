import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductInterface} from '../../../../view-models/product.interface';
import {LoadingController, ToastController} from '@ionic/angular';
import {UserProductvoInterface} from '../../../../view-models/user-productvo.interface';
import {ApiDtoInterface} from '../../../../view-models/api-dto.interface';
import {AppGatewayService} from '../../../../services/app-gateway.service';
import {environment} from '../../../../../environments/environment.prod';
import {HttpActionEnum} from '../../../../view-models/http-action.enum';
import {UserInterface} from '../../../../view-models/user.interface';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user-product-register',
  templateUrl: './user-product-register.component.html',
  styleUrls: ['./user-product-register.component.scss'],
})
export class UserProductRegisterComponent implements OnInit {

  image;
  userProduct: ProductInterface;
  userInterface: UserInterface;
  apiDto: ApiDtoInterface;
  userProductVo: UserProductvoInterface;
  tags;
  tmpTag;
  tmpImages = [];
  cities = [];

  constructor(private http: HttpClient,
              private router: Router,
              private appGateway: AppGatewayService,
              private toastController: ToastController,
              private loadingController: LoadingController) {
    this.userProduct = {};
    this.apiDto = {};
    this.tags = [];
    this.populateCities();
  }

  ngOnInit() {}

  async performSaveProduct(): Promise<void>{
    if(this.userProduct.title === undefined || this.userProduct.title.length < 1){
      const toast = await this.toastController.create({message: 'Informe um titulo', duration: 2000});
      await toast.present();
      return;
    }else if(this.userProduct.description === undefined || this.userProduct.description.length < 1) {
      const toast = await this.toastController.create({message: 'Informe uma descrição', duration: 2000});
      await toast.present();
      return;
    }else if(this.userProduct.price === undefined || this.userProduct.price < 1) {
      const toast = await this.toastController.create({message: 'Informe um valor', duration: 2000});
      await toast.present();
      return;
    }else if(this.tags.toString() === undefined || this.tags.toString().length < 1) {
      const toast = await this.toastController.create({message: 'Informe pelo menos uma tag', duration: 2000});
      await toast.present();
      return;
    }
    else if(this.userProduct.uf === undefined || this.userProduct.uf.length < 1) {
      const toast = await this.toastController.create({message: 'Informe o estado', duration: 2000});
      await toast.present();
      return;
    }else if(this.userProduct.city === undefined || this.userProduct.city.length < 1) {
      const toast = await this.toastController.create({message: 'Informe a cidade', duration: 2000});
      await toast.present();
      return;
    }
    this.userProduct.tagValue = this.tags.toString();
    this.userInterface = JSON.parse(localStorage.getItem('user'));
    this.userProduct.user = this.userInterface;
    this.userProductVo = {
      product: this.userProduct,
      images: this.tmpImages
    };
    const loading = await this.loadingController.create({
      message: 'Gravando imóvel',
    });
    await loading.present();
    const customHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json');
    this.appGateway.call(
      environment.url.concat('/v1/api/products'),
      this.userProductVo, HttpActionEnum.POST, customHeaders).then(async res => {
        console.log(res);
        this.apiDto = res;
        await loading.dismiss();
        // @ts-ignore
        const toast = await this.toastController.create({message: this.apiDto.message, duration: 2000});
        await toast.present();
        this.userProduct = {};
        this.tmpImages = [];
        this.tags = [];
        this.userProductVo = {};
        this.apiDto = {};
    }).catch(async error => {
      console.log(error);
      await loading.dismiss();
      const toast = await this.toastController.create({message: 'Falha ao cadastrar imóvel', duration: 2000});
      await toast.present();
    });
  }

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

  moneyConvert(event: any) {
    this.userProduct.price = event.target.value.replace(/[^\d\.]/g ,'');
  }

  goToHome(): void{
    this.router.navigate(['/home']);
  }

  populateCities(){
    this.userProduct.city = '';
    switch (this.userProduct.uf){
      case 'SP':
        this.cities = [
          {name: 'São Paulo', value: 'saopaulo'},
          {name: 'Campinas', value: 'campinas'},
          {name: 'São bernardo', value: 'saobernardo'},
        ];
        break;
      case 'RG':
        this.cities = [
          {name: 'Botafogo', value: 'botafogo'},
          {name: 'Barra da tijuca', value: 'barratijuca'},
        ];
        break;
      case 'MG':
        this.cities = [
          {name: 'Belo horizonte', value: 'belohorizonte'},
        ];
        break;
      case 'PR':
        this.cities = [
          {name: 'Curitiba', value: 'curitiba'},
          {name: 'Londrina', value: 'londrina'},
        ];
        break;
      default:
        this.cities = [];
    }
  }

}
