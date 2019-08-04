import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { LanguageService } from '../language.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  staff: StaffModel;

  constructor( private firestore: AngularFirestore ) { 
    
  }

  getStaffs() {
    return this.firestore.collection('Staffs').snapshotChanges();
  }

  getStaffByPhone(phone: string) {
    // this.firestore.collection('Staffs').doc()
    //   this.firestore.collection('Staffs').ref.where("Phone","==",phone)
    //   );
    
  }

  getStaffByID(id: string) : Observable<StaffModel> {
    // this.firestore.firestore.collection('Staffs').limit(1)..doc(id).snapshotChanges().subscribe(actions => {       
    //   return actions.map(a => {
    //     const data = a.payload.doc.data() as Race;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   });
    // });
    this.firestore.collection('Staffs').doc(id).get().subscribe((docRef ) => {    
      return docRef.data() as StaffModel;          
    });

    return null;
  }

  addStaff(staff: StaffModel) {
    staff.NameAlias = LanguageService.NonUnicode(staff.Name);
    this.firestore.collection<StaffModel>('Staffs').add(JSON.parse(JSON.stringify(staff)));
    console.log("New Staff added");
  }

  updateStaff(staff: StaffModel) {
    delete staff.ID;
    this.firestore.doc('Staffs/' + staff.ID).update(staff);
  }

  deleteStaff( staffID: string) {
    this.firestore.doc('Staffs/' + staffID).delete();
  }

  addStaffTransaction( staffTransaction: StaffTransaction) {
    this.firestore.collection<StaffTransaction>('StaffTransactions').add(JSON.parse(JSON.stringify(staffTransaction)));
    console.log("New Staff Transaction added");
  }

  getStaffTransactions() {
    return this.firestore.collection('StaffTransactions').snapshotChanges();
  }

  addTransactionSignature() {

  }
}

export class StaffHelper{
  static getPrice(volume:string, length:string, curl:string, hair: string) {
    switch(volume) {
      case "3D":
        return "900";
      case "4D":
        return "1000";
      default:
        return "1100";
    }
  }
}

export class StaffModel {
  ID: string;
  Name: string;
  Phone: string;
  Address: string;
  Note: string;
  NameAlias: string;
}

export class StaffTransaction {
  ID: string;
  StaffName: string;
  Transactions: Transaction[];
  Quantity: number;
  Total: number;
}

export class Transaction {
  ID: string;
  Volume: string;
  Length: string;
  Curl: string;
  Hair: string;
  Quantity: number;
  Price: number;
  Total: number;
}

export class StaffTransactionSignature {
  ID: string;
  StaffTransactionID: string;
  Signature: string;
}

export class TransactionDashboard {
  Volume: string;
  Length: string;
  Curl: string;
  Hair: string;
  Quantity: number;
}