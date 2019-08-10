import { Component, OnInit } from '@angular/core';

import { ProductMaterialsService, ProductMaterialModel } from '../services/product-materials.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private productMaterialService: ProductMaterialsService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    
  }
}
