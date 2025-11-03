import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnWatchedComponent } from './btn-watched.component';

describe('BtnWatchedComponent', () => {
  let component: BtnWatchedComponent;
  let fixture: ComponentFixture<BtnWatchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnWatchedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnWatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
