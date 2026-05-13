import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProductionFacade } from '../../../application/production-facade';
import { ProductionOverview } from '../../../domain/model/production-overview';
import { ProductionBatchCardComponent } from '../../components/production-batch-card/production-batch-card';
import {
  ProductionChartPoint,
  ProductionChartRangeOption,
  ProductionChartsComponent,
} from '../../components/production-charts/production-charts';
import { ProductionSummaryComponent, ProductionSummaryTile } from '../../components/production-summary/production-summary';

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    TranslatePipe,
    ProductionSummaryComponent,
    ProductionBatchCardComponent,
    ProductionChartsComponent,
  ],
  template: `
    <div class="production-page">
      <section class="production-hero">
        <div class="production-brand">
          <div>
            <h2>{{ 'option.production' | translate }}</h2>
            <p>{{ 'production.subtitle' | translate }}</p>
          </div>
        </div>

        <div class="production-actions">
          <button mat-flat-button color="primary" type="button" (click)="loadOverview()" [disabled]="loading()">
            <mat-icon>refresh</mat-icon>
            {{ 'production.update' | translate }}
          </button>

          <div class="production-chip">
            <mat-icon>event</mat-icon>
            <span>{{ overview()?.generatedAt ? formatDateTime(overview()!.generatedAt) : '—' }}</span>
          </div>

          <mat-form-field appearance="outline" class="shift-field">
            <mat-label>{{ 'production.shift' | translate }}</mat-label>
            <mat-select [value]="selectedShift()" (selectionChange)="onShiftChange($event.value)">
              <mat-option *ngFor="let option of shiftOptions" [value]="option.value">{{ option.label | translate }}</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </section>

      <ng-container *ngIf="loading()">
        <mat-card class="state-card state-card--loading">
          <mat-progress-spinner mode="indeterminate" diameter="42"></mat-progress-spinner>
          <div>
            <h3>{{ 'production.loading_title' | translate }}</h3>
            <p>{{ 'production.loading_content' | translate }}</p>
          </div>
        </mat-card>
      </ng-container>

      <ng-container *ngIf="error() as err">
        <mat-card class="state-card state-card--error">
          <mat-icon>error_outline</mat-icon>
          <div>
            <h3>{{ 'production.error_title' | translate }}</h3>
            <p>{{ err }}</p>
          </div>
          <button mat-stroked-button type="button" (click)="loadOverview()">{{ 'production.retry' | translate }}</button>
        </mat-card>
      </ng-container>

      <ng-container *ngIf="overview() as dashboard">
        <app-production-summary [tiles]="summaryTiles()"></app-production-summary>

        <section class="section-block">
          <div class="section-header">
            <h3>{{ 'production.ovens_in_operation' | translate }}</h3>
          </div>

           <div class="batch-stack">
             <app-production-batch-card *ngFor="let batch of dashboard.batches" [batch]="batch"></app-production-batch-card>
           </div>
        </section>

        <app-production-charts
          [selectedChartRange]="selectedChartRange()"
          [chartRangeOptions]="chartRangeOptions"
          [productProduction]="productProduction"
          [dailyProduction]="dailyProduction"
          (chartRangeChange)="onChartRangeChange($event)"
        ></app-production-charts>

        <section class="section-block">
          <mat-card class="summary-footer">
            <div>
              <p>{{ 'production.general_summary' | translate }}</p>
              <strong>{{ dashboard.totalLines }}</strong>
              <span>{{ 'production.ovens_total' | translate }}</span>
            </div>
            <div>
              <p>{{ 'production.running_label' | translate }}</p>
              <strong>{{ dashboard.runningLines }}</strong>
              <span>{{ 'production.active_label' | translate }}</span>
            </div>
            <div>
              <p>{{ 'production.warning_label' | translate }}</p>
              <strong>{{ dashboard.warningLines }}</strong>
              <span>{{ 'production.in_observation' | translate }}</span>
            </div>
            <div>
              <p>{{ 'production.stopped_label' | translate }}</p>
              <strong>{{ dashboard.stoppedLines }}</strong>
              <span>{{ 'production.inactives' | translate }}</span>
            </div>
          </mat-card>

          <div class="last-update">
            <span>{{ 'production.last_update' | translate }}: {{ formatDateTime(dashboard.generatedAt) }}</span>
            <mat-icon>autorenew</mat-icon>
          </div>
        </section>
      </ng-container>
    </div>
  `,
  styleUrl: './production.css',
})
export class Production {
  protected readonly overview = signal<ProductionOverview | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly selectedShift = signal('mañana');
  protected readonly selectedChartRange = signal('week');

  protected readonly shiftOptions: ProductionChartRangeOption[] = [
    { value: 'mañana', label: 'production.shift_morning' },
    { value: 'tarde', label: 'production.shift_afternoon' },
    { value: 'noche', label: 'production.shift_night' },
  ];

  protected readonly chartRangeOptions: ProductionChartRangeOption[] = [
    { value: 'week', label: 'production.this_week' },
    { value: '7-days', label: 'production.last_7_days' },
  ];

  protected readonly productProduction: ProductionChartPoint[] = [
    { label: 'production.product_french_bread', value: 850 },
    { label: 'production.product_croissant', value: 620 },
    { label: 'production.product_muffin', value: 480 },
    { label: 'production.product_loaf', value: 720 },
    { label: 'production.product_donut', value: 310 },
    { label: 'production.product_others', value: 190 },
  ];

  protected readonly dailyProduction: ProductionChartPoint[] = [
    { label: 'production.day_mon', value: 980 },
    { label: 'production.day_tue', value: 880 },
    { label: 'production.day_wed', value: 1100 },
    { label: 'production.day_thu', value: 950 },
    { label: 'production.day_fri', value: 1200 },
    { label: 'production.day_sat', value: 750 },
    { label: 'production.day_today', value: 1240 },
  ];

  protected readonly summaryTiles = computed<ProductionSummaryTile[]>(() => {
    const dashboard = this.overview();

    if (!dashboard) {
      return [];
    }

    return [
      {
        icon: 'kitchen',
        label: 'production.ovens_in_operation',
        value: `${dashboard.runningLines} de ${dashboard.totalLines}`,
        accent: 'success',
      },
      {
        icon: 'donut_large',
        label: 'production.average_efficiency',
        value: `${dashboard.averageEfficiency}%`,
        accent: 'success',
      },
      {
        icon: 'notifications_active',
        label: 'production.active_alerts',
        value: `${dashboard.activeAlerts}`,
        accent: 'warning',
      },
    ];
  });

  private readonly facade = new ProductionFacade();
  private readonly translate = inject(TranslateService);

  constructor() {
    void this.loadOverview();
  }

  async loadOverview(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await this.facade.getOverview();
      this.overview.set(data);
    } catch (exception) {
      this.error.set(exception instanceof Error ? exception.message : this.translate.instant('production.load_error'));
      this.overview.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  protected formatDateTime(value: string): string {
    return new Intl.DateTimeFormat(this.getLocale(), {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  }

  protected onShiftChange(value: string): void {
    this.selectedShift.set(value);
  }

  protected onChartRangeChange(value: string): void {
    this.selectedChartRange.set(value);
  }

  private getLocale(): string {
    const currentLang = this.translate.currentLang || this.translate.getBrowserLang() || 'es';
    return currentLang.toLowerCase().startsWith('en') ? 'en-US' : 'es-ES';
  }
}

