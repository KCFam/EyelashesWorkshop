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

  addProductTransaction(productTransactions: TransactionProductModel[]) {
    // Create the Data for the transaction
    var JSONstring: Object = new Object();
    for (var productTransaction of productTransactions) {
      var key = this.getProductionNameFull(
        productTransaction.Volume,
        productTransaction.Length,
        productTransaction.Curl,
        productTransaction.Hair,
        productTransaction.Type
      );
      JSONstring[key] = productTransaction.Quantity;
    }

    // Add data to datable
    this.db
      .collection("Products/ProductFinal/Transactions")
      .doc(new Date(Date.now()).toISOString())
      .set(JSON.parse(JSON.stringify(JSONstring)));
    console.log("New Product Transaction added!");
  }

  addProductToCurrent(productTransactions: TransactionProductModel[]) {
    // Get Product table
    var getData = this.getProductMaterial().subscribe(
      data => {
        var product = data.payload.data() as ProductModel;
        getData.unsubscribe();

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
          } else {
            // new history data
            product["ProductHistory"] = new Object();
          }

          // swallow Copy Products data to ProductHistory
          for (var key in product["Products"]) {
            product["ProductHistory"][currentProductDate][key] =
              product["Products"][key];
          }

          // Update the current Date
          product["Date"] = currentDate;
        }

        // Update new data to current Product Material
        for (var productTransaction of productTransactions) {
          var key = this.getProductionNameFull(
            productTransaction.Volume,
            productTransaction.Length,
            productTransaction.Curl,
            productTransaction.Hair,
            productTransaction.Type
          );
          if (product["Products"].hasOwnProperty(key)) {
            product["Products"][key] += productTransaction.Quantity;
          } else {
            product["Products"][key] = productTransaction.Quantity;
          }
        }

        // Call update transaction
        this.setProductMaterial(product);
        console.log("Product Material updated!");

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
        return "1000";
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
    return [
      "8mm",
      "9mm",
      "10mm",
      "11mm",
      "12mm",
      "13mm",
      "14mm",
      "15mm",
      "16mm"
    ];
  }

  getCurlOptions(): string[] {
    return ["C", "CC", "D"];
  }

  getHairOptions(): string[] {
    return ["0.05", "0.07", "0.10"];
  }

  getProductTypes(): string[] {
    return ["500Fan", "5Lines", "Lùa", "Lùa Mixed"];
  }

  getNumberProductLinesConsume(productType: string) {
    switch (productType) {
      case "500Fan":
        return 17;
      case "5Lines":
        return 5;
      case "Lùa":
        return 0;
      case "Lùa Mixed":
        return 0;
      default:
        console.log("Invalid productType for " + productType);
        return 0;
    }
  }

  getProductionNameFull(
    volume: string,
    length: string,
    curl: string,
    hair: string,
    type: string
  ) {
    return volume + "-" + length + "-" + curl + "-" + hair + "-" + type;
  }

  getProductionMaterialName(volume: string, length: string, hair: string) {
    return volume + "-" + length + "-" + hair;
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
