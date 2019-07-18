import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StaffModel, StaffService } from '../staff.service';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss']
})
export class StaffEditComponent implements OnInit {
  staff = new StaffModel();

  validationClassPhone: string = "form-control";
  validationClassName: string = "form-control";

  validationMessagePhone: string = "";
  validationMessageName: string = "";

  constructor(private staffService: StaffService, private router: Router) { 
  }

  ngOnInit() {
    
  }

  onSubmitForm() {
    var isSuccess = true;
    // Validates Phone number
    if(this.staff.Phone) {
      this.validationClassPhone = "form-control is-valid";
      this.validationMessagePhone = "";
      // Validate duplicate
      //console.log(this.staffService.getStaffByID("qwzeuimmPMp1ROYvOdjF"));
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
      this.staffService.addStaff(this.staff);
      this.router.navigate(['TransactionDashboard']);
      return;
    }
  }
}
