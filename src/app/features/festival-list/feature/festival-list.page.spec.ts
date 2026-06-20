import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FestivalListPageComponent } from './festival-list.page';

describe('FestivalListPageComponent', () => {
  let fixture: ComponentFixture<FestivalListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalListPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalListPageComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
