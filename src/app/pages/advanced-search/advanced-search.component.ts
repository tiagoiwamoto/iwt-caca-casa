import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AdvancedSearchInterface} from '../../view-models/advanced-search-interface';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
})
export class AdvancedSearchComponent implements OnInit {

  public selectedFilters = [];
  advancedSearch: AdvancedSearchInterface;

  constructor(public modalController: ModalController) {
    this.advancedSearch = {};
  }

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss();
  }

  checkFields(): void{
    console.log(JSON.stringify(this.advancedSearch));
  }

  validFilters(): void {
    if(this.advancedSearch.cityOrState !== undefined && this.advancedSearch.cityOrState.length > 0){
      if(this.selectedFilters.indexOf('Cidade/UF') === -1){
        this.selectedFilters.push('Cidade/UF');
      }
    } else {
      const index = this.selectedFilters.indexOf('Cidade/UF');
      if(this.selectedFilters[index] === 'Cidade/UF'){
        this.selectedFilters.splice(index, 1);
      }
    }

    if(this.advancedSearch.range !== undefined && this.advancedSearch.range > 0){
      if(this.selectedFilters.indexOf('Distancia') === -1){
        this.selectedFilters.push('Distancia');
      }
    } else {
      const index = this.selectedFilters.indexOf('Distancia');
      if(this.selectedFilters[index] === 'Distancia'){
        this.selectedFilters.splice(index, 1);
      }
    }

    if(this.advancedSearch.type !== undefined){
      if(this.selectedFilters.indexOf('Padrão') === -1){
        this.selectedFilters.push('Padrão');
      }
    } else {
      const index = this.selectedFilters.indexOf('Padrão');
      if(this.selectedFilters[index] === 'Padrão'){
        this.selectedFilters.splice(index, 1);
      }
    }

    if(this.advancedSearch.minValue !== undefined && this.advancedSearch.minValue.toString().length > 0){
      if(this.selectedFilters.indexOf('Menor Valor') === -1){
        this.selectedFilters.push('Menor Valor');
      }
    } else {
      const index = this.selectedFilters.indexOf('Menor Valor');
      if(this.selectedFilters[index] === 'Menor Valor'){
        this.selectedFilters.splice(index, 1);
      }
    }

    if(this.advancedSearch.maxValue !== undefined && this.advancedSearch.maxValue.toString().length > 0){
      if(this.selectedFilters.indexOf('Maior Valor') === -1){
        this.selectedFilters.push('Maior Valor');
      }
    } else {
      const index = this.selectedFilters.indexOf('Maior Valor');
      if(this.selectedFilters[index] === 'Maior Valor'){
        this.selectedFilters.splice(index, 1);
      }
    }
  }

}
