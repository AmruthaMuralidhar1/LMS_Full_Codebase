import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedIndentsComponent } from './fixed-indents.component';

describe('FixedIndentsComponent', () => {
  let component: FixedIndentsComponent;
  let fixture: ComponentFixture<FixedIndentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedIndentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedIndentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
