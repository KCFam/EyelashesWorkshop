import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TransactionProductService {

  constructor( private db: AngularFirestore ) { }

  getStaffTransactions() {
    return this.db.collection('StaffTransactions').snapshotChanges();
  }

  addStaffTransaction( transactionProduct: TransactionProductModel) {
    this.db.collection<TransactionProductModel>('StaffTransactions').add(JSON.parse(JSON.stringify(transactionProduct)));
    console.log("New Staff Transaction added");
  }

  addTransactionSignature() {
  }

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

export class TransactionProductModel {
  ID: string;
  StaffName: string;
  Transactions: TransactionModel[];
  Quantity: number;
  Total: number;
}

export class TransactionModel {
  ID: string;
  Volume: string;
  Length: string;
  Curl: string;
  Hair: string;
  Quantity: number;
  Price: number;
  Total: number;
}

export class TransactionProductSignatureModel {
  ID: string;
  StaffTransactionID: string;
  Signature: string;
}

export class TransactionDashboardModel {
  Volume: string;
  Length: string;
  Curl: string;
  Hair: string;
  Quantity: number;
}