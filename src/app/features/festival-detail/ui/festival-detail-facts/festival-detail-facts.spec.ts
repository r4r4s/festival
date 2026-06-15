import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { FestivalDetailFactsComponent } from './festival-detail-facts';

describe('FestivalDetailFactsComponent', () => {
  let fixture: ComponentFixture<FestivalDetailFactsComponent>;

  beforeEach(async () => {
    registerLocaleData(localeEs);

    await TestBed.configureTestingModule({
      imports: [FestivalDetailFactsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalDetailFactsComponent);
  });

  it('does not render when there are no facts', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="festival-detail-facts"]')).toBeNull();
  });

  it('renders the five fact cards when facts are provided', () => {
    fixture.componentRef.setInput('facts', {
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
    });
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('.festival-detail-facts__card');
    expect(cards).toHaveLength(5);
    expect(fixture.nativeElement.textContent).toContain('Cullera, Valencia');
    expect(fixture.nativeElement.textContent).toContain('77');
  });
});
