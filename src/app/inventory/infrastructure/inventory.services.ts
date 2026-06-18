import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../domain/model/inventory-item';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private http = inject(HttpClient);

  private readonly url = `${environment.bakeryManagerProviderApiBaseUrl}${environment.inventoryProviderItemsEndpointPath}`;

  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.url);
  }

  createItem(item: Omit<InventoryItem, 'id'>): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.url, item);
  }
}
