import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IndentServices } from "src/app/indents/indents.service";
import { IxSliderCustomEvent } from "@siemens/ix-angular";
import { ToastService } from "@siemens/ix-angular";

@Component({
  selector: "app-dispatch-bidding",
  templateUrl: "./dispatch-bidding.component.html",
  styleUrls: ["./dispatch-bidding.component.scss"],
})
export class DispatchBiddingComponent implements OnInit {
  indent: any;
  biddingPrice: number = 0;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private indentServices: IndentServices,
    private toastService: ToastService 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (history.state.indent) {
        this.indent = history.state.indent;
        this.biddingPrice = this.indent.bidStartAmount || 0;
      } else {
        this.errorMessage = "No indent data received";
      }
    });
  }

  onBiddingPriceChange(event: IxSliderCustomEvent<number>): void {
    this.biddingPrice = event.detail;
  }

  async onSubmitBidding(): Promise<void> {
    if (this.indent) {
      this.indentServices
        .saveBidding(
          this.indent.soId,
          this.indent.pickupLocation || "N/A",
          this.indent.dropLocation || "N/A",
          this.biddingPrice
        )
        .subscribe(
          async () => {
            this.showSuccessToast("Bid placed successfully!"); 
            this.router.navigate(["/indents"]);
          },
          (error) => {
            this.showErrorToast("Error saving indent: " + error.message); 
          }
        );
    } else {
      this.showErrorToast("No indent available to place a bid."); 
    }
  }

  showSuccessToast(message: string): void {
    this.toastService.show({
      message: message,
      type: 'success',
      autoClose: true,
      autoCloseDelay: 5000,
    });
  }

  showErrorToast(message: string): void {
    this.toastService.show({
      message: message,
      type: 'error',
      autoClose: true,
      autoCloseDelay: 5000,
    });
  }
}
