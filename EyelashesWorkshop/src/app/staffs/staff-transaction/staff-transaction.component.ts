import { Component, OnInit, ViewChild,ElementRef, AfterViewInit } from '@angular/core';

import { StaffService, StaffModel, StaffTransaction, StaffHelper, Transaction } from '../staff.service';
import { SignaturePadComponent } from '../../Utilities/signature-pad/signature-pad.component';

@Component({
  selector: 'app-staff-transaction',
  templateUrl: './staff-transaction.component.html',
  styleUrls: ['./staff-transaction.component.scss']
})
export class StaffTransactionComponent implements AfterViewInit {

  staffList: StaffModel[];
  searchText: string = "";
  searchedStaffs: StaffModel[] = [];
  isSearchSelected: boolean = false;

  selectedVolume: string = "";
  selectedLength: string = "";
  selectedCurl: string = "";
  selectedHair: string = "";
  selectedQuantity: number = 0;
  selectedPrice: number = 0;

  isTypeAddable: boolean = false;

  staffTransaction: StaffTransaction = new StaffTransaction();
  transactions: Transaction[] = [];

  totalQuantity: number = 0;
  totalPrice: number = 0;

  @ViewChild(SignaturePadComponent, {static:false}) signPadRef : SignaturePadComponent;

  constructor( private staffService: StaffService) { }

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
    this.searchedStaffs = this.staffList.filter(staff => staff.Name.toUpperCase().includes(this.searchText.toUpperCase()));
  }

  onSelectStaff(searchedStaff: StaffModel) {
    this.searchedStaffs = [searchedStaff];
    this.isSearchSelected = true;
    this.staffTransaction.StaffName = searchedStaff.Name;
  }

  onTypeChange() {
    if( this.selectedVolume && this.selectedLength && this.selectedCurl && this.selectedHair) {
      this.isTypeAddable = true;
      this.selectedPrice = Number.parseInt(StaffHelper.getPrice(this.selectedVolume, this.selectedLength, this.selectedCurl, this.selectedHair));
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
    this.transactions = [];
    this.isTypeAddable = false;
    this.selectedVolume = "";
    this.selectedLength = "";
    this.selectedCurl = "";
    this.selectedHair = "";
    this.selectedQuantity = 0;
    this.selectedPrice = 0;
  }

  addTransaction() {
      if( this.selectedQuantity > 0) {
        var transaction = new Transaction();
        transaction.Volume = this.selectedVolume;
        transaction.Length = this.selectedLength;
        transaction.Curl = this.selectedCurl;
        transaction.Hair = this.selectedHair;
        transaction.Quantity = this.selectedQuantity;
        transaction.Price = this.selectedPrice;
        transaction.Total = this.selectedQuantity * this.selectedPrice;
        
        this.transactions.push(transaction);
        this.totalPrice = 0;
        this.totalQuantity = 0;
        for( var i=0; i < this.transactions.length; i++) {
          this.totalQuantity += this.transactions[i].Quantity;
          this.totalPrice += this.transactions[i].Total;
        }
      }
  }

  onSubmit() {
    console.log(this.signPadRef.signaturePad.toDataURL());
    return;
    if( this.searchedStaffs.length != 1) {
      return;
    }
    if( this.transactions.length < 1) {
      return;
    }

    this.staffTransaction.StaffName = this.searchedStaffs[0].Name;
    this.staffTransaction.Quantity = this.totalQuantity;
    this.staffTransaction.Total = this.totalPrice;
    this.staffTransaction.Transactions = this.transactions;

    this.staffService.addStaffTransaction(this.staffTransaction);
  }
}
