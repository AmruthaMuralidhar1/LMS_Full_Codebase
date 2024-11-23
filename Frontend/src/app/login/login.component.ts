import { Component, OnInit } from "@angular/core";
import { loginData } from "src/assets/mock-data/login-mock-data";
import { LoginData } from "./login.interface";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  data: LoginData = {
    username: "",
    password: "",
  };
  error: string = "";
  wasValidated = false;

  constructor(private router: Router, private loginService: LoginService) {}
  ngOnInit(): void {}

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.wasValidated = true;
    const foundUser = loginData.users.find(
      (user) => user.username === this.data.username
    );
    if (foundUser && this.data.password) {
      if (foundUser.password === this.data.password) {
        this.loginService.loginSuccess();
      } else {
        this.error = "Wrong password !";
      }
    } else if (this.data.username && this.data.password) {
      this.error = "Username not found !";
    }
  }
}