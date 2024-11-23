import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IndentServices } from "src/app/indents/indents.service";
import { ModalService, ToastService, ToastConfig } from "@siemens/ix-angular";

@Component({
  selector: "app-dispatch-fixed",
  templateUrl: "./dispatch-fixed.component.html",
  styleUrls: ["./dispatch-fixed.component.scss"],
})
export class DispatchFixedComponent implements OnInit {
  indent: any = {
    soId: "undefined",
    pickupLocation: "undefined",
    dropLocation: "undefined",
    tags: ["undefined"],
    quantity: "undefined",
    distance: "undefined",
    loadingDateTime: "undefined",
    unloadingDateTime: "undefined",
    totalAmount: "undefined",
    amountPerKm: "undefined",
    dispatchDetails: "undefined",
  };
  soId: string | null = null;

  @ViewChild("confirmModal", { read: TemplateRef })
  confirmModalRef!: TemplateRef<any>;
  @ViewChild("successModal", { read: TemplateRef })
  successModalRef!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private indentServices: IndentServices,
    private modalService: ModalService,
    private toastService: ToastService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.indent = navigation.extras.state["indent"];
    }
  }

  ngOnInit(): void {
    this.soId = this.route.snapshot.paramMap.get("soId");

    if (this.indent.soId === "undefined") {
      this.fetchIndentDetails();
    }
  }

  fetchIndentDetails(): void {
    if (this.soId) {
      this.indentServices.fetchIndentDetails(this.soId).subscribe(
        (data: any) => {
          this.indent = data;
        },
        (error) => {
          console.error("Error fetching indent details:", error);
          this.showToastMessage("Something went wrong");
        }
      );
    } else {
      this.showToastMessage("No soId available to fetch indent details");
    }
  }

  async onScheduleTrip(): Promise<void> {
    const confirmInstance = await this.modalService.open({
      content: this.confirmModalRef,
    });

    confirmInstance.onClose.on(async (response) => {
      if (response === "confirm") {
        if (this.indent) {
          this.indentServices
            .saveIndent(
              this.indent.soId,
              this.indent.pickupLocation || "N/A",
              this.indent.dropLocation || "N/A"
            )
            .subscribe(
              async () => {
                const successInstance = await this.modalService.open({
                  content: this.successModalRef,
                });

                successInstance.onClose.on(() => {
                  this.router.navigate(["/indents"]);
                });
              },
              (error) => {
                console.error("Error saving indent:", error);
                this.showToastMessage("Something went wrong");
              }
            );
        } else {
          this.showToastMessage("No indent data available to schedule the trip.");
        }
      }
    });
  }

  showToastMessage(message: string): void {
    this.toastService.show({
      message: message,
      type: 'error',  
      autoClose: true,
      autoCloseDelay: 5000,
    });
  }
}
