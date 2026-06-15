import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavProgressBarComponent } from './nav-progress-bar';

describe('NavProgressBarComponent', () => {
  let fixture: ComponentFixture<NavProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavProgressBarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavProgressBarComponent);
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders no bar when state is hidden', () => {
    const bar = fixture.nativeElement.querySelector('.nav-progress-bar');
    expect(bar).toBeNull();
  });
});
