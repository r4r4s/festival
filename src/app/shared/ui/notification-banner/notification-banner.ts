import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NotificationService } from '@core/notifications/notification.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'fv-notification-banner',
  imports: [TranslatePipe],
  templateUrl: './notification-banner.html',
  styleUrl: './notification-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationBannerComponent {
  protected readonly notifications = inject(NotificationService);
}
