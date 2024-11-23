import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentDetailsComponent } from './indent-details.component';

describe('IndentDetailsComponent', () => {
  let component: IndentDetailsComponent;
  let fixture: ComponentFixture<IndentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
