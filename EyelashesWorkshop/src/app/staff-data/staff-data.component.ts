import { Component, OnInit } from "@angular/core";

import { StaffModel, StaffService } from "../services/staff.service";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-staff-data",
  templateUrl: "./staff-data.component.html",
  styleUrls: ["./staff-data.component.scss"]
})
export class StaffDataComponent implements OnInit {
  // Form Control Data
  staffList: StaffModel[];
  searchText: string = "";
  searchedStaffs: StaffModel[] = [];
  foundStaff: StaffModel = new StaffModel();
  isSearchSelected = false;

  // Form Selection

  // Form Editable
  isProductTypeEditable: boolean = false;

  constructor(
    private staffService: StaffService,
    private productService: ProductService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Get the Staff list
    var staffs = this.staffService.getStaffs().subscribe(data => {
      this.staffList = data.map(e => {
        return {
          ID: e.payload.doc.id,
          ...e.payload.doc.data()
        } as StaffModel;
      });
      staffs.unsubscribe();
    });
  }

  onSearch() {
    if (this.searchText == "") {
      return;
    }

    // Get the Staff list
    this.searchedStaffs = this.staffList.filter(
      staff =>
        staff.Name.toUpperCase().includes(this.searchText.toUpperCase()) ||
        staff.Phone.includes(this.searchText)
    );

    // Dirty
    this.isSearchSelected = false;

    // Clear Form
  }

  onSelectStaff(searchedStaff) {
    this.searchedStaffs = [searchedStaff];
    this.isSearchSelected = true;
    this.foundStaff = searchedStaff;
  }

  onTypeChange() {}

  enableEditProductType() {
    this.isProductTypeEditable = true;
  }

  disableEditProductType(isUpdated: boolean) {
    this.isProductTypeEditable = false;
    if (!isUpdated) return;

    // Update Staff data
    this.staffService.updateStaffProductType(this.foundStaff);
  }
}
