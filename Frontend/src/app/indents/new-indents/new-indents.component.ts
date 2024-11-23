import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-indents",
  templateUrl: "./new-indents.component.html",
  styleUrls: ["./new-indents.component.scss"],
})
export class NewIndentsComponent implements OnInit {
  indents: any[] = []; // Original list of indents
  filteredIndents: any[] = []; // Filtered list of indents
  paginatedIndents: any[] = []; // Indents to display on the current page
  manufacturers: string[] = []; // List of manufacturers (warehouse names)
  selectedManufacturer: string = "";
  apiUrl = "http://localhost:9090/api/indents/newIndents";
  isDropdownOpen: boolean = false; // Track the state of the dropdown

  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  currentPageTab: string = "fixed price";

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // this.getIndents();
  }

  setPage(page: string): void {
    this.currentPageTab = page;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectManufacturer(manufacturer: string): void {
    this.selectedManufacturer = manufacturer;
    this.filterIndents(manufacturer);
    this.isDropdownOpen = false; // Close the dropdown after selection
  }

  getIndents(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.indents = data;
        this.filteredIndents = data; // Initialize filteredIndents with all data
        this.totalItems = data.length;
        this.updatePagination();

        // Extract unique warehouse names (manufacturers)
        this.manufacturers = Array.from(
          new Set(data.map((indent) => indent.warehouseName))
        );
      },
      (error) => {
        console.error("Error fetching data", error);
      }
    );
  }
  // currentPage = "fixed price";

  filterIndents(manufacturer: string): void {
    if (manufacturer) {
      this.filteredIndents = this.indents.filter(
        (indent) => indent.warehouseName === manufacturer
      );
    } else {
      this.filteredIndents = [...this.indents]; // Reset to all indents if no manufacturer is selected
    }
    this.totalItems = this.filteredIndents.length;
    this.itemsPerPage = this.filteredIndents.length;
    this.currentPage = 0;
    this.updatePagination();
  }

  updatePagination(): void {
    const start = this.currentPage * this.itemsPerPage;
    const end = Math.min(start + this.itemsPerPage, this.totalItems);
    this.paginatedIndents = this.filteredIndents.slice(start, end);
  }

  onPageChange(page: number): void {
    // Ensure page is within valid range
    if (page >= 0 && page < Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage = page;
      this.updatePagination();
    } else {
      console.error("Invalid page number:", page);
    }
  }

  onItemCountChange(count: number): void {
    this.itemsPerPage = count;
    this.currentPage = 0;
    this.updatePagination();
  }
  onRouteButtonClick(indent: any): void {
    this.router.navigate(["/indents/dispatch-fixed", indent.soId], {
      state: { indent: indent },
    });
  }
}
