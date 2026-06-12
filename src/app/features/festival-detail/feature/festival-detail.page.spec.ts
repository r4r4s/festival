import {
  ComponentFixture,
  DeferBlockBehavior,
  TestBed,
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FestivalDetailPageComponent } from './festival-detail.page';

describe('FestivalDetailPageComponent', () => {
  let component: FestivalDetailPageComponent;
  let fixture: ComponentFixture<FestivalDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalDetailPageComponent],
      deferBlockBehavior: DeferBlockBehavior.Manual,
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders the page section', () => {
    const section = fixture.nativeElement.querySelector('[data-testid="festival-detail-page"]');
    expect(section).not.toBeNull();
  });
});
