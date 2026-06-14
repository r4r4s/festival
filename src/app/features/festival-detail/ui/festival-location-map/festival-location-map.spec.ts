import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalLocationMapComponent } from './festival-location-map';

describe('FestivalLocationMapComponent', () => {
  let fixture: ComponentFixture<FestivalLocationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalLocationMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalLocationMapComponent);
    fixture.componentRef.setInput('slug', 'medusa');
    fixture.detectChanges();
  });

  it('renders the location map section', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="festival-location-map"]')).not.toBeNull();
  });

  it('renders an iframe with the festival coordinates', () => {
    const iframe = fixture.nativeElement.querySelector('iframe.festival-location-map__iframe');
    expect(iframe).not.toBeNull();
    expect(iframe.getAttribute('src')).toContain('google.com/maps/embed');
    expect(iframe.getAttribute('src')).toContain('Medusa%20Festival');
  });

  it('hides the section when the slug is unknown', () => {
    fixture.componentRef.setInput('slug', 'not-a-slug');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="festival-location-map"]')).toBeNull();
  });
});
