import { Component } from "@angular/core";

@Component({
  selector: "app-indents",
  templateUrl: "./indents.component.html",
  styleUrls: ["./indents.component.scss"],
})
export class IndentsComponent {
  selectedTab: number = 0;
  selectTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }
}