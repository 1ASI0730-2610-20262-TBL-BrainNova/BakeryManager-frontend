import { ProductionBatch } from './production-batch';
import { ProductionLine } from './production-line';

export interface ProductionOverview {
  generatedAt: string;
  totalLines: number;
  runningLines: number;
  warningLines: number;
  stoppedLines: number;
  averageEfficiency: number;
  activeAlerts: number;
  batches: ProductionBatch[];
  lines: ProductionLine[];
}

