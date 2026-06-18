import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideActivity,
  LucideAlertCircle,
  LucideArrowDownRight,
  LucideArrowUpRight,
  LucideBell,
  LucideCalendarDays,
  LucideChevronDown,
  LucideCircleDollarSign,
  LucideCloud,
  LucideDatabase,
  LucideDownload,
  LucideDynamicIcon,
  LucideFilter,
  LucidePackage,
  LucideRefreshCw,
  LucideSearch,
  LucideShoppingCart,
  LucideSlidersHorizontal,
  LucideStore,
  LucideTrendingUp,
  LucideUsers
} from '@lucide/angular';

type Status = 'up' | 'down' | 'flat';
type IconData = typeof LucideActivity;

interface Metric {
  label: string;
  value: string;
  delta: string;
  status: Status;
  icon: IconData;
}

interface TrendPoint {
  month: string;
  actual: number;
  plan: number;
}

interface CategoryBar {
  label: string;
  actual: number;
  plan: number;
}

interface BudgetLine {
  account: string;
  budget: string;
  actual: string;
  variance: string;
  status: Status;
}

interface RegionLine {
  region: string;
  orders: string;
  conversion: string;
  revenue: string;
}

@Component({
  selector: 'sp-root',
  standalone: true,
  imports: [
    CommonModule,
    LucideDynamicIcon
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly icons = {
    alertCircle: LucideAlertCircle,
    arrowDownRight: LucideArrowDownRight,
    arrowUpRight: LucideArrowUpRight,
    bell: LucideBell,
    calendarDays: LucideCalendarDays,
    chevronDown: LucideChevronDown,
    cloud: LucideCloud,
    database: LucideDatabase,
    download: LucideDownload,
    filter: LucideFilter,
    refreshCw: LucideRefreshCw,
    search: LucideSearch,
    slidersHorizontal: LucideSlidersHorizontal,
    store: LucideStore,
    users: LucideUsers
  };

  readonly metrics: Metric[] = [
    { label: 'Revenue', value: '$1.97M', delta: '+9% vs target', status: 'up', icon: LucideCircleDollarSign },
    { label: 'Orders', value: '38,502', delta: '+11% vs target', status: 'up', icon: LucideShoppingCart },
    { label: 'Gross Margin', value: '58.4%', delta: '+3.2 pts', status: 'up', icon: LucideTrendingUp },
    { label: 'Returns', value: '2.8%', delta: '-0.6 pts', status: 'down', icon: LucidePackage },
    { label: 'Net Profit', value: '$154K', delta: '-4% vs plan', status: 'down', icon: LucideActivity }
  ];

  readonly trend: TrendPoint[] = [
    { month: 'Jan', actual: 157, plan: 170 },
    { month: 'Feb', actual: 152, plan: 170 },
    { month: 'Mar', actual: 158, plan: 170 },
    { month: 'Apr', actual: 166, plan: 185 },
    { month: 'May', actual: 160, plan: 185 },
    { month: 'Jun', actual: 158, plan: 185 },
    { month: 'Jul', actual: 164, plan: 185 },
    { month: 'Aug', actual: 162, plan: 185 },
    { month: 'Sep', actual: 165, plan: 185 },
    { month: 'Oct', actual: 176, plan: 185 },
    { month: 'Nov', actual: 177, plan: 185 },
    { month: 'Dec', actual: 181, plan: 178 }
  ];

  readonly categories: CategoryBar[] = [
    { label: 'Online Store', actual: 1.94, plan: 2.18 },
    { label: 'Marketplaces', actual: 0.86, plan: 0.74 },
    { label: 'Retail Partners', actual: 0.41, plan: 0.48 },
    { label: 'Wholesale', actual: 0.28, plan: 0.31 }
  ];

  readonly budgetLines: BudgetLine[] = [
    { account: 'Sales Revenue', budget: '$2.18M', actual: '$1.97M', variance: '-9%', status: 'down' },
    { account: 'Cost of Goods Sold', budget: '$435K', actual: '$388K', variance: '+11%', status: 'up' },
    { account: 'Paid Acquisition', budget: '$274K', actual: '$251K', variance: '+8%', status: 'up' },
    { account: 'Fulfillment', budget: '$199K', actual: '$226K', variance: '-14%', status: 'down' },
    { account: 'Subscriptions', budget: '$82K', actual: '$76K', variance: '+7%', status: 'up' },
    { account: 'Net Profit', budget: '$161K', actual: '$154K', variance: '-4%', status: 'down' }
  ];

  readonly regions: RegionLine[] = [
    { region: 'North America', orders: '18,420', conversion: '4.8%', revenue: '$982K' },
    { region: 'Europe', orders: '9,804', conversion: '3.9%', revenue: '$511K' },
    { region: 'APAC', orders: '7,260', conversion: '3.4%', revenue: '$356K' },
    { region: 'LATAM', orders: '3,018', conversion: '2.7%', revenue: '$119K' }
  ];

  readonly alerts = [
    'Inventory risk: Studio Lamp at 9 days of cover',
    'Ad spend pacing 7% under monthly plan',
    'Repeat purchase rate climbed to 31.8%'
  ];

  readonly actualPath = this.linePath('actual');
  readonly planPath = this.linePath('plan');
  readonly actualDots = this.chartDots('actual');
  readonly planDots = this.chartDots('plan');

  linePath(series: 'actual' | 'plan'): string {
    return this.chartDots(series)
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ');
  }

  chartDots(series: 'actual' | 'plan') {
    const values = this.trend.map((point) => point[series]);
    const min = 145;
    const max = 190;
    const width = 640;
    const height = 150;
    const xStep = width / (values.length - 1);

    return values.map((value, index) => ({
      x: Math.round(index * xStep),
      y: Math.round(height - ((value - min) / (max - min)) * height),
      value
    }));
  }

  barWidth(value: number): string {
    const max = Math.max(...this.categories.flatMap((item) => [item.actual, item.plan]));
    return `${(value / max) * 100}%`;
  }
}
