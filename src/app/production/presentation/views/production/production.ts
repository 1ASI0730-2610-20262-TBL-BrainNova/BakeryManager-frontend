import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductionStore } from '../../../application/production.store';
import { ProductionSummary } from '../../components/production-summary/production-summary';
import { BatchCard } from '../../components/batch-card/batch-card';

/**
 * Production dashboard view: summary cards + batch list (US-88, US-93).
 */
@Component({
  selector: 'app-production',
  imports: [ProductionSummary, BatchCard, TranslatePipe],
  templateUrl: './production.html',
  styleUrl: './production.css',
})
export class Production {
  private readonly store = inject(ProductionStore);

  protected batches = this.store.batches;
  protected loading = this.store.loadingSignal;
  protected error = this.store.error;
}
