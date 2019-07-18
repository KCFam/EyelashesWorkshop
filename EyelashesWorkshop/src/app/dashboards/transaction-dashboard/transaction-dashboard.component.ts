import { Component, OnInit } from '@angular/core';

import { StaffService, TransactionDashboard, StaffTransaction } from '../../staffs/staff.service';

@Component({
  selector: 'app-transaction-dashboard',
  templateUrl: './transaction-dashboard.component.html',
  styleUrls: ['./transaction-dashboard.component.scss']
})
export class TransactionDashboardComponent implements OnInit {

  transactionDashboards: TransactionDashboard[] = [];
  staffTransactions: StaffTransaction[] = [];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    // Get the StaffTransaction list
    this.staffService.getStaffTransactions().subscribe(data => {
      this.staffTransactions = data
        .map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as StaffTransaction;
        });

      // fill the table
      
      for (var staffTransaction of this.staffTransactions) {
        for (var transaction of staffTransaction.Transactions) {
          // Insert unique
          if (this.transactionDashboards.length == 0) {
            console.log("dafda");
            var newTransactionDashboard = new TransactionDashboard;

            newTransactionDashboard.Volume = transaction.Volume;
            newTransactionDashboard.Length = transaction.Length;
            newTransactionDashboard.Curl = transaction.Curl;
            newTransactionDashboard.Hair = transaction.Hair;
            newTransactionDashboard.Quantity = transaction.Quantity;

            this.transactionDashboards.push(newTransactionDashboard);
          }
          else {
            for (var transactionDashboard of this.transactionDashboards) {
              if (transactionDashboard.Volume != transaction.Volume
                || transactionDashboard.Length != transaction.Length
                || transactionDashboard.Curl != transaction.Curl
                || transactionDashboard.Hair != transaction.Hair) {
                var newTransactionDashboard = new TransactionDashboard;

                newTransactionDashboard.Volume = transaction.Volume;
                newTransactionDashboard.Length = transaction.Length;
                newTransactionDashboard.Curl = transaction.Curl;
                newTransactionDashboard.Hair = transaction.Hair;
                newTransactionDashboard.Quantity = transaction.Quantity;

                this.transactionDashboards.push(newTransactionDashboard);
              }
              else {
                transactionDashboard.Quantity += transaction.Quantity;
              }
            }
          }

        }
      }
    });
  }
}
