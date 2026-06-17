import { Component, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductionBatch } from '../../../domain/model/production-batch.entity';
import { BatchStatus } from '../../../domain/model/batch-status.value-object';
import { ProductionStore } from '../../../application/production.store';

/**
 * Presentation component rendering a single production batch with its progress
 * and contextual lifecycle actions (US-83 start, US-85 complete, US-86 cancel,
 * US-87 progress, US-88/US-89 listing/detail).
 */
@Component({
  selector: 'app-batch-card',
  imports: [TranslatePipe],
  templateUrl: './batch-card.html',
  styleUrl: './batch-card.css',
})
export class BatchCard {
  /** The batch to render. */
  readonly batch = input.required<ProductionBatch>();

  protected readonly BatchStatus = BatchStatus;
  private readonly store = inject(ProductionStore);

  /** Returns the i18n key for the current status badge. */
  protected statusKey(): string {
    switch (this.batch().status) {
      case BatchStatus.PLANNED: return 'production.status.planned';
      case BatchStatus.IN_PROGRESS: return 'production.status.in-progress';
      case BatchStatus.COMPLETED: return 'production.status.completed';
      default: return 'production.status.cancelled';
    }
  }

  /** Returns the CSS modifier for the current status. */
  protected statusClass(): string {
    switch (this.batch().status) {
      case BatchStatus.PLANNED: return 'planned';
      case BatchStatus.IN_PROGRESS: return 'progress';
      case BatchStatus.COMPLETED: return 'completed';
      default: return 'cancelled';
    }
  }

  protected onStart(): void { this.store.startBatch(this.batch().id); }
  protected onComplete(): void { this.store.completeBatch(this.batch().id); }
  protected onCancel(): void { this.store.cancelBatch(this.batch().id); }
}
