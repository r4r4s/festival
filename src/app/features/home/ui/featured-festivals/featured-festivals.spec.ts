import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedFestivalsComponent } from './featured-festivals';

describe('FeaturedFestivalsComponent', () => {
  let component: FeaturedFestivalsComponent;
  let fixture: ComponentFixture<FeaturedFestivalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedFestivalsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedFestivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders one card per canonical festival', () => {
    const root = fixture.nativeElement as HTMLElement;
    const canonicalGroup = root.querySelector('.featured-festivals__group:not([aria-hidden])');
    const names = canonicalGroup?.querySelectorAll('[data-testid="featured-festivals-card-name"]');

    expect(names).toHaveLength(component.festivals.length);
  });
});
