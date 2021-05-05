import {Component, OnInit} from '@angular/core';
import {ProductDtoInterface} from '../../../view-models/product-dto.interface';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment.prod';
import {HttpActionEnum} from '../../../view-models/http-action.enum';
import {AppGatewayService} from '../../../services/app-gateway.service';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {ApiDtoInterface} from '../../../view-models/api-dto.interface';
import {Router} from '@angular/router';
import {ProductDetailsComponent} from '../product-details/product-details.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  products: ProductDtoInterface[];
  product: ProductDtoInterface;
  apiDto: ApiDtoInterface;

  constructor(private appGateway: AppGatewayService,
              private modalController: ModalController,
              private toastController: ToastController,
              private loadingController: LoadingController,
              private router: Router) {
    this.products = [];
    this.product = {};
  }

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
  }

  async loadProducts(): Promise<void>{
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    await loading.present();
    const customHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json');
    this.appGateway.call(
      environment.url.concat('/v1/api/products'),
      null, HttpActionEnum.GET, customHeaders).then(async res => {
      console.log(res);
      this.apiDto = res;
      this.products = this.apiDto.details;
      this.products.reverse();
      await loading.dismiss();
      this.apiDto = {};
    }).catch(async error => {
      console.log(error);
      await loading.dismiss();
      const toast = await this.toastController.create({message: 'Falha ao carregar imóveis', duration: 2000});
      await toast.present();
    });
  }

  openDetails(){

  }

  async presentModal(productDto: ProductDtoInterface) {
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: {product: productDto},
      swipeToClose: true,
    });
    return await modal.present();
  }

  goToHome(): void{
    this.router.navigate(['/home']);
  }

}
