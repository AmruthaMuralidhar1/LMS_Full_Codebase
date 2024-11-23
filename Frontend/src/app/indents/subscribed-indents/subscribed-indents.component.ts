import { Component, OnInit } from "@angular/core";
import { Indents } from "../indents.interface";
import { ToastService } from "@siemens/ix-angular";
import { HttpClient } from "@angular/common/http";

const today = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const lastSevenDays = new Date(
  new Date().getTime() - 7 * 24 * 60 * 60 * 1000
).toLocaleDateString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

interface DateDropdownOption {
  id: string;
  label: string;
  from: string;
  to: string;
}

@Component({
  selector: "app-subscribed-indents",
  templateUrl: "./subscribed-indents.component.html",
  styleUrls: ["./subscribed-indents.component.scss"],
})

export class SubscribedIndentsComponent implements OnInit {
  indents: Indents[] = [];
  displayedData: Indents[] = [];
  warehouseNames: string[] = [];
  filteredData: Indents[] = [];
  apiUrl = "http://localhost:9090/api/indents/subIndents";
  warehouseUrl = "http://localhost:9090/api/indents/whNames";
  selectedManufacturer: string = "Select All";
  selectedStatus: string = "Select All";
  enableButton = false;
  selectedDateRange!: { from: string; to: string };
  currentPage = 0;
  itemsPerPage = 10;
  totalItems = 0;
  fetchError = false ; 

  dateDropdownOptions: DateDropdownOption[] = [
    {
      id: 'last-7',
      label: 'Last 7 days',
      from: lastSevenDays,
      to: today,
    },
    {
      id: 'today',
      label: 'Today',
      from: today,
      to: today,
    },
    {
      id: 'clear',
      label: 'Clear',
      from: "",
      to: "",
    }
  ];

  constructor(private http: HttpClient, private toastService: ToastService) {}

  ngOnInit(): void {
    this.getIndents();
    this.getWarehouseName();
  }
  getIndents(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.indents = data;
        this.displayedData = data;
        this.filteredData = data;
        this.totalItems = data.length;
        this.updatePagination();
      },
      (error) => {
        this.fetchError = true ; 
        this.toastService.show({
          message: "Error fetching data",
        });
      }
    );
  }
  getWarehouseName(): void {
    this.http.get<string[]>(this.warehouseUrl).subscribe(
      (data) => {
        this.warehouseNames = data;
        console.log(this.warehouseNames);
      },
      (error) => {
        console.error("Error fetching data", error);
      }
    );
  }
  onManufacturerChange(event: any) {
    this.selectedManufacturer = event.detail;
    this.enableButton = true;
  }
  onStatusChange(event: any) {
    this.selectedStatus = event.detail;
    this.enableButton = true;
  }
  onDateRangeChange(event: any) {
    if (event.id === 'clear') {
      this.selectedDateRange = { from: "" , to: ""};
    }
    else{
      this.selectedDateRange = event.detail;
    }
    this.enableButton = true;
  }
  applyFilter() {
    this.filteredData = this.indents;
    if (
      this.selectedManufacturer &&
      this.selectedManufacturer !== "" &&
      this.selectedManufacturer !== "Select All"
    ) {
      this.filteredData = this.filteredData.filter(
        (item) => item.warehouseName === this.selectedManufacturer
      );
    }
    if (
      this.selectedStatus &&
      this.selectedStatus !== "" &&
      this.selectedStatus !== "Select All"
    ) {
      this.filteredData = this.filteredData.filter(
        (item) => item.approval === this.selectedStatus
      );
    }
    if (
      this.selectedDateRange &&
      this.selectedDateRange.from &&
      this.selectedDateRange.to
    ) {
      this.filteredData = this.filteredData.filter((item) => {
        const itemDate = new Date(item.unloadingDateTime);
        const fromDate = new Date(this.selectedDateRange.from);
        const toDate = new Date(this.selectedDateRange.to);
        return itemDate >= fromDate && itemDate <= toDate;
      });
    }
    this.totalItems = this.filteredData.length;
    this.currentPage = 0;
    this.updatePagination();
    this.enableButton = false;
  }
  updatePagination(): void {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedData = this.filteredData.slice(start, end);
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
}