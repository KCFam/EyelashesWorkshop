import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor( private firestore: AngularFirestore ) { }

  getStaffs() {
    return this.firestore.collection('Staffs').snapshotChanges();
  }

  addStaff(staff: StaffModel) {
    this.firestore.collection<StaffModel>('Staffs').add(JSON.parse(JSON.stringify(staff)));
  }

  updateStaff(staff: StaffModel) {
    delete staff.ID;
    this.firestore.doc('Staffs/' + staff.ID).update(staff);
  }

  deleteStaff( staffID: string) {
    this.firestore.doc('Staffs/' + staffID).delete();
  }
}

export class StaffModel {
  ID: string;
  Name: string;
  Phone: string;
  Address: string;
  Note: string;
}
