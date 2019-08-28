import { Injectable } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

@Injectable({
  providedIn: "root"
})
export class ExpensesService {
  constructor(private db: AngularFirestore) {}

  getStaffPayment() {
    return this.db.doc("Expenses/StaffPayment").snapshotChanges();
  }

  addPayment(staffPayment: StaffPaymentModel) {
    // Get Payment Doc table
    var getData = this.getStaffPayment().subscribe(
      data => {
        var staffPaymentDoc = data.payload.data() as Object;
        getData.unsubscribe();

        var time = staffPayment.Time;
        delete staffPayment.Time;
        staffPaymentDoc[time] = staffPayment;

        this.db
          .doc("Expenses/StaffPayment")
          .set(JSON.parse(JSON.stringify(staffPaymentDoc)));

        console.log("Expenses Staff Payment updated!");

        return;
      },
      error => console.error(error),
      () => {
        // Success
      }
    );
  }
}

export class StaffPaymentModel {
  Time: string;
  PaymentType: string;
  Amount: number;
  Note: string;
}
