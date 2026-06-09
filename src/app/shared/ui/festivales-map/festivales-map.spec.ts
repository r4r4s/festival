import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { FestivalesMapComponent } from './festivales-map';
import { MapLoaderService } from '@shared/data-access/map-loader.service';
import { FESTIVAL_LOCATIONS } from '@shared/data-access/festival-locations';

// MapLibre needs WebGL, unavailable in jsdom. The loader stub keeps the map in
// its error state so the spec can focus on the SSR-safe sidebar markup.
const mapLoaderStub: Pick<MapLoaderService, 'load'> = {
  load: () => Promise.reject(new Error('maplibre unavailable in test')),
};

describe('FestivalesMapComponent', () => {
  let fixture: ComponentFixture<FestivalesMapComponent>;
  let component: FestivalesMapComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalesMapComponent],
      providers: [{ provide: MapLoaderService, useValue: mapLoaderStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('lists every seed festival in the sidebar', () => {
    const root = fixture.nativeElement as HTMLElement;
    const items = root.querySelectorAll('[data-testid="sidebar-festival-btn"]');

    expect(items).toHaveLength(FESTIVAL_LOCATIONS.length);
    expect(FESTIVAL_LOCATIONS).toHaveLength(7);
  });

  it('includes both Latin Fest editions as distinct entries', () => {
    const keys = component.festivals.map((festival) => festival.key);

    expect(keys).toContain('latinValencia');
    expect(keys).toContain('latinBenidorm');
  });

  it('orders by upcoming start date by default', () => {
    const dates = component.filteredFestivals().map((festival) => festival.startDate);
    const sorted = [...dates].sort((a, b) => a.localeCompare(b));

    expect(dates).toEqual(sorted);
  });

  it('re-sorts the sidebar alphabetically by name', () => {
    component.setSortOrder({ target: { value: 'name' } } as unknown as Event);
    fixture.detectChanges();

    expect(component.sortOrder()).toBe('name');
    expect(component.filteredFestivals()).toHaveLength(FESTIVAL_LOCATIONS.length);
  });

  it('toggles the selected festival on repeated clicks', () => {
    component.selectFestival('rbf');
    expect(component.isSelected('rbf')).toBe(true);

    component.selectFestival('rbf');
    expect(component.isSelected('rbf')).toBe(false);
  });
});
