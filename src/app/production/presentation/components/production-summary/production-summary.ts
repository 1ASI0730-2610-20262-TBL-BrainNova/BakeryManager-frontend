import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductionStore } from '../../../application/production.store';

/**
 * Presentation component showing the production dashboard summary cards
 * (US-93 dashboard, US-92 efficiency).
 */
@Component({
  selector: 'app-production-summary',
  imports: [MatCard, MatCardContent, TranslatePipe],
  templateUrl: './production-summary.html',
  styleUrl: './production-summary.css',
})
export class ProductionSummary {
  private readonly store = inject(ProductionStore);

  protected activeBatches = this.store.activeBatchesCount;
  protected inProgress = this.store.inProgressCount;
  protected completed = this.store.completedCount;
  protected efficiency = this.store.efficiency;
}
