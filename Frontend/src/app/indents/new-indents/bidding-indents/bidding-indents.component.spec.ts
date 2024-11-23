import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingIndentsComponent } from './bidding-indents.component';

describe('BiddingIndentsComponent', () => {
  let component: BiddingIndentsComponent;
  let fixture: ComponentFixture<BiddingIndentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddingIndentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiddingIndentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
