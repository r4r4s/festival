import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { signal } from '@angular/core';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { FestivalDetailPageComponent } from './festival-detail.page';
import { FestivalDetailFactsService } from '../data-access/festival-detail-facts.service';
import { FestivalHeroComponent } from '../ui/festival-hero/festival-hero';
import { FestivalDetailFactsComponent } from '../ui/festival-detail-facts/festival-detail-facts';

describe('FestivalDetailPageComponent', () => {
  let component: FestivalDetailPageComponent;
  let fixture: ComponentFixture<FestivalDetailPageComponent>;

  beforeEach(async () => {
    registerLocaleData(localeEs);

    await TestBed.configureTestingModule({
      imports: [FestivalDetailPageComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { slug: 'medusa' },
            },
          },
        },
        {
          provide: FestivalDetailFactsService,
          useValue: {
            facts: () =>
              signal({
                slug: 'medusa',
                checkedAt: '2026-06-14',
                location: {
                  city: 'Cullera',
                  province: 'Valencia',
                  country: 'España',
                },
                genre: {
                  primary: 'Electrónica',
                  tags: ['Techno', 'House', 'EDM'],
                },
                ticket: {
                  fromPrice: 77,
                  feeIncluded: true,
                  officialUrl: 'https://www.medusasunbeach.com/guia-compra',
                },
                age: {
                  minimumAccess: 16,
                  authorizationRequiredFrom: 16,
                  authorizationRequiredTo: 17,
                  adultsOnlyAreas: ['River Town Resort'],
                },
                schedule: {
                  published: false,
                  opensAt: null,
                  closesAt: null,
                  noteUrl: 'https://www.medusasunbeach.com/faqs',
                },
              }),
          },
        },
      ],
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

  it('renders the festival facts strip below the hero', () => {
    const facts = fixture.debugElement.query(By.directive(FestivalDetailFactsComponent));
    expect(facts).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="festival-detail-facts"]')).not.toBeNull();
  });
});
