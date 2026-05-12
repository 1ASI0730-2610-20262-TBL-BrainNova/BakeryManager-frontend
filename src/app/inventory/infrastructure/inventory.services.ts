import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../domain/model/inventory-item';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  /**
   * Mantengo tu MockAPI por si necesitas pruebas en la nube,
   * pero la principal ahora apunta a tu json-server local (db.json).
   * Generalmente json-server corre en el puerto 3000.
   */
  private readonly MOCK_API_URL = 'https://6a01e5cc36fb6ad04de1f2b1.mockapi.io/api/v1/inventory';
  private readonly LOCAL_API_URL = 'http://localhost:3000/inventory';

  // Usaremos esta variable para switchar rápido si algo falla
  private readonly API_URL = this.LOCAL_API_URL;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los insumos desde el endpoint configurado.
   */
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.API_URL);
  }

  /**
   * Crea un nuevo insumo en el endpoint configurado.
   * @param item
   */
  createItem(item: Omit<InventoryItem, 'id'>): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.API_URL, item);
  }
}
