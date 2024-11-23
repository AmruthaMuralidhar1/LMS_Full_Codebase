import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from 'src/app/shared/services/common.services';
import { ToastService } from "@siemens/ix-angular";
import { filterByWarehouse, paginateData } from "src/app/shared/common.methods";

@Component({
  selector: "app-fixed-indents",
  templateUrl: "./fixed-indents.component.html",
  styleUrls: ["./fixed-indents.component.scss"],
})
export class FixedIndentsComponent implements OnInit {
  indents: any[] = [];
  filteredData: any[] = [];
  displayedData: any[] = [];
  selectedManufacturer: string = "Select All";
  
  apiUrl = "http://localhost:9090/api/indents/newIndents";
  warehouseUrl = "http://localhost:9090/api/indents/whNames";
  warehouseNames: string[] = [];
  fetchError = true;
  isDropdownOpen: boolean = false;
  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  currentPageTab: string = "fixed price";

  constructor(
    private commonService: CommonService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getIndents();
    this.getWarehouseName();
  }

  setPage(page: string): void {
    this.currentPageTab = page;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getIndents(): void {
    this.commonService.getData(this.apiUrl).subscribe(
      (data: any[]) => {
        this.fetchError = false;
        this.indents = data;
        this.filteredData = data;
        this.totalItems = data.length;
        this.updatePagination();
      },
      (error: any) => {
        console.error("Error fetching data", error);
        this.toastService.show({
          message: "Error fetching data",
          type: 'error'
        });
      }
    );
  }

  getWarehouseName(): void {
    this.commonService.getData(this.warehouseUrl).subscribe(
      (data: string[]) => {
        this.warehouseNames = data;
      },
      (error: any) => {
        console.error("Error fetching data", error);
        this.toastService.show({
          message: "Error fetching warehouse names",
          type: 'error'
        });
      }
    );
  }

  onManufacturerChange(event: any): void {
    this.selectedManufacturer = event.detail;
    this.filteredData =filterByWarehouse(this.indents, this.selectedManufacturer);
    this.totalItems = this.filteredData.length;
    this.currentPage = 0;
    this.updatePagination();
  }

  updatePagination(): void {
    this.displayedData = paginateData(this.filteredData, this.currentPage, this.itemsPerPage);
  }

  onPageChange(page: any): void {
    if (!isNaN(page)) {
      this.currentPage = page;
      this.updatePagination();
    } else {
      console.error("Invalid page number:", page);
    }
  }

  onItemCountChange(count: any): void {
    if (!isNaN(count)) {
      this.itemsPerPage = count;
      this.updatePagination();
    } else {
      console.error("Invalid item count:", count);
    }
  }

  onRouteButtonClick(indent: any): void {
    this.router.navigate(["/indents/dispatch-fixed", indent.soId], {
      state: { indent: indent },
    });
  }
}