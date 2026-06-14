import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalPosterGalleryComponent } from './festival-poster-gallery';

describe('FestivalPosterGalleryComponent', () => {
  let fixture: ComponentFixture<FestivalPosterGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalPosterGalleryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalPosterGalleryComponent);
    fixture.componentRef.setInput('slug', 'medusa');
    fixture.detectChanges();
  });

  it('renders the poster gallery section', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="festival-poster-gallery"]')).not.toBeNull();
  });

  it('renders the looping carousel with both groups of posters', () => {
    expect(fixture.nativeElement.querySelectorAll('.festival-poster-gallery__group')).toHaveLength(2);
    expect(fixture.nativeElement.querySelectorAll('.festival-poster-gallery__image')).toHaveLength(10);
    expect(fixture.nativeElement.querySelectorAll('.festival-poster-gallery__item')).toHaveLength(10);
  });

  it('pauses and resumes the track state', () => {
    fixture.componentInstance.pause();
    fixture.detectChanges();
    expect(fixture.componentInstance.isPaused()).toBe(true);

    fixture.componentInstance.resume();
    fixture.detectChanges();
    expect(fixture.componentInstance.isPaused()).toBe(false);
  });

  it('opens and closes the poster dialog from the close button', () => {
    const trigger = fixture.nativeElement.querySelector('.festival-poster-gallery__trigger');
    trigger.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-testid="festival-poster-gallery-dialog"]')).not.toBeNull();

    fixture.nativeElement
      .querySelector('[data-testid="festival-poster-gallery-dialog-close"]')
      .click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-testid="festival-poster-gallery-dialog"]')).toBeNull();
  });

  it('closes the poster dialog when clicking the backdrop', () => {
    fixture.nativeElement.querySelector('.festival-poster-gallery__trigger').click();
    fixture.detectChanges();

    fixture.nativeElement
      .querySelector('[data-testid="festival-poster-gallery-dialog-backdrop"]')
      .click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-testid="festival-poster-gallery-dialog"]')).toBeNull();
  });

  it('hides the gallery when the festival has no posters', () => {
    fixture.componentRef.setInput('slug', 'rbf');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="festival-poster-gallery"]')).toBeNull();
  });
});
