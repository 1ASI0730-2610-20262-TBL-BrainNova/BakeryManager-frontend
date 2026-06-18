import { Component, Output, EventEmitter, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InventoryItem } from '../../../domain/model/inventory-item';

@Component({
  selector: 'app-inventory-item-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './inventory-item-form.html',
  styleUrl: './inventory-item-form.css',
})
export class InventoryItemForm {
  @Output() itemAdded = new EventEmitter<Omit<InventoryItem, 'id'>>();

  inventoryForm: FormGroup;
  unitOptions = ['kg', 'litros', 'unidades', 'gramos'];

  private translate = inject(TranslateService);
  private cdr = inject(ChangeDetectorRef);

  constructor(private fb: FormBuilder) {
    this.inventoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unit: ['kg', Validators.required],
      minStock: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
    this.translate.onLangChange.subscribe(() => {
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const newItem: Omit<InventoryItem, 'id'> = {
        ...this.inventoryForm.value,
        lastUpdated: new Date(),
      };
      this.itemAdded.emit(newItem);
      this.inventoryForm.reset({ unit: 'kg', quantity: 0, minStock: 0, price: 0 });
    }
  }
}
