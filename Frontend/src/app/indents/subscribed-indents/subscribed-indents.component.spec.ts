import { ComponentFixture, TestBed } from '@angular/core/testing'; 

import { SubscribedIndentsComponent } from './subscribed-indents.component'; 

describe('SubscribedIndentsComponent', () => { 
let component: SubscribedIndentsComponent; 
let fixture: ComponentFixture<SubscribedIndentsComponent>; 

beforeEach(async () => { 
 await TestBed.configureTestingModule({ 
  declarations: [ SubscribedIndentsComponent ] 
 }) 
 .compileComponents(); 

 fixture = TestBed.createComponent(SubscribedIndentsComponent); 
 component = fixture.componentInstance; 
 fixture.detectChanges(); 
}); 

it('should create', () => { 
 expect(component).toBeTruthy(); 
}); 
}); 