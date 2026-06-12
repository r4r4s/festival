import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { FestivalCalendarComponent } from './festival-calendar';

describe('FestivalCalendarComponent', () => {
  let fixture: ComponentFixture<FestivalCalendarComponent>;
  let component: FestivalCalendarComponent;

  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [FestivalCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the timeline title and four festival cards', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(
      root.querySelector('[data-testid="festival-calendar-title"]')?.textContent?.trim(),
    ).toBeTruthy();
    expect(root.querySelectorAll('[data-testid="festival-calendar-card"]')).toHaveLength(5);
  });

  it('renders three month labels, the gradient rail and the full day scale', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelectorAll('.festival-calendar__month')).toHaveLength(3);
    expect(root.querySelector('.festival-calendar__rail')).not.toBeNull();
    expect(root.querySelectorAll('.festival-calendar__day').length).toBeGreaterThan(60);
  });

  it('marks the first festival as the initially active card', () => {
    expect(component.activeIndex()).toBe(0);
    expect(component.isActive(0)).toBe(true);
    expect(component.isActive(1)).toBe(false);
  });

  it('switches the active festival when focusFestival() is called', () => {
    const third = component.festivals[2];
    component.focusFestival(third);

    expect(component.activeIndex()).toBe(2);
    expect(component.isActive(2)).toBe(true);
    expect(component.isActive(0)).toBe(false);
  });

  it('cycles the active card automatically every 3 seconds', () => {
    expect(component.activeIndex()).toBe(0);

    // El autoplay se registra en `afterNextRender` y avanza cada 3 s.
    vi.advanceTimersByTime(3000);
    expect(component.activeIndex()).toBe(1);

    vi.advanceTimersByTime(3000);
    expect(component.activeIndex()).toBe(2);

    // Tras llegar al último festival (índice 4), vuelve al primero (wraparound).
    vi.advanceTimersByTime(3000);
    vi.advanceTimersByTime(3000);
    vi.advanceTimersByTime(3000);
    expect(component.activeIndex()).toBe(0);
  });

  it('restarts the autoplay timer when focusFestival() is called', () => {
    // Avanzamos casi un ciclo pero NO llegamos a 3000ms
    vi.advanceTimersByTime(2000);
    expect(component.activeIndex()).toBe(0);

    // El usuario enfoca el tercer festival → reinicia el timer
    component.focusFestival(component.festivals[2]);
    expect(component.activeIndex()).toBe(2);

    // Los 2000 ms acumulados se descartan; necesitamos 3000 ms más
    vi.advanceTimersByTime(2000);
    expect(component.activeIndex()).toBe(2);

    vi.advanceTimersByTime(1000);
    expect(component.activeIndex()).toBe(3);
  });

  it('returns null for non-featured days and the festival for featured ones', () => {
    expect(component.festivalForDay('june', '16')).toBeNull();
    expect(component.festivalForDay('june', '20')).not.toBeNull();
    expect(component.festivalForDay('august', '8')?.slug).toBe('medusa');
  });
});
