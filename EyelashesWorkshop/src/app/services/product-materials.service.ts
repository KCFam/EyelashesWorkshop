import { Injectable } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { ProductService, TransactionProductModel } from "./product.service";

@Injectable({
  providedIn: "root"
})
export class ProductMaterialsService {
  constructor(
    private db: AngularFirestore,
    private productService: ProductService
  ) {}

  getProductMaterial() {
    return this.db.doc("Products/ProductMaterial").snapshotChanges();
  }

  updateProductMaterial(productMaterial: ProductMaterialModel) {
    this.db.doc("Products/ProductMaterial").update(productMaterial);
  }

  setProductMaterial(productMaterial: ProductMaterialModel) {
    this.db
      .doc("Products/ProductMaterial")
      .set(Object.assign({}, productMaterial), { merge: true });
  }

  addProductMaterial(productMaterial: ProductMaterialModel) {
    this.db
      .collection("Products")
      .add(JSON.parse(JSON.stringify(productMaterial)));
    console.log("New Product Material added");
  }

  //! TODO:
  substractUsedMaterial(productTransactions: TransactionProductModel[]) {
    // Get ProductMaterials table
    var getData = this.getProductMaterial().subscribe(
      data => {
        var productMaterial = data.payload.data() as ProductMaterialModel;
        getData.unsubscribe();

        for (var product of productTransactions) {
          var numberUsedLines = this.productService.getNumberProductLinesConsume(
            product.Type
          );
        }
      },
      error => console.error(error),
      () => {
        // Success
      }
    );
  }

  // Add list of new product Material Products to Table
  addProductMaterialsToCurrent(productMaterialProducts: ProductMaterialModel) {
    // Get ProductMaterials table
    var getData = this.getProductMaterial().subscribe(
      data => {
        var productMaterial = data.payload.data() as ProductMaterialModel;
        getData.unsubscribe();

        // First time run? - No Date
        if (!productMaterial.hasOwnProperty("Date")) {
          // Update the current Date
          productMaterial["Date"] = new Date(Date.now())
            .toISOString()
            .substr(0, 10);
        }

        // first time run? - No Products
        if (!productMaterial.hasOwnProperty("Products")) {
          // Update Products
          productMaterial["Products"] = new Object();
        }

        // Has Date and Product, Is the day passed?
        var currentDate = new Date(Date.now()).toISOString().substr(0, 10);
        var currentProductDate = productMaterial["Date"];

        // Check current date is passed
        if (currentDate !== currentProductDate) {
          // Copy the current data to history
          if (productMaterial.hasOwnProperty("ProductHistory")) {
            // has history data
          } else {
            // new history data
            productMaterial["ProductHistory"] = new Object();
          }

          // swallow Copy Products data to ProductHistory
          for (var key in productMaterial["Products"]) {
            productMaterial["ProductHistory"][currentProductDate][key] =
              productMaterial["Products"][key];
          }

          // Update the current Date
          productMaterial["Date"] = currentDate;
        }

        // Update new data to current Product Material
        for (var key in productMaterialProducts) {
          if (productMaterial["Products"].hasOwnProperty(key)) {
            productMaterial["Products"][key] += productMaterialProducts[key];
          } else {
            productMaterial["Products"][key] = productMaterialProducts[key];
          }
        }

        // Call update transaction
        this.setProductMaterial(productMaterial);
        console.log("Product Material updated!");

        return;
      },
      error => console.error(error),
      () => {
        // Success
      }
    );
  }
}

export class ProductMaterialModel {
  // Flat object design
  Date: string;
  Products: Object;
}
