import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detail-propertie',
  templateUrl: './detail-propertie.component.html',
  styleUrls: ['./detail-propertie.component.scss'],
})
export class DetailPropertieComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goToHome(): void{
    this.router.navigate(['/list']);
  }

}
