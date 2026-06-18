import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { InventoryService } from '../../../infrastructure/inventory.services';
import { InventoryItem } from '../../../domain/model/inventory-item';

import { InventoryItemForm } from '../../components/inventory-item-form/inventory-item-form';
import { InventoryItemList } from '../../components/inventory-item-list/inventory-item-list';

@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    InventoryItemForm,
    InventoryItemList,
  ],
  templateUrl: './inventory-management.html',
  styleUrl: './inventory-management.css',
})
export class InventoryManagement implements OnInit {
  inventoryItems: InventoryItem[] = [];
  isFormVisible = false;

  private inventoryService = inject(InventoryService);
  private translate = inject(TranslateService);
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.translate.onLangChange.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getAllItems().subscribe({
      next: (items) => {
        this.inventoryItems = [...items];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando el inventario:', err),
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  getLowStockCount(): number {
    return this.inventoryItems.filter((item) => item.quantity <= item.minStock).length;
  }

  addItem(item: any): void {
    if (!item) return;

    const itemToSend = {
      name: item.name,
      description: item.description,
      quantity: Number(item.quantity),
      unit: item.unit,
      minStock: Number(item.minStock),
      price: Number(item.price ?? 0),
    };

    this.inventoryService.createItem(itemToSend as any).subscribe({
      next: (response) => {
        this.loadInventory();
        this.isFormVisible = false;

        this.snackBar.open('Nuevo insumo añadido', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar'],
        });
      },
      error: (err) => {
        console.error('Error detallado:', err);
      },
    });
  }
}
