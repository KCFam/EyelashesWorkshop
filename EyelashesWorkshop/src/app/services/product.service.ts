import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private db: AngularFirestore ) { }

  // Helper data
  getPrice(volume:string, length:string, curl:string, hair: string) {
    switch(volume) {
      case "3D":
        return "900";
      case "4D":
        return "1000";
      default:
        return "1100";
    }
  }

  getVolumeOptions() : string[] {
    return ["3D","4D","5D"];
  }

  getLengthOptions() : string[] {
    return ["9mm","10mm","11mm","12mm","13mm","14mm","15mm","16mm","17mm"];
  }

  getCurlOptions() : string[] {
    return ["C","CC","D"];
  }

  getHairOptions() : string[] {
    return ["0.05","0.07","0.85","0.10"];
  }
}

// Raw material model
export class TransactionProductModel {
  ID: string;
  ProductType: string;
  Quantity: number;
}
