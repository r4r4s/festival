import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { HomeFestivalMapComponent } from './home-festival-map';

describe('HomeFestivalMapComponent', () => {
  let component: HomeFestivalMapComponent;
  let fixture: ComponentFixture<HomeFestivalMapComponent>;

  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [HomeFestivalMapComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFestivalMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders one pin per home-map festival', () => {
    const root = fixture.nativeElement as HTMLElement;
    const pins = root.querySelectorAll('[data-testid="home-festival-map-pin"]');

    expect(pins).toHaveLength(component.festivals.length);
  });

  it('shows Medusa as the default active festival', () => {
    expect(component.activeFestival().key).toBe('medusa');
  });

  it('updates the active panel on pin hover', () => {
    const root = fixture.nativeElement as HTMLElement;
    const pins = root.querySelectorAll('[data-testid="home-festival-map-pin"]');

    pins[0]?.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(component.activeFestival().key).toBe('bigsound');
  });

  it('marks the clicked pin as pressed', () => {
    const root = fixture.nativeElement as HTMLElement;
    const pins = root.querySelectorAll('[data-testid="home-festival-map-pin"]');

    pins[4]?.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(pins[4]?.getAttribute('aria-pressed')).toBe('true');
    expect(component.activeFestival().key).toBe('rbf');
  });

  it('keeps the details visible after clicking a pin and leaving the map', () => {
    const root = fixture.nativeElement as HTMLElement;
    const pins = root.querySelectorAll('[data-testid="home-festival-map-pin"]');
    const pane = root.querySelector('.pane') as HTMLElement | null;

    pins[4]?.dispatchEvent(new Event('click'));
    pane?.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    expect(component.isPanelVisible()).toBe(true);
    expect(component.activeFestival().key).toBe('rbf');
  });

  it('cycles the active pin every 3 seconds in array order', () => {
    expect(component.activeFestival().key).toBe('medusa');
    const medusaIdx = component.festivals.findIndex((f) => f.key === 'medusa');

    vi.advanceTimersByTime(3000);
    expect(component.activeIndex()).toBe((medusaIdx + 1) % component.festivals.length);

    vi.advanceTimersByTime(3000);
    expect(component.activeIndex()).toBe((medusaIdx + 2) % component.festivals.length);
  });

  it('restarts the autoplay timer when the user hovers a pin', () => {
    vi.advanceTimersByTime(2000);
    expect(component.activeFestival().key).toBe('medusa');

    component.previewFestival('bigsound');
    expect(component.activeFestival().key).toBe('bigsound');

    // Los 2000 ms acumulados se descartan; el siguiente tick necesita 3000 ms más.
    vi.advanceTimersByTime(2000);
    expect(component.activeFestival().key).toBe('bigsound');

    vi.advanceTimersByTime(1000);
    expect(component.activeFestival().key).toBe('reve');
  });
});
