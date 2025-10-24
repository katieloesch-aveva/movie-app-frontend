import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFilmPageComponent } from './new-film-page.component';

describe('NewFilmPageComponent', () => {
  let component: NewFilmPageComponent;
  let fixture: ComponentFixture<NewFilmPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFilmPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewFilmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
