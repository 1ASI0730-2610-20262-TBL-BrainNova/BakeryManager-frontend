import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProductionBatch } from '../../../domain/model/production-batch';

@Component({
  selector: 'app-production-batch-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, TranslatePipe],
  templateUrl: './production-batch-card.html',
  styleUrl: './production-batch-card.css',
})
export class ProductionBatchCardComponent {
  @Input({ required: true }) batch!: ProductionBatch;

  private readonly translate = inject(TranslateService);

  protected getBatchStatusTone(): 'success' | 'warning' | 'neutral' {
    if (this.batch.status === 'warning') {
      return 'warning';
    }

    if (this.batch.status === 'stopped') {
      return 'neutral';
    }

    return 'success';
  }

  protected getBatchStatusLabel(): string {
    switch (this.batch.status) {
      case 'running':
        return 'production.running';
      case 'warning':
        return 'production.warning';
      case 'stopped':
        return 'production.stopped';
      default:
        return 'production.pending';
    }
  }

  protected getStatusIcon(): string {
    switch (this.batch.status) {
      case 'running':
        return 'check_circle';
      case 'warning':
        return 'warning_amber';
      case 'stopped':
        return 'pause_circle';
      default:
        return 'schedule';
    }
  }

  protected formatTime(value?: string): string {
    if (!value) {
      return this.translate.instant('production.pending');
    }

    return new Intl.DateTimeFormat(this.getLocale(), {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  }

  protected formatRemainingTime(): string {
    if (this.batch.status === 'stopped') {
      return this.translate.instant('production.stopped');
    }

    const remainingMinutes = Math.max(10, Math.round(this.batch.quantity / 6) + (this.batch.status === 'warning' ? 18 : 10));
    return `${this.formatDuration(remainingMinutes)} ${this.translate.instant('production.remaining')}`;
  }

  protected isTemperatureAlert(): boolean {
    return this.batch.temperatureSetpoint !== undefined && this.batch.temperature > this.batch.temperatureSetpoint;
  }

  protected isHumidityAlert(): boolean {
    return this.batch.humiditySetpoint !== undefined && this.batch.humidity !== undefined && this.batch.humidity > this.batch.humiditySetpoint;
  }

  protected isElectricAlert(): boolean {
    return this.batch.currentElectricFlow !== undefined && this.batch.currentElectricFlow > 12.0;
  }

  private formatDuration(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, '0');
    const minutes = (totalMinutes % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private getLocale(): string {
    const currentLang = this.translate.currentLang || this.translate.getBrowserLang() || 'es';
    return currentLang.toLowerCase().startsWith('en') ? 'en-US' : 'es-ES';
  }
}

