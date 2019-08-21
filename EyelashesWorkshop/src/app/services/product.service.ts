import { Injectable } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private db: AngularFirestore) {}

  getProductMaterial() {
    return this.db.doc("Products/ProductFinal").snapshotChanges();
  }

  setProductMaterial(product: ProductModel) {
    this.db
      .doc("Products/ProductFinal")
      .set(Object.assign({}, product), { merge: true });
  }

  addProductToCurrent(productTransactions: TransactionProductModel[]) {
    // Get Product table
    var getData = this.getProductMaterial().subscribe(
      data => {
        var product = data.payload.data() as ProductModel;

        // First time run? - No Date
        if (!product.hasOwnProperty("Date")) {
          // Update the current Date
          product["Date"] = new Date(Date.now()).toISOString().substr(0, 10);
        }

        // first time run? - No Products
        if (!product.hasOwnProperty("Products")) {
          // Update Products
          product["Products"] = new Object();
        }

        // Has Date and Product, Is the day passed?
        var currentDate = new Date(Date.now()).toISOString().substr(0, 10);
        var currentProductDate = product["Date"];

        // Check current date is passed
        if (currentDate !== currentProductDate) {
          // Copy the current data to history
          if (product.hasOwnProperty("ProductHistory")) {
            // has history data
            product["ProductHistory"][currentProductDate] = product["Products"];
          } else {
            // new history data
            product["ProductHistory"] = new Object();
            product["ProductHistory"][currentProductDate] = product["Products"];
          }

          // Update the current Date
          product["Date"] = currentDate;
        }

        // Update new data to current Product Material
        for (var productTransaction of productTransactions) {
          var key =
            productTransaction.Volume +
            "-" +
            productTransaction.Length +
            "-" +
            productTransaction.Curl +
            "-" +
            productTransaction.Hair +
            "-" +
            productTransaction.Type;
          if (product["Products"].hasOwnProperty(key)) {
            product["Products"][key] += productTransaction.Quantity;
          } else {
            product["Products"][key] = productTransaction.Quantity;
          }
        }

        // Call update transaction
        this.setProductMaterial(product);
        console.log("Product Material updated!");
        getData.unsubscribe();
        return;
      },
      error => console.error(error),
      () => {
        // Success
      }
    );
  }

  // Helper data
  getStaffTransactionPrice(volume: string, length: string, hair: string) {
    switch (volume) {
      case "3D":
        return "1200";
      case "4D":
        return "1400";
      case "5D":
        return "1600";
      case "6D":
        return "1900";
      default:
        return "1200";
    }
  }

  getVolumeOptions(): string[] {
    return ["3D", "4D", "5D", "6D"];
  }

  getLengthOptions(): string[] {
    return ["9mm", "10mm", "11mm", "12mm", "13mm", "14mm", "15mm", "16mm"];
  }

  getCurlOptions(): string[] {
    return ["C", "CC", "D"];
  }

  getHairOptions(): string[] {
    return ["0.05", "0.07", "0.10"];
  }

  getProductTypes(): string[] {
    return ["200 Fan", "500 Fan", "5 dây", "4 dây", "Lùa", "Lùa Mixed"];
  }
}

// Raw material model
export class TransactionProductModel {
  ID: string;
  Volume: string;
  Length: string;
  Curl: string;
  Hair: string;
  Type: string;
  Quantity: number;
}

export class ProductModel {
  // Flat object design
  Date: string;
  Products: Object;
}
