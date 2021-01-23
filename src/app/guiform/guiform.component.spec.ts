import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiformComponent } from './guiform.component';

describe('GuiformComponent', () => {
  let component: GuiformComponent;
  let fixture: ComponentFixture<GuiformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuiformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
