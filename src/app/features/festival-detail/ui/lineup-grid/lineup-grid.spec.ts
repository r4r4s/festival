import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineupGridComponent } from './lineup-grid';

describe('LineupGridComponent', () => {
  let component: LineupGridComponent;
  let fixture: ComponentFixture<LineupGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineupGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LineupGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });
});
