import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalLocationMapComponent } from './festival-location-map';

describe('FestivalLocationMapComponent', () => {
  let fixture: ComponentFixture<FestivalLocationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalLocationMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalLocationMapComponent);
    fixture.detectChanges();
  });

  it('renders the location map section', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="festival-location-map"]')).not.toBeNull();
  });

  it('renders the embedded iframe', () => {
    expect(fixture.nativeElement.querySelector('iframe')).not.toBeNull();
  });
});
