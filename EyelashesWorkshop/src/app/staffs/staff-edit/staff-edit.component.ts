import { Component, OnInit } from '@angular/core';

import { StaffModel, StaffService } from '../staff.service';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss']
})
export class StaffEditComponent implements OnInit {
  staff: StaffModel;

  validationClassPhone: string = "form-control";
  validationClassName: string = "form-control";

  validationMessagePhone: string = "";
  validationMessageName: string = "";

  constructor() { 
    this.staff = new StaffModel();
  }

  ngOnInit() {
  }

  onSubmitForm() {
    var isSuccess = true;

    // Validates Phone number
    if(this.staff.Phone) {
      this.validationClassPhone = "form-control is-valid";
      this.validationMessagePhone = "";
      // TODO: Validate duplicate
    }
    else {
      this.validationClassPhone = "form-control is-invalid";
      this.validationMessagePhone = "Phone number is required!";

      isSuccess = false;
    }

    // Validates Name
    if(this.staff.Name) {
      this.validationClassName = "form-control is-valid";
      this.validationMessageName = "";
    }
    else {
      this.validationClassName = "form-control is-invalid";
      this.validationMessageName = "Name is required!";

      isSuccess = false;
    }

    if( isSuccess) {
      // TODO: Redirect
    }
    console.log(this.validationClassPhone);
  }
}
