import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { StaffService, StaffModel, StaffTransactionModel, StaffTransactionItemModel } from '../services/staff.service';
import { ProductService, TransactionProductModel } from '../services/product.service';
import { SignaturePadComponent } from '../Utilities/signature-pad/signature-pad.component';

@Component({
  selector: 'app-staff-transaction',
  templateUrl: './staff-transaction.component.html',
  styleUrls: ['./staff-transaction.component.scss']
})
export class StaffTransactionComponent implements AfterViewInit {
  // display flag
  isSearchSelected: boolean = false;
  isTypeAddable: boolean = false;

  // Form Control Data
  staffList: StaffModel[];
  searchText: string = "";
  searchedStaffs: StaffModel[] = [];
  foundStaff: StaffModel = new StaffModel();

  selectedVolume: string = "";
  selectedLength: string = "";
  selectedHair: string = "";
  selectedQuantity: number = 0;
  selectedPrice: number = 0;

  staffTransaction: StaffTransactionModel = new StaffTransactionModel();
  staffTransactionItems: StaffTransactionItemModel[] = [];

  totalQuantity: number = 0;
  totalPrice: number = 0;

  // Modal data
  adjustmentAmount: number = 0;
  finalTotal: number = 0;

  // Child Views
  @ViewChild(SignaturePadComponent, { static: false }) signPadRef: SignaturePadComponent;

  constructor(private staffService: StaffService, private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
    // Get the Staff list
    this.staffService.getStaffs().subscribe(data => {
      this.staffList = data
        .map(e => {
          return {
            ID: e.payload.doc.id,
            ...e.payload.doc.data()
          } as StaffModel;
        })
    });
  }

  ngAfterViewInit() {
  }

  onSearch() {
    if (this.searchText == "") {
      this.formClear();
      return;
    }

    // Get the Staff list
    this.searchedStaffs = this.staffList.filter(
      staff =>
        staff.Name.toUpperCase().includes(this.searchText.toUpperCase()) ||
        staff.Phone.includes(this.searchText)
    );
  }

  onSelectStaff(searchedStaff: StaffModel) {
    this.searchedStaffs = [searchedStaff];
    this.isSearchSelected = true;
    this.foundStaff = searchedStaff;
  }

  onTypeChange() {
    if (this.selectedVolume && this.selectedLength && this.selectedHair) {
      this.isTypeAddable = true;
      this.selectedPrice = Number.parseInt(this.productService.getStaffTransactionPrice(this.selectedVolume, this.selectedLength, this.selectedHair));
    }
    else {
      this.isTypeAddable = false;
    }
  }

  formClear() {
    // Reset value
    this.searchText = "";
    this.isSearchSelected = false;
    this.searchedStaffs = [];
    this.staffTransactionItems = [];
    this.isTypeAddable = false;
    this.selectedVolume = "";
    this.selectedLength = "";
    this.selectedHair = "";
    this.selectedQuantity = 0;
    this.selectedPrice = 0;
  }

  addTransaction() {
    if (this.selectedQuantity > 0) {
      var staffTransactionItem = new StaffTransactionItemModel();
      staffTransactionItem.Volume = this.selectedVolume;
      staffTransactionItem.Length = this.selectedLength;
      staffTransactionItem.Hair = this.selectedHair;
      staffTransactionItem.Quantity = this.selectedQuantity;
      staffTransactionItem.Price = this.selectedPrice;
      staffTransactionItem.Total = this.selectedQuantity * this.selectedPrice;
      this.staffTransactionItems.push(staffTransactionItem);

      this.recalculateTotal();
    }
  }
  removeTransaction(transaction: StaffTransactionItemModel) {
    const index = this.staffTransactionItems.indexOf(transaction, 0);
    if (index > -1) {
      this.staffTransactionItems.splice(index, 1);

      this.recalculateTotal();
    }
  }
  recalculateTotal() {
    this.totalPrice = 0;
    this.totalQuantity = 0;
    for (var i = 0; i < this.staffTransactionItems.length; i++) {
      this.totalQuantity += this.staffTransactionItems[i].Quantity;
      this.totalPrice += this.staffTransactionItems[i].Total;
    }

    this.adjustmentAmount = (this.totalPrice + this.foundStaff.Credit)/1000;
  }

  // Modal functions
  onAdjustChange() {
    this.finalTotal = (this.totalPrice + this.foundStaff.Credit) - this.adjustmentAmount * 1000;
  }


  onSubmit() {
    //console.log(this.signPadRef.signaturePad.toDataURL());

    // ******* Store Transaction data to Staff Table ********
    // Refine Transactions Data
    this.staffTransaction.ID = new Date(Date.now()).toISOString();
    this.staffTransaction.DateTime = this.staffTransaction.ID;
    this.staffTransaction.Quantity = this.totalQuantity;
    this.staffTransaction.Signature = this.signPadRef.signaturePad.toDataURL();
    this.staffTransaction.Total = this.totalPrice;
    this.staffTransaction.TransactionItems = this.staffTransactionItems;

    // Add Transaction to Staff table
    this.staffService.addStaffTransaction(this.foundStaff.ID, this.staffTransaction);

    // ******* Update Staff data to Staff Table ********
    this.foundStaff.Credit = this.finalTotal;
    this.staffService.updateStaff(this.foundStaff);

    this.router.navigate(['']);

    return;
  }

}
