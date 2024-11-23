import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { menuItems } from "src/app/shared/common.constant";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  menuItems = menuItems;
  activeItem: string = "";
  firstItemHighlighted: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveItem(event.urlAfterRedirects);
        this.firstItemHighlighted = event.urlAfterRedirects === '/' || event.urlAfterRedirects.startsWith('/dashboard');
      }
    });
  }

  setActiveItem(route: string): void {
    if (route === '/' || route.startsWith('/dashboard')) {
      this.activeItem = '/dashboard';
    } else if (route.startsWith('/indents')) {
      this.activeItem = '/indents';
    } else if (route.startsWith('/trips')) {
      this.activeItem = '/trips';
    } else if (route.startsWith('/maintenance')) {
      this.activeItem = '/maintenance';
    } else if (route.startsWith('/drivers')) {
      this.activeItem = '/drivers';
    } else if (route.startsWith('/trucks')) {
      this.activeItem = '/trucks';
    } else {
      this.activeItem = route;
    }
  }
}
