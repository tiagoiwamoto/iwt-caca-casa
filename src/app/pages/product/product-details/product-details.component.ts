import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ModalController, NavParams} from '@ionic/angular';
import {ProductDtoInterface} from '../../../view-models/product-dto.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  product: ProductDtoInterface;
  productDetails = [];

  constructor(private router: Router,
              private navParams: NavParams,
              private modalController: ModalController) { }

  ngOnInit() {
    this.product = this.navParams.get('product');
    this.productDetails = this.product.tagValue.split(',');

  }

  goToHome(): void{
    this.router.navigate(['/list']);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
