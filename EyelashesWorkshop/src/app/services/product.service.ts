import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private db: AngularFirestore ) { }

  // Helper data
  getStaffTransactionPrice(volume:string, length:string, hair: string) {
    switch(volume) {
      case "3D":
        return "1200";
      case "4D":
        return "1400";
      case "5D":
        return "1600";
      case "6D":
        return "1900";
      default:
        return "1200";
    }
  }

  getVolumeOptions() : string[] {
    return ["3D","4D","5D","6D"];
  }

  getLengthOptions() : string[] {
    return ["9mm","10mm","11mm","12mm","13mm","14mm","15mm","16mm"];
  }

  getCurlOptions() : string[] {
    return ["C","CC","D"];
  }

  getHairOptions() : string[] {
    return ["0.05","0.07","0.10"];
  }
}

// Raw material model
export class TransactionProductModel {
  ID: string;
  ProductType: string;
  Quantity: number;
}
