import { Injectable } from '@angular/core';
import { DashboardService } from '../services/dashboard-service';

@Injectable({
  providedIn: 'root',
})
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}
  getAllStats() {
    return this.dashboardService.getTotalItemsSold();
  }
  getSalesToday() {
    return this.dashboardService.getTotalItemsSoldToday();
  }
  getTotalSales() {
    return this.dashboardService.getTotalSales();
  }
  getAllSalesToday() {
    return this.dashboardService.getSalesToday();
  }
  getQuantityPerItem() {
    return this.dashboardService.getQuantityPerItem();
  }
}
