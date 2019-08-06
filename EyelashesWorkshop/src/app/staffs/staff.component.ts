import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StaffModel, StaffService } from '../services/staff.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  staff = new StaffModel();

  validationClassPhone: string = "form-control";
  validationClassName: string = "form-control";

  validationMessagePhone: string = "";
  validationMessageName: string = "";

  constructor(private staffService: StaffService, private router: Router) { 
  }

  ngOnInit() {
    this.staff.Credit = 0;
  }

  onSubmitForm() {
    var isSuccess = true;
    // Validates Phone number
    if(this.staff.Phone) {
      this.validationClassPhone = "form-control is-valid";
      this.validationMessagePhone = "";
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
      this.staff.Credit = this.staff.Credit*1000;
      this.staffService.addStaff(this.staff);
      console.log("Staff Name " + this.staff.Name + " added!");
      this.router.navigate(['']);
      return;
    }
  }
}
