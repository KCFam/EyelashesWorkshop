import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import {
  ProductService,
  TransactionProductModel
} from "../services/product.service";
import { TransactionDashboardComponent } from "../dashboards/transaction-dashboard/transaction-dashboard.component";
@Component({
  selector: "app-product-transaction",
  templateUrl: "./product-transaction.component.html",
  styleUrls: ["./product-transaction.component.scss"]
})
export class ProductTransactionComponent implements OnInit {
  // Form Controls
  selectedFan: string = "";
  selectedLength: string = "";
  selectedCurl: string = "";
  selectedHair: string = "";
  selectedProductionType: string = "";
  selectedQuantity: number = 0;
  isShowAddType: boolean = false;

  // Driven Data
  productTransactions: TransactionProductModel[] = [];
  totalQuantity: number = 0;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {}

  // Type selection changed - Enable add menu
  onTypeChange() {
    if (
      this.selectedFan == "" ||
      this.selectedLength == "" ||
      this.selectedCurl == "" ||
      this.selectedHair == "" ||
      this.selectedProductionType == ""
    )
      return;

    // All selection have value
    this.isShowAddType = true; // show add menu
  }

  addTransaction() {
    // Check for duplicate
    for (var product of this.productTransactions) {
      if (
        product.Volume == this.selectedFan &&
        product.Length == this.selectedLength &&
        product.Curl == this.selectedCurl &&
        product.Hair == this.selectedHair &&
        product.Type == this.selectedProductionType
      ) {
        // Add Quantity
        product.Quantity += this.selectedQuantity;
        this.recalculateTotal();
        return;
      }
    }

    // New Product Transaction Type
    var transaction = new TransactionProductModel();
    transaction.Volume = this.selectedFan;
    transaction.Length = this.selectedLength;
    transaction.Curl = this.selectedCurl;
    transaction.Hair = this.selectedHair;
    transaction.Type = this.selectedProductionType;
    transaction.Quantity = this.selectedQuantity;

    this.productTransactions.push(transaction);

    this.recalculateTotal();
  }

  // Remove item from table
  removeTransaction(transaction) {
    const index = this.productTransactions.indexOf(transaction, 0);
    if (index > -1) {
      this.productTransactions.splice(index, 1);

      this.recalculateTotal();
    }
  }

  // RecalculateTotal
  recalculateTotal() {
    this.totalQuantity = 0;
    for (let production of this.productTransactions) {
      this.totalQuantity += production.Quantity;
    }
  }

  formClear() {
    this.isShowAddType = false;
    this.productTransactions = [];
    this.selectedCurl = "";
    this.selectedFan = "";
    this.selectedHair = "";
    this.selectedLength = "";
    this.selectedProductionType = "";
    this.selectedQuantity = 0;
  }

  onSubmit() {
    // ******* Update Product data to to ProductMaterials table ********
    // Update Product data to Product table
    console.log("Inside" + this.productTransactions);
    this.productService.addProductToCurrent(this.productTransactions);

    this.router.navigate([""]);

    return;
  }
}
