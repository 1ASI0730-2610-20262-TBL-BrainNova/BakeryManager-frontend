export interface ProductionBatch {
  id: string;
  name: string;
  productId: string;
  quantity: number;
  startedAt?: string; // ISO date
  status: 'running' | 'stopped' | 'warning' | 'pending';
  temperature: number; // current temperature
  temperatureSetpoint?: number;
  humidity?: number;
  humiditySetpoint?: number;
  currentElectricFlow?: number;
}

