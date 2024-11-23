import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-indent-details',
  templateUrl: './indent-details.component.html',
  styleUrls: ['./indent-details.component.scss']
})
export class IndentDetailsComponent implements OnInit {

  @Input() pickupLocation: string = 'N/A';
  @Input() dropLocation: string = 'N/A';
  @Input() tags: string[] = ['N/A'];
  @Input() quantity: number | string = 'N/A';
  @Input() distance: number | string = 'N/A';
  @Input() loadingDateTime: string = 'N/A';
  @Input() unloadingDateTime: string = 'N/A';
  @Input() bidStartAmount: number | string = 'N/A';
  @Input() bidCloseAmount: number | string = 'N/A';
  @Input() isBidding: boolean = false; 
  @Input() totalAmount: number | string = 'N/A';
  @Input() amountPerKm: number | string = 'N/A';
  
  additionalItems: { label: string, value: string }[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.isBidding) {
      this.additionalItems = [
        { label: 'Quantity', value: `${this.quantity === 'N/A' ? 'N/A' : this.quantity + ' tonnes'}` },
        { label: 'Distance', value: `${this.distance === 'N/A' ? 'N/A' : this.distance + ' km'}` },
        { label: 'Loading Date & Time', value: `${this.loadingDateTime}` },
        { label: 'Unloading Date & Time', value: `${this.unloadingDateTime}` },
        { label: 'Bid Start Amount', value: `₹${this.formatAmount(this.bidStartAmount)}` },
        { label: 'Bid Close Amount', value: `₹${this.formatAmount(this.bidCloseAmount)}` }
      ];
    } else {
      const formattedAmountPerKm = this.formatAmount(this.amountPerKm);
      this.additionalItems = [
        { label: 'Quantity', value: `${this.quantity === 'N/A' ? 'N/A' : this.quantity + ' tonnes'}` },
        { label: 'Distance', value: `${this.distance === 'N/A' ? 'N/A' : this.distance + ' km'}` },
        { label: 'Loading Date & Time', value: `${this.loadingDateTime}` },
        { label: 'Unloading Date & Time', value: `${this.unloadingDateTime}` },
        { 
          label: 'Quoted Amount', 
          value: `₹${this.totalAmount === 'N/A' ? 'N/A' : this.totalAmount}  ₹${formattedAmountPerKm}/km` 
        }
      ];
    }
  }

  private formatAmount(amount: number | string): string {
    if (typeof amount === 'number') {
      return amount.toFixed(2);
    }
    if (!isNaN(parseFloat(amount as string))) {
      return parseFloat(amount as string).toFixed(2);
    }
    return 'N/A';
  }
}
