import { Component } from '@angular/core';
import { DashboardController } from '../../controller/dashboard.controller';
import { SaleInterface } from '../../interfaces/item-iterface';
import { CommonEngine } from '@angular/ssr/node';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {
  activeTab: 'today' | 'all' = 'today';
  allSales: SaleInterface[] = [];
  allSalesToday: SaleInterface[] = [];
  quantityPerItems: {
    itemId: number;
    itemName: string;
    totalQuantity: number;
  } | null = null;

  totalSales: number = 0;
  totalSalesToday = 0;
  currentPageAll = 1;
  itemsPerPageAll = 5;

  currentPageToday = 1;
  itemsPerPageToday = 5;

  constructor(private dashBoardController: DashboardController) {}
  ngOnInit() {
    this.getTotalCount();
    this.getSalesTodayCount();
    this.getTotalSales();
    this.getTotalSalesToday();
    this.getSalesPerItem();
  }
  getTotalCount() {
    this.dashBoardController.getAllStats().subscribe((count) => {
      this.totalSales = count;
      console.log(this.totalSales);
    });
  }
  getSalesTodayCount() {
    this.dashBoardController.getSalesToday().subscribe((sales) => {
      this.totalSalesToday = sales;
      console.log('Total sales today', this.totalSalesToday);
    });
  }
  getTotalSales() {
    this.dashBoardController
      .getTotalSales()
      .subscribe((sales: SaleInterface[]) => {
        this.allSales = sales;
        console.log('All sales:', this.allSales);
      });
  }
  getTotalSalesToday() {
    this.dashBoardController
      .getAllSalesToday()
      .subscribe((sales: SaleInterface[]) => {
        this.allSalesToday = sales;
      });
  }
  getSalesPerItem() {
    this.dashBoardController.getQuantityPerItem().subscribe((count) => {
      this.quantityPerItems = count;
    });
  }
  get paginatedAllSales() {
    const start = (this.currentPageAll - 1) * this.itemsPerPageAll;
    return this.allSales.slice(start, start + this.itemsPerPageAll);
  }

  get paginatedTodaySales() {
    const start = (this.currentPageToday - 1) * this.itemsPerPageToday;
    return this.allSalesToday.slice(start, start + this.itemsPerPageToday);
  }
}
