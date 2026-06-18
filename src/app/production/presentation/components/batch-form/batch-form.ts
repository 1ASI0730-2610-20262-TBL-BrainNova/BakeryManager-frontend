import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductionStore } from '../../../application/production.store';

@Component({
  selector: 'app-batch-form',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './batch-form.html',
  styleUrl: './batch-form.css',
})
export class BatchForm {
  @Output() closed = new EventEmitter<void>();

  private readonly store = inject(ProductionStore);
  private readonly fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    batchCode: ['', [Validators.required]],
    productName: ['', [Validators.required]],
    plannedQuantity: [1, [Validators.required, Validators.min(1)]],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    const { batchCode, productName, plannedQuantity } = this.form.value;
    this.store.createBatch({
      batchCode,
      productName,
      plannedQuantity: Number(plannedQuantity),
      branchId: 1,
      equipmentId: 1,
    });
    this.form.reset({ plannedQuantity: 1 });
    this.closed.emit();
  }

  onCancel(): void {
    this.closed.emit();
  }
}
