import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  LucideClock3,
  LucideIdCard,
  LucideMapPin,
  LucideMusic4,
  LucideTicket,
} from '@lucide/angular';

import type { FestivalDetailFacts } from '../../data-access/festival-detail-facts.model';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'fv-festival-detail-facts',
  imports: [
    CurrencyPipe,
    LucideClock3,
    LucideIdCard,
    LucideMapPin,
    LucideMusic4,
    LucideTicket,
    TranslatePipe,
  ],
  templateUrl: './festival-detail-facts.html',
  styleUrl: './festival-detail-facts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalDetailFactsComponent {
  readonly facts = input<FestivalDetailFacts | null>(null);

  protected readonly locationPrimary = computed(() => {
    const facts = this.facts();
    return facts ? `${facts.location.city}, ${facts.location.province}` : '';
  });

  protected readonly genreSecondary = computed(() => {
    const facts = this.facts();
    return facts ? facts.genre.tags.join(', ') : '';
  });

  protected readonly hasAuthorizationNote = computed(() => {
    const facts = this.facts();
    return Boolean(
      facts?.age.authorizationRequiredFrom !== null &&
      facts?.age.authorizationRequiredTo !== null,
    );
  });

  protected readonly adultAreasLabel = computed(() => {
    const facts = this.facts();
    return facts ? facts.age.adultsOnlyAreas.join(', ') : '';
  });
}
