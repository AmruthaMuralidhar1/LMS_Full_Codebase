import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { IndentsComponent } from "./indents/indents.component";
import { DispatchFixedComponent } from "./indents/new-indents/fixed-indents/dispatch-fixed/dispatch-fixed.component";
import { DispatchBiddingComponent } from "./indents/new-indents/bidding-indents/dispatch-bidding/dispatch-bidding.component";
import { TrucksComponent } from "./trucks/trucks.component";
import { DriversComponent } from "./drivers/drivers.component";
import { TripsComponent } from "./trips/trips.component";
import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: DashboardComponent },
  { path:  "dashboard", component: DashboardComponent },
  { path: "indents", component: IndentsComponent },
  { path: "indents/dispatch-fixed/:soId", component: DispatchFixedComponent },
  { path: "indents/dispatch-bidding/:soId",component: DispatchBiddingComponent,},
  { path: "trucks", component: TrucksComponent },
  { path: "drivers", component: DriversComponent },
  { path: "trips", component: TripsComponent },
  { path: "maintenance", component: MaintenanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
