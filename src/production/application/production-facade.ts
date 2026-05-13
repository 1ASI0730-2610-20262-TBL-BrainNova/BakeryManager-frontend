import { ProductionBatch } from '../domain/model/production-batch';
import { ProductionOverview } from '../domain/model/production-overview';
import { ProductionApiAdapter } from '../infrastructure/production-api-adapter';

const adapter = new ProductionApiAdapter();

export class ProductionFacade {
  async getOverview(): Promise<ProductionOverview> {
    return adapter.fetchOverview();
  }

  async startBatch(payload: Partial<ProductionBatch>): Promise<ProductionBatch> {
    return adapter.startBatch(payload);
  }

  async stopBatch(id: string): Promise<void> {
    return adapter.stopBatch(id);
  }
}

