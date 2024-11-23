import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchBiddingComponent } from './dispatch-bidding.component';

describe('DispatchBiddingComponent', () => {
  let component: DispatchBiddingComponent;
  let fixture: ComponentFixture<DispatchBiddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatchBiddingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatchBiddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
