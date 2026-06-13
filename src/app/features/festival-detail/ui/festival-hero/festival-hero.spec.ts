import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FestivalHeroComponent } from './festival-hero';

describe('FestivalHeroComponent', () => {
  let component: FestivalHeroComponent;
  let fixture: ComponentFixture<FestivalHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalHeroComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });
});
