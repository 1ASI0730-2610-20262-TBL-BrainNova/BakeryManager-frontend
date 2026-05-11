import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { InventoryItem } from '../../../domain/model/inventory-item';

/**
 * InventoryItemForm is a standalone Angular component designed to manage
 * the creation of inventory items using a reactive form. It provides an
 * interface to input item details and emits the created item upon form submission.
 *
 * Component Features:
 * - Contains a reactive form with fields for item details like name, description,
 *   quantity, unit, and minimum stock.
 * - Provides a dropdown for unit selection with predefined options.
 * - Emits an event when a valid form is submitted.
 * - Resets the form after each successful submission with default values.
 *
 * Outputs:
 * - `itemAdded`: An event emitted when a new inventory item is successfully
 *   created. The emitted value omits the 'id' field since it is assumed to
 *   be assigned elsewhere.
 *
 * Constructor:
 * - Accepts an instance of FormBuilder to initialize the form group and fields
 *   with validation rules.
 *
 * Methods:
 * - `onSubmit`: Triggered when the form is submitted. Validates form input,
 *   emits the created inventory item, and resets the form to its default state.
 */
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
  ],
  templateUrl: './inventory-item-form.html',
  styleUrl: './inventory-item-form.css',
})

export class InventoryItemForm {
  @Output() itemAdded = new EventEmitter<Omit<InventoryItem, 'id'>>();

  inventoryForm: FormGroup;
  unitOptions = ['kg', 'litres', 'unidades', 'gramos'];

  /**
   * Constructs an instance of the class and initializes the inventory form.
   *
   * @param {FormBuilder} fb - An instance of FormBuilder used to create and manage the reactive form for inventory details.
   * @return {void} This constructor does not return a value.
   */
  constructor(private fb: FormBuilder) {
    this.inventoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unit: ['kg', Validators.required],
      minStock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  /**
   * Handles the submission of the inventory form. If the form is valid, extracts the form values,
   * creates a new inventory item, emits the new item, and resets the form to its default state.
   * @return {void} This method does not return a value.
   */
  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const formValue = this.inventoryForm.value;

      const newItem: Omit<InventoryItem, 'id'> = {
        ...formValue,
        lastUpdated: new Date(),
      };

      this.itemAdded.emit(newItem);
      this.inventoryForm.reset({ unit: 'kg', quantity: 0, minStock: 0 });
    }
  }
}
