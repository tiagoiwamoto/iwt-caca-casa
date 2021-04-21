import { Component, OnInit } from '@angular/core';
import {SegmentActionEnum} from '../../view-models/segment-action.enum';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AdvancedSearchComponent} from '../advanced-search/advanced-search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  selectedSegment;
  constructor(public modalController: ModalController,
              public router: Router) {
    this.selectedSegment = SegmentActionEnum.BUY_HOUSE;
  }

  ngOnInit() {}

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
    this.router.navigate(['/list']);
  }

}
