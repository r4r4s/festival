import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueMapComponent } from './venue-map';

describe('VenueMapComponent', () => {
  let component: VenueMapComponent;
  let fixture: ComponentFixture<VenueMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VenueMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });
});
