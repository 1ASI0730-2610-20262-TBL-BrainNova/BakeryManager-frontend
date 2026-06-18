import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductionStore } from '../../../application/production.store';
import { ProductionSummary } from '../../components/production-summary/production-summary';
import { BatchCard } from '../../components/batch-card/batch-card';
import { BatchForm } from '../../components/batch-form/batch-form';

@Component({
  selector: 'app-production',
  imports: [ProductionSummary, BatchCard, BatchForm, TranslatePipe],
  templateUrl: './production.html',
  styleUrl: './production.css',
})
export class Production {
  private readonly store = inject(ProductionStore);

  protected batches = this.store.batches;
  protected loading = this.store.loadingSignal;
  protected error = this.store.error;
  protected showForm = signal(false);

  protected openForm(): void { this.showForm.set(true); }
  protected closeForm(): void { this.showForm.set(false); }
}
