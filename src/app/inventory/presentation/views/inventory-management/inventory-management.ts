import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryItemForm } from '../../components/inventory-item-form/inventory-item-form';
import { InventoryItemList } from '../../components/inventory-item-list/inventory-item-list';
import { InventoryItem } from '../../../domain/model/inventory-item';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InventoryService } from '../../../infrastructure/inventory.services';

@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [
    CommonModule,
    InventoryItemForm,
    InventoryItemList,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './inventory-management.html',
  styleUrl: './inventory-management.css',
})
export class InventoryManagement implements OnInit {
  inventoryItems: InventoryItem[] = [];
  isFormVisible = false;

  constructor(private inventoryService: InventoryService) {}

  /**
   * When the component starts, we retrieve the data from the cloud.
   */
  ngOnInit(): void {
    this.loadInventory();
  }

  /**
   * Call the service to get the list of supplies.
   */
  loadInventory(): void {
    this.inventoryService.getAllItems().subscribe({
      next: (items) => {
        this.inventoryItems = items;
        console.log('Inventario cargado:', items);
      },
      error: (err) => console.error('Error cargando el inventario:', err),
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  addItem(item: any): void {
    console.log('1. Datos recibidos del formulario:', item);

    // Si el item llega vacío o undefined, aquí saltará el error
    if (!item) {
      console.error('¡Papi, el formulario mandó un objeto vacío!');
      return;
    }

    const itemToSend = {
      name: item.name,
      description: item.description,
      quantity: Number(item.quantity),
      unit: item.unit,
      minStock: Number(item.minStock),
    };

    console.log('2. Intentando enviar a MockAPI:', itemToSend);

    this.inventoryService.createItem(itemToSend as any).subscribe({
      next: (response) => {
        console.log('3. ¡Éxito en la nube!:', response);
        this.loadInventory();
        this.isFormVisible = false;
      },
      error: (err) => {
        console.error('4. Error detallado que bloquea el envío:', err);
        alert('Error: no sé puede subir a la nube');
      },
    });

  }
}
