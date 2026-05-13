import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';

export interface ProductionChartRangeOption {
  value: string;
  label: string;
}

export interface ProductionChartPoint {
  label: string;
  value: number;
}

@Component({
  selector: 'app-production-charts',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatSelectModule, TranslatePipe],
  templateUrl: './production-charts.html',
  styleUrl: './production-charts.css',
})
export class ProductionChartsComponent {
  @Input() selectedChartRange = 'week';
  @Input() chartRangeOptions: ProductionChartRangeOption[] = [];
  @Input() productProduction: ProductionChartPoint[] = [];
  @Input() dailyProduction: ProductionChartPoint[] = [];

  @Output() chartRangeChange = new EventEmitter<string>();

  protected get selectedChartRangeLabel(): string {
    return this.chartRangeOptions.find((option) => option.value === this.selectedChartRange)?.label ?? '';
  }

  protected onChartRangeChange(value: string): void {
    this.chartRangeChange.emit(value);
  }

  protected barHeight(value: number, base = 900): number {
    return Math.max(18, Math.round((value / base) * 180));
  }

  protected buildLinePoints(series: Array<{ value: number }>, width = 340, height = 210): string {
    if (series.length === 0) {
      return '';
    }

    const values = series.map((entry) => entry.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const innerWidth = width - 48;
    const innerHeight = height - 48;

    return series
      .map((entry, index) => {
        const x = 24 + (series.length === 1 ? innerWidth / 2 : (index / (series.length - 1)) * innerWidth);
        const y = this.chartValueToY(entry.value, minValue, maxValue, innerHeight, 24);
        return `${x},${y}`;
      })
      .join(' ');
  }

  protected chartPointX(index: number, total: number, width = 340): number {
    const innerWidth = width - 48;
    return 24 + (total === 1 ? innerWidth / 2 : (index / (total - 1)) * innerWidth);
  }

  protected chartPointY(value: number, series: Array<{ value: number }>, height = 210): number {
    const values = series.map((entry) => entry.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    return this.chartValueToY(value, minValue, maxValue, height - 48, 24);
  }

  private chartValueToY(value: number, minValue: number, maxValue: number, innerHeight: number, offset = 24): number {
    const normalized = maxValue === minValue ? 0.5 : (value - minValue) / (maxValue - minValue);
    return offset + (1 - normalized) * innerHeight;
  }
}

