export interface ProductionLine {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  currentBatch?: string; // batch id
}


