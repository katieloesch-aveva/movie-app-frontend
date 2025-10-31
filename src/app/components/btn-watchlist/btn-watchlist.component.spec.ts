import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnWatchlistComponent } from './btn-watchlist.component';

describe('BtnWatchlistComponent', () => {
  let component: BtnWatchlistComponent;
  let fixture: ComponentFixture<BtnWatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnWatchlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
