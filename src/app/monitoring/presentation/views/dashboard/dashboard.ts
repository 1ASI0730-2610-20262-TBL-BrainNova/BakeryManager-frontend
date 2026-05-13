import { Component } from '@angular/core';
import { TopSummary } from '../../components/top-summary/top-summary';
import { SensorGrid } from '../../components/sensor-grid/sensor-grid';

@Component({
  selector: 'app-dashboard',
  imports: [TopSummary, SensorGrid],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
