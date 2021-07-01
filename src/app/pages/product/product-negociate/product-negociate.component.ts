import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-negociate',
  templateUrl: './product-negociate.component.html',
  styleUrls: ['./product-negociate.component.scss'],
})
export class ProductNegociateComponent implements OnInit {

  isFindingCorretor = true;
  isCorretor = false;
  barTitle = 'Buscando corretor';
  messages = [
    {name: 'Usuário', msg: 'Gostaria de saber mais sobre...', userType: 'USER'},
    {name: 'Corretor', msg: 'Bom dia, como posso te ajudar ?', userType: 'CORRETOR'},
  ];

  constructor(private router: Router) {
    this.delay(5000).then(() => {
      this.isFindingCorretor = false;
      this.barTitle = 'Negociação';
    });
  }

  ngOnInit() {}

  goToHome(): void{
    this.router.navigate(['/home']);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
