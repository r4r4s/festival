import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fv-lineup-grid',
  templateUrl: './lineup-grid.html',
  styleUrl: './lineup-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineupGridComponent {}
