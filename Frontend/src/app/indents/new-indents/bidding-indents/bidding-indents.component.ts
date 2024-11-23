import {
  Component,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { interval, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { ToastService } from "@siemens/ix-angular";
import {
  getCurrentTimeInSeconds,
  parseTimeDuration,
  secondsToHHMM,
} from "src/app/shared/common.methods";
@Component({
  selector: "app-bidding",
  templateUrl: "./bidding-indents.component.html",
  styleUrls: ["./bidding-indents.component.scss"],
})
export class BiddingIndentsComponent implements OnInit, OnDestroy {
  indents: any[] = [];
  timer: any[] = [];
  manufacturers: string[] = [];
  selectedManufacturer: string = "Select All";
  fetchError = true;
  displayedData: any[] = [];
  filteredData: any[] = [];
  warehouseUrl = "http://localhost:9090/api/indents/whNames";
  warehouseNames: string[] = [];
  apiUrl = "http://localhost:9090/api/indents/biddingIndents";
  private timerSubscription: Subscription = new Subscription();
  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  @ViewChild("customToast", { read: TemplateRef })
  customToastRef!: TemplateRef<any>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getIndents();
    this.getWarehouseName();
  }

  // getIndents(): void {
  //   this.http.get<any[]>(this.apiUrl).subscribe(
  //     (data) => {
  //       this.timer = data.map((indent) => {
  //         const bidDurationInSeconds = this.parseTimeDuration(indent.bidDuration);
  //         const startTimeInSeconds = this.getCurrentTimeInSeconds();
  //         return {
  //           ...indent,
  //           bidDurationInSeconds,
  //           startTimeInSeconds,
  //           remainingTime: this.formatTime(bidDurationInSeconds),
  //         };
  //       });
  //       this.fetchError = false;
  //       this.indents = data;
  //       this.displayedData = data;
  //       this.filteredData = data;
  //       this.totalItems = data.length;
  //       this.updatePagination();
  //       this.startTimers();
  //     },
  //     (error) => {
  //       console.error("Error fetching data", error);
  //       this.handleError();
  //     }
  //   );
  // }
  getIndents(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.indents = data.map((indent) => {
          const bidDurationInSeconds = parseTimeDuration(indent.bidDuration);
          const startTimeInSeconds = getCurrentTimeInSeconds();
          return {
            ...indent,
            bidDurationInSeconds,
            startTimeInSeconds,
            remainingTime: secondsToHHMM(bidDurationInSeconds),
          };
        });
        this.fetchError = false;
        // this.indents = data;
        this.displayedData = data;
        this.filteredData = data;
        this.totalItems = data.length;
        this.updatePagination();
        this.startTimers();
      },
      (error) => {
        console.error("Error fetching data", error);
        this.handleError();
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
        this.toastService.show({
          message: "Error fetching data",
        });
      }
    );
  }

  onManufacturerChange(event: any) {
    this.selectedManufacturer = event.detail;
    this.filteredData = this.indents;
    if (
      this.selectedManufacturer &&
      this.selectedManufacturer !== "" &&
      this.selectedManufacturer !== "Select All"
    ) {
      this.filteredData = this.filteredData.filter(
        (item) => item.manufacturerName === this.selectedManufacturer
      );
    }
    this.totalItems = this.filteredData.length;
    this.currentPage = 0;
    this.updatePagination();
  }

  startTimers(): void {
    this.timerSubscription = interval(60000).subscribe(() => {
      const currentTimeInSeconds = getCurrentTimeInSeconds();
      this.filteredData = this.filteredData.map((indent) => {
        const elapsedSeconds = currentTimeInSeconds - indent.startTimeInSeconds;
        const remainingSeconds = Math.max(
          indent.bidDurationInSeconds - elapsedSeconds,
          0
        );
        return {
          ...indent,
          remainingTime: secondsToHHMM(remainingSeconds),
        };
      });
      this.updatePagination();
    });
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

  showToastMessage(message: string): void {
    this.toastService.show({
      message: message,
      type: "info",
      autoClose: true,
      autoCloseDelay: 5000,
    });
  }

  handleError(): void {
    this.showToastMessage("Something went wrong");
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  onRouteButtonClick(indent: any): void {
    this.router.navigate(["/indents/dispatch-bidding", indent.soId], {
      state: { indent: indent },
    });
  }
}
