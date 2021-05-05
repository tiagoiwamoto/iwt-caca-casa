import { Component, OnInit } from '@angular/core';
import {SegmentActionEnum} from '../../view-models/segment-action.enum';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AdvancedSearchComponent} from '../advanced-search/advanced-search.component';
import {AppGatewayService} from '../../services/app-gateway.service';
import {ApiDtoInterface} from '../../view-models/api-dto.interface';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {HttpActionEnum} from '../../view-models/http-action.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  apiDto: ApiDtoInterface;
  totalProducts = 0;
  selectedSegment;
  constructor(private appGateway: AppGatewayService,
              private modalController: ModalController,
              private router: Router) {
    this.selectedSegment = SegmentActionEnum.BUY_HOUSE;
  }

  async ngOnInit(): Promise<void> {
    await this.getTotalProducts();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AdvancedSearchComponent,
      swipeToClose: true,
    });
    return await modal.present();
  }

  segmentChanged(ev: any) {
    switch (ev.detail.value){
      case 'BUY_HOUSE':
        this.selectedSegment = SegmentActionEnum.BUY_HOUSE;
        break;
      case 'BUY_APTO':
        this.selectedSegment = SegmentActionEnum.BUY_APTO;
        break;
      case 'WANT_SELL':
        this.selectedSegment = SegmentActionEnum.WANT_SELL;
        break;
      default:
    }
  }

  openList(): void{
    this.router.navigate(['/products']);
  }

  async getTotalProducts(): Promise<void>{
    const customHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json');
    this.appGateway.call(
      environment.url.concat('/v1/api/products/total'),
      null, HttpActionEnum.GET, customHeaders).then(async res => {
      console.log(res);
      this.apiDto = res;
      this.totalProducts = this.apiDto.details;
      this.apiDto = {};
    }).catch(async error => {
      console.log(error);
    });
  }

}
