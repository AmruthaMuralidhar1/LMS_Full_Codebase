import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { IxModule } from "@siemens/ix-angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { HeaderComponent } from "./layout/header/header.component";
import { IndentsComponent } from "./indents/indents.component";
import { SubscribedIndentsComponent } from "./indents/subscribed-indents/subscribed-indents.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { DriversComponent } from "./drivers/drivers.component";
import { TrucksComponent } from "./trucks/trucks.component";
import { TripsComponent } from "./trips/trips.component";
import { CommonModule } from "@angular/common";
import { NewIndentsComponent } from "./indents/new-indents/new-indents.component";
import { FormsModule } from "@angular/forms";
import { IndentDetailsComponent } from "./indents/indent-details/indent-details.component";
import { DispatchFixedComponent } from "./indents/new-indents/fixed-indents/dispatch-fixed/dispatch-fixed.component";
import { DispatchBiddingComponent } from "./indents/new-indents/bidding-indents/dispatch-bidding/dispatch-bidding.component";
import { MapComponent } from "./map/map.component";
import { FixedIndentsComponent } from "./indents/new-indents/fixed-indents/fixed-indents.component";
import { BiddingIndentsComponent } from "./indents/new-indents/bidding-indents/bidding-indents.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    IndentsComponent,
    SubscribedIndentsComponent,
    DashboardComponent,
    MaintenanceComponent,
    DriversComponent,
    TrucksComponent,
    TripsComponent,
    NewIndentsComponent,
    IndentDetailsComponent,
    DispatchFixedComponent,
    DispatchBiddingComponent,
    MapComponent,
    FixedIndentsComponent,
    BiddingIndentsComponent,
    PaginationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    IxModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
