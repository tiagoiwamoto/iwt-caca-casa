import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-properties',
  templateUrl: './list-properties.component.html',
  styleUrls: ['./list-properties.component.scss'],
})
export class ListPropertiesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  openDetails(): void{
    this.router.navigate(['/detail']);
  }

  goToHome(): void{
    this.router.navigate(['/home']);
  }

}
