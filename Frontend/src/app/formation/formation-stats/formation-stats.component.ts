import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../services/formation.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
@Component({
  selector: 'app-formation-stats',
  templateUrl: './formation-stats.component.html',
  styleUrls: ['./formation-stats.component.css']
})
export class FormationStatsComponent implements OnInit {
  // Chart configurations
  categoryData!: ChartConfiguration<'doughnut'>['data'];
  ratingData!: ChartConfiguration<'line'>['data'];
  chartOptions: ChartOptions = { responsive: true };

  // Price stats
  averagePrice: number = 0;
  maxPrice: number = 0;
  minPrice: number = 0;

  constructor(private formationService: FormationService) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.formationService.getAllFormations().subscribe({
      next: (formations) => {
        this.calculateCategoryDistribution(formations);
        this.calculatePriceStats(formations);
        this.calculateRatingTrends(formations);
      },
      error: (err) => console.error('Error loading stats:', err)
    });
  }

  private calculateCategoryDistribution(formations: any[]): void {
    const categories = formations.reduce((acc, formation) => {
      acc[formation.categorie] = (acc[formation.categorie] || 0) + 1;
      return acc;
    }, {});

    this.categoryData = {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }]
    };
  }

  private calculatePriceStats(formations: any[]): void {
    const prices = formations.map(f => f.prix);
    this.averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    this.maxPrice = Math.max(...prices);
    this.minPrice = Math.min(...prices);
  }

  private calculateRatingTrends(formations: any[]): void {
    // Group by month-year and calculate average rating
    const monthlyData = formations.reduce((acc, formation) => {
      const monthYear = this.getMonthYear(formation.dateDebut);
      if (!acc[monthYear]) {
        acc[monthYear] = { sum: 0, count: 0 };
      }
      acc[monthYear].sum += formation.rating;
      acc[monthYear].count++;
      return acc;
    }, {});

    const labels = Object.keys(monthlyData);
    const data = labels.map(label => 
      monthlyData[label].sum / monthlyData[label].count
    );

    this.ratingData = {
      labels,
      datasets: [{
        label: 'Average Rating',
        data,
        borderColor: '#4BC0C0',
        tension: 0.4
      }]
    };
  }

  private getMonthYear(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}-${date.getFullYear()}`;
  }
}