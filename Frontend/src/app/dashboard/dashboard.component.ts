import { Component, OnInit } from '@angular/core';
import { DateDropdownOption } from '@siemens/ix';
import { dateDropdownOptions, metrics, charts, manufacturers, vehicles } from './dashboard.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  selectedManufacturer: string = '';
  dateDropdownOptions: DateDropdownOption[] = dateDropdownOptions;
  metrics = metrics;
  charts = charts;
  manufacturers = manufacturers;
  vehicles = vehicles;

  customSearch: string = '';
  display: string = 'none';

  constructor() {}

  ngOnInit(): void {
    this.updateDisplay();
  }

  clearInput(): void {
    this.customSearch = '';
    this.updateDisplay();
  }

  onInputChange(): void {
    this.updateDisplay();
  }

  private updateDisplay(): void {
    this.display = this.customSearch ? 'block' : 'none';
  }
}