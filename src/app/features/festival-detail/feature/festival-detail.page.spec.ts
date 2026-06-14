import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { FestivalDetailPageComponent } from './festival-detail.page';
import { FestivalHeroComponent } from '../ui/festival-hero/festival-hero';

describe('FestivalDetailPageComponent', () => {
  let component: FestivalDetailPageComponent;
  let fixture: ComponentFixture<FestivalDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalDetailPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders the page section', () => {
    const section = fixture.nativeElement.querySelector('[data-testid="festival-detail-page"]');
    expect(section).not.toBeNull();
  });

  it('passes review stats into the hero', () => {
    const hero = fixture.debugElement.query(By.directive(FestivalHeroComponent));
    expect(hero).toBeTruthy();
    const stats = (hero.componentInstance as FestivalHeroComponent).stats();
    expect(stats.totalCount).toBeGreaterThanOrEqual(0);
    expect(stats.averageRating).toBeGreaterThanOrEqual(0);
  });
});
