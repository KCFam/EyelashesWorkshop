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
    delete staff.ID;
    this.db.doc('Staffs/' + staff.ID).update(staff);
  }

  deleteStaff( staffID: string) {
    this.db.doc('Staffs/' + staffID).delete();
  }
}

export class StaffModel {
  ID: string;
  Name: string;
  Phone: string;
  Address: string;
  Note: string;
  Credit: string;
}