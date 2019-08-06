import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { LanguageService } from '../language.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  staff: StaffModel;

  constructor( private db: AngularFirestore ) { 
    
  }

  getStaffs() {
    return this.db.collection('Staffs').snapshotChanges();
  }

  addStaff(staff: StaffModel) {
    this.db.collection<StaffModel>('Staffs').add(JSON.parse(JSON.stringify(staff)));
    console.log("New Staff added");
  }

  updateStaff(staff: StaffModel) {
    const id = staff.ID;
    delete staff.ID;
    this.db.doc('Staffs/' + id).update(staff);
  }

  deleteStaff( staffID: string) {
    this.db.doc('Staffs/' + staffID).delete();
  }

  addStaffTransaction(staffID: string, staffTransaction: StaffTransactionModel) {
    this.db.collection('Staffs/'+staffID+"/Transactions").doc(staffTransaction.ID).set(JSON.parse(JSON.stringify(staffTransaction)));
    console.log("New Staff Transaction added!");
  }
}

export class StaffModel {
  ID: string;
  Name: string;
  Phone: string;
  Address: string;
  Note: string;
  Credit: number;
  Transactions: StaffTransactionModel[];
}

export class StaffTransactionModel {
  ID: string;     // Timestamp
  DateTime: string;
  TransactionItems: StaffTransactionItemModel[];
  Quantity: number;
  Total: number;
  Signature: string;
}

export class StaffTransactionItemModel {
  Volume: string;
  Length: string;
  Hair: string;
  Quantity: number;
  Price: number;
  Total: number;
}