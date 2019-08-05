import { Component, OnInit, ViewChild,ElementRef, AfterViewInit } from '@angular/core';

import { StaffService, StaffModel, StaffTransactionModel, StaffTransactionItemModel } from '../services/staff.service';
import { ProductService, TransactionProductModel} from '../services/product.service';
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
  @ViewChild(SignaturePadComponent, {static:false}) signPadRef : SignaturePadComponent;

  constructor( private staffService: StaffService, private productService : ProductService) { }

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
    if(this.searchText == "") {
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
  }

  onTypeChange() {
    if( this.selectedVolume && this.selectedLength && this.selectedHair) {
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
      if( this.selectedQuantity > 0) {
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
  removeTransaction(transaction : StaffTransactionItemModel) {
    const index = this.staffTransactionItems.indexOf(transaction,0);
    if (index > -1) {
      this.staffTransactionItems.splice(index,1);

      this.recalculateTotal();
    }
  }
  recalculateTotal() {
    this.totalPrice = 0;
        this.totalQuantity = 0;
        for( var i=0; i < this.staffTransactionItems.length; i++) {
          this.totalQuantity += this.staffTransactionItems[i].Quantity;
          this.totalPrice += this.staffTransactionItems[i].Total;
        }
  }

  // Modal functions
  onAdjustChange() {
    this.finalTotal = 500000 - this.adjustmentAmount*1000;
  }


  onSubmit() {
    console.log(this.signPadRef.signaturePad.toDataURL());
    return;
  }

}
