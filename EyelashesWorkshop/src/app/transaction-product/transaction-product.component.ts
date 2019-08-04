import { Component, OnInit, ViewChild,ElementRef, AfterViewInit } from '@angular/core';

import { StaffService, StaffModel } from '../services/staff.service';
import { TransactionProductService, TransactionProductModel, TransactionModel, TransactionProductSignatureModel} from '../services/transaction-product.service';
import { SignaturePadComponent } from '../Utilities/signature-pad/signature-pad.component';

@Component({
  selector: 'app-transaction-product',
  templateUrl: './transaction-product.component.html',
  styleUrls: ['./transaction-product.component.scss']
})
export class TransactionProductComponent implements AfterViewInit {
  // display flag
  isSearchSelected: boolean = false;
  isTypeAddable: boolean = false;

  // Form Control Data
  staffList: StaffModel[];
  searchText: string = "";
  searchedStaffs: StaffModel[] = [];
  
  selectedVolume: string = "";
  selectedLength: string = "";
  selectedCurl: string = "";
  selectedHair: string = "";
  selectedQuantity: number = 0;
  selectedPrice: number = 0;

  transactionProduct: TransactionProductModel = new TransactionProductModel();
  transactions: TransactionModel[] = [];

  totalQuantity: number = 0;
  totalPrice: number = 0;

  texts: string[];

  // Child Views
  @ViewChild(SignaturePadComponent, {static:false}) signPadRef : SignaturePadComponent;

  constructor( private staffService: StaffService, private transactionProductService : TransactionProductService) { }

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
    this.transactionProduct.StaffName = searchedStaff.Name;
  }

  onTypeChange() {
    if( this.selectedVolume && this.selectedLength && this.selectedCurl && this.selectedHair) {
      this.isTypeAddable = true;
      this.selectedPrice = Number.parseInt(this.transactionProductService.getPrice(this.selectedVolume, this.selectedLength, this.selectedCurl, this.selectedHair));
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
        var transaction = new TransactionModel();
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
  }
}
