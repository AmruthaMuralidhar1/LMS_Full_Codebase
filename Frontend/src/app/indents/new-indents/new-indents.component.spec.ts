import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIndentsComponent } from './new-indents.component';

describe('NewIndentsComponent', () => {
  let component: NewIndentsComponent;
  let fixture: ComponentFixture<NewIndentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewIndentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewIndentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
