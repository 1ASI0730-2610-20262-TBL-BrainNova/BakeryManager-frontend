import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

export interface ProductionSummaryTile {
  icon: string;
  label: string;
  value: string;
  accent: 'success' | 'warning';
}

@Component({
  selector: 'app-production-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, TranslatePipe],
  templateUrl: './production-summary.html',
  styleUrl: './production-summary.css',
})
export class ProductionSummaryComponent {
  @Input({ required: true }) tiles: ProductionSummaryTile[] = [];
}

