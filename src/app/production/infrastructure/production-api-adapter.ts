import { ProductionBatch } from '../domain/model/production-batch';
import { ProductionOverview } from '../domain/model/production-overview';
import { PRODUCTION_BATCHES, PRODUCTION_LINES } from './mocks/production-mock-data';

/**
 * Simple adapter that returns mock data. In a real app this would call HTTP endpoints.
 */
export class ProductionApiAdapter {
  async fetchOverview(): Promise<ProductionOverview> {
    await this.simulateLatency();

    const batches = PRODUCTION_BATCHES.map((batch) => ({ ...batch }));
    const lines = PRODUCTION_LINES.map((line) => ({ ...line }));
    const runningLines = batches.filter((batch) => batch.status === 'running').length;
    const warningLines = batches.filter((batch) => batch.status === 'warning').length;
    const stoppedLines = batches.filter((batch) => batch.status === 'stopped').length;
    const activeAlerts = warningLines;
    const averageEfficiency = this.calculateAverageEfficiency(batches);

    return {
      generatedAt: new Date().toISOString(),
      totalLines: lines.length,
      runningLines,
      warningLines,
      stoppedLines,
      averageEfficiency,
      activeAlerts,
      batches,
      lines,
    };
  }

  async startBatch(batch: Partial<ProductionBatch>): Promise<ProductionBatch> {
    const newBatch: ProductionBatch = {
      id: `batch-${Date.now()}`,
      name: batch.name || 'production.batch_new',
      productId: batch.productId || 'prod-unknown',
      quantity: batch.quantity || 0,
      startedAt: new Date().toISOString(),
      status: 'running',
      temperature: batch.temperature || 0,
      temperatureSetpoint: batch.temperatureSetpoint,
      humidity: batch.humidity,
      humiditySetpoint: batch.humiditySetpoint,
      currentElectricFlow: batch.currentElectricFlow,
    };

    PRODUCTION_BATCHES.unshift(newBatch);
    return newBatch;
  }

  async stopBatch(id: string): Promise<void> {
    const idx = PRODUCTION_BATCHES.findIndex((b) => b.id === id);
    if (idx >= 0) {
      PRODUCTION_BATCHES[idx].status = 'stopped';
      PRODUCTION_BATCHES[idx].currentElectricFlow = 0;
      PRODUCTION_BATCHES[idx].humidity = 0;
    }

    const line = PRODUCTION_LINES.find((entry) => entry.currentBatch === id);
    if (line) {
      line.status = 'maintenance';
      line.currentBatch = undefined;
    }
  }

  private async simulateLatency(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 120));
  }

  private calculateAverageEfficiency(batches: ProductionBatch[]): number {
    const activeBatches = batches.filter((batch) => batch.status !== 'stopped');

    if (activeBatches.length === 0) {
      return 0;
    }

    const score = activeBatches.reduce((total, batch) => total + this.calculateBatchEfficiency(batch), 0);

    return Math.round(score / activeBatches.length);
  }

  private calculateBatchEfficiency(batch: ProductionBatch): number {
    const temperatureSetpoint = batch.temperatureSetpoint ?? batch.temperature ?? 0;
    const humiditySetpoint = batch.humiditySetpoint ?? batch.humidity ?? 0;
    const electricTarget = batch.currentElectricFlow ? batch.currentElectricFlow + 0.8 : 12;

    const temperatureGap = temperatureSetpoint > 0 ? Math.abs(batch.temperature - temperatureSetpoint) / temperatureSetpoint : 0;
    const humidityGap = humiditySetpoint > 0 && batch.humidity !== undefined ? Math.abs(batch.humidity - humiditySetpoint) / humiditySetpoint : 0;
    const electricGap = batch.currentElectricFlow !== undefined ? Math.abs(batch.currentElectricFlow - electricTarget) / electricTarget : 0;

    const rawScore = 100 - (temperatureGap * 55 + humidityGap * 20 + electricGap * 25);

    if (batch.status === 'warning') {
      return Math.max(70, Math.round(rawScore - 8));
    }

    return Math.max(0, Math.min(100, Math.round(rawScore)));
  }
}

