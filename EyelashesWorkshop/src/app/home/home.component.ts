import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

import {
  ProductMaterialsService,
  ProductMaterialModel
} from "../services/product-materials.service";
import { stringify } from "@angular/compiler/src/util";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private db: AngularFirestore) {}

  ngOnInit() {}

  ngAfterViewInit() {}
}
