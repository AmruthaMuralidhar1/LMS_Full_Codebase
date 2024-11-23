import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchFixedComponent } from './dispatch-fixed.component';

describe('DispatchFixedComponent', () => {
  let component: DispatchFixedComponent;
  let fixture: ComponentFixture<DispatchFixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatchFixedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatchFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
