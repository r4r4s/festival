import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalCalendarComponent } from './festival-calendar';

describe('FestivalCalendarComponent', () => {
  let fixture: ComponentFixture<FestivalCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalCalendarComponent);
    fixture.detectChanges();
  });

  it('renders the timeline festivals by default', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(
      root.querySelector('[data-testid="festival-calendar-title"]')?.textContent?.trim(),
    ).toBeTruthy();
    expect(root.querySelectorAll('[data-testid="festival-calendar-card"]')).toHaveLength(4);
    expect(root.querySelector('.festival-calendar__filter')).toBeNull();
    expect(root.querySelector('[data-testid="festival-calendar-stats"]')).toBeNull();
  });

  it('renders the month scale without filter controls', () => {
    const root = fixture.nativeElement as HTMLElement;
    const months = root.querySelectorAll('.festival-calendar__month');
    const days = root.querySelectorAll('.festival-calendar__day');

    expect(months).toHaveLength(3);
    expect(days.length).toBeGreaterThan(20);
  });
});
