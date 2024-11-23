import { Component } from "@angular/core";
import { LoginService } from "./login/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "fleet-management";
  constructor(public loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.loginService.wasValidated$.subscribe((isUserValid) => {
      if (isUserValid) {
        this.router.navigate(["/dashboard"]);
      }
    });
  }
}