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
  LucideIconData,
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

interface Metric {
  key: string;
  label: string;
  value: string;
  delta: string;
  status: Status;
  icon: LucideIconData;
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
  detail: string;
}

interface RegionLine {
  region: string;
  orders: string;
  conversion: string;
  revenue: string;
}

interface FunnelStage {
  label: string;
  value: string;
  percent: number;
}

interface ProductLine {
  sku: string;
  revenue: string;
  margin: string;
  stock: string;
  status: Status;
}

interface CampaignLine {
  name: string;
  spend: string;
  roas: string;
  share: number;
}

interface InventoryLine {
  item: string;
  cover: string;
  demand: string;
  status: Status;
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
  selectedMethod = 'Accrual';
  selectedYear = '2026';
  selectedChannel = 'All channels';
  selectedMetricKey = 'Revenue';
  expandedAccount = 'Sales Revenue';
  notice = 'Demo data loaded. Select a KPI, filter, or row to update the dashboard.';
  refreshCount = 0;
  selectedProduct = 'Aero Tote';
  selectedCampaign = 'Search Brand';

  readonly methods = ['Accrual', 'Cash'];
  readonly years = ['2026', '2025', '2024'];
  readonly channels = ['All channels', 'Online Store', 'Marketplaces', 'Retail Partners', 'Wholesale'];
  readonly months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  readonly chartBounds = {
    width: 720,
    height: 250,
    left: 56,
    right: 18,
    top: 18,
    bottom: 34
  };

  readonly icons = {
    alertCircle: LucideAlertCircle.icon,
    arrowDownRight: LucideArrowDownRight.icon,
    arrowUpRight: LucideArrowUpRight.icon,
    bell: LucideBell.icon,
    calendarDays: LucideCalendarDays.icon,
    chevronDown: LucideChevronDown.icon,
    cloud: LucideCloud.icon,
    database: LucideDatabase.icon,
    download: LucideDownload.icon,
    filter: LucideFilter.icon,
    package: LucidePackage.icon,
    refreshCw: LucideRefreshCw.icon,
    search: LucideSearch.icon,
    slidersHorizontal: LucideSlidersHorizontal.icon,
    store: LucideStore.icon,
    users: LucideUsers.icon
  };

  readonly metrics: Metric[] = [
    { key: 'Revenue', label: 'Revenue', value: '₱1.97M', delta: '+9% vs target', status: 'up', icon: LucideCircleDollarSign.icon },
    { key: 'Orders', label: 'Orders', value: '38,502', delta: '+11% vs target', status: 'up', icon: LucideShoppingCart.icon },
    { key: 'Gross Margin', label: 'Gross Margin', value: '58.4%', delta: '+3.2 pts', status: 'up', icon: LucideTrendingUp.icon },
    { key: 'Returns', label: 'Returns', value: '2.8%', delta: '-0.6 pts', status: 'down', icon: LucidePackage.icon },
    { key: 'Net Profit', label: 'Net Profit', value: '₱154K', delta: '-4% vs plan', status: 'down', icon: LucideActivity.icon }
  ];

  readonly baseTrend: TrendPoint[] = [
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

  readonly trendMultipliers: Record<string, number> = {
    Revenue: 1,
    Orders: 0.78,
    'Gross Margin': 0.33,
    Returns: 0.08,
    'Net Profit': 0.28
  };

  readonly categories: CategoryBar[] = [
    { label: 'Online Store', actual: 1.94, plan: 2.18 },
    { label: 'Marketplaces', actual: 0.86, plan: 0.74 },
    { label: 'Retail Partners', actual: 0.41, plan: 0.48 },
    { label: 'Wholesale', actual: 0.28, plan: 0.31 }
  ];

  readonly budgetLines: BudgetLine[] = [
    { account: 'Sales Revenue', budget: '₱2.18M', actual: '₱1.97M', variance: '-9%', status: 'down', detail: 'Would expand into product, coupon, and marketplace fee adjustments.' },
    { account: 'Cost of Goods Sold', budget: '₱435K', actual: '₱388K', variance: '+11%', status: 'up', detail: 'Would show vendor cost movement and landed-cost assumptions.' },
    { account: 'Paid Acquisition', budget: '₱274K', actual: '₱251K', variance: '+8%', status: 'up', detail: 'Would connect campaign pacing, CAC, and ROAS by channel.' },
    { account: 'Fulfillment', budget: '₱199K', actual: '₱226K', variance: '-14%', status: 'down', detail: 'Would drill into carrier, zone, and warehouse exception costs.' },
    { account: 'Subscriptions', budget: '₱82K', actual: '₱76K', variance: '+7%', status: 'up', detail: 'Would list app, SaaS, and payment processor subscriptions.' },
    { account: 'Net Profit', budget: '₱161K', actual: '₱154K', variance: '-4%', status: 'down', detail: 'Would reconcile revenue, margin, operating spend, and one-off adjustments.' }
  ];

  readonly regions: RegionLine[] = [
    { region: 'North America', orders: '18,420', conversion: '4.8%', revenue: '₱982K' },
    { region: 'Europe', orders: '9,804', conversion: '3.9%', revenue: '₱511K' },
    { region: 'APAC', orders: '7,260', conversion: '3.4%', revenue: '₱356K' },
    { region: 'LATAM', orders: '3,018', conversion: '2.7%', revenue: '₱119K' }
  ];

  readonly alerts = [
    'Inventory risk: Studio Lamp at 9 days of cover',
    'Ad spend pacing 7% under monthly plan',
    'Repeat purchase rate climbed to 31.8%'
  ];

  readonly funnel: FunnelStage[] = [
    { label: 'Sessions', value: '421K', percent: 100 },
    { label: 'Product Views', value: '188K', percent: 45 },
    { label: 'Add to Cart', value: '54K', percent: 13 },
    { label: 'Checkout', value: '31K', percent: 7 },
    { label: 'Orders', value: '38.5K', percent: 9 }
  ];

  readonly products: ProductLine[] = [
    { sku: 'Aero Tote', revenue: '₱412K', margin: '62%', stock: '42d', status: 'up' },
    { sku: 'Studio Lamp', revenue: '₱286K', margin: '54%', stock: '9d', status: 'down' },
    { sku: 'Desk Kit', revenue: '₱233K', margin: '49%', stock: '18d', status: 'flat' },
    { sku: 'Travel Dock', revenue: '₱191K', margin: '57%', stock: '31d', status: 'up' }
  ];

  readonly campaigns: CampaignLine[] = [
    { name: 'Search Brand', spend: '₱82K', roas: '7.4x', share: 92 },
    { name: 'Social Prospecting', spend: '₱74K', roas: '3.1x', share: 58 },
    { name: 'Retargeting', spend: '₱51K', roas: '5.8x', share: 76 },
    { name: 'Creator Codes', spend: '₱44K', roas: '4.6x', share: 64 }
  ];

  readonly inventory: InventoryLine[] = [
    { item: 'Studio Lamp', cover: '9d', demand: '+18%', status: 'down' },
    { item: 'Aero Tote', cover: '42d', demand: '+7%', status: 'up' },
    { item: 'Desk Kit', cover: '18d', demand: '-2%', status: 'flat' },
    { item: 'Cable Set', cover: '15d', demand: '+11%', status: 'down' }
  ];

  readonly cashFlow = [
    { label: 'Cash In', value: '₱712K', width: 88, status: 'up' },
    { label: 'Cash Out', value: '₱558K', width: 69, status: 'down' },
    { label: 'Open AR', value: '₱184K', width: 34, status: 'flat' },
    { label: 'Projected', value: '₱239K', width: 48, status: 'up' }
  ];

  get activeMetric(): Metric {
    return this.metrics.find((metric) => metric.key === this.selectedMetricKey) ?? this.metrics[0];
  }

  get activeTrend(): TrendPoint[] {
    const metricFactor = this.trendMultipliers[this.selectedMetricKey] ?? 1;
    const channelFactor = this.selectedChannel === 'All channels'
      ? 1
      : 0.62 + this.channels.indexOf(this.selectedChannel) * 0.07;
    const yearFactor = this.selectedYear === '2026' ? 1 : this.selectedYear === '2025' ? 0.92 : 0.84;
    const methodFactor = this.selectedMethod === 'Accrual' ? 1 : 0.96;
    const refreshBump = 1 + this.refreshCount * 0.004;
    const factor = metricFactor * channelFactor * yearFactor * methodFactor * refreshBump;

    return this.baseTrend.map((point) => ({
      month: point.month,
      actual: Math.round(point.actual * factor),
      plan: Math.round(point.plan * factor)
    }));
  }

  get activeCategories(): CategoryBar[] {
    const channelBoost = this.selectedChannel === 'All channels' ? 1 : 1.08;
    return this.categories.map((category) => ({
      ...category,
      actual: Number((category.actual * channelBoost).toFixed(2)),
      plan: Number((category.plan * (this.selectedMethod === 'Cash' ? 0.94 : 1)).toFixed(2))
    }));
  }

  get chartValues(): number[] {
    return this.activeTrend.flatMap((point) => [point.actual, point.plan]);
  }

  get chartMin(): number {
    return Math.floor((Math.min(...this.chartValues) - 5) / 10) * 10;
  }

  get chartMax(): number {
    return Math.ceil((Math.max(...this.chartValues) + 5) / 10) * 10;
  }

  get yTicks(): number[] {
    const step = (this.chartMax - this.chartMin) / 4;
    return Array.from({ length: 5 }, (_, index) => Math.round(this.chartMin + step * index)).reverse();
  }

  get actualPolyline(): string {
    return this.chartDots('actual').map((point) => `${point.x},${point.y}`).join(' ');
  }

  get planPolyline(): string {
    return this.chartDots('plan').map((point) => `${point.x},${point.y}`).join(' ');
  }

  get chartRangeLabel(): string {
    return `${this.selectedMetricKey} / ${this.selectedChannel} / ${this.selectedYear}`;
  }

  chartDots(series: 'actual' | 'plan') {
    const { width, height, left, right, top, bottom } = this.chartBounds;
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;
    const range = this.chartMax - this.chartMin || 1;

    return this.activeTrend.map((point, index) => {
      const value = point[series];
      return {
      month: point.month,
      x: Math.round(left + (plotWidth / (this.activeTrend.length - 1)) * index),
      y: Math.round(top + plotHeight - ((value - this.chartMin) / range) * plotHeight),
      value
    };
    });
  }

  tickY(value: number): number {
    const { height, top, bottom } = this.chartBounds;
    const plotHeight = height - top - bottom;
    return Math.round(top + plotHeight - ((value - this.chartMin) / (this.chartMax - this.chartMin || 1)) * plotHeight);
  }

  setMethod(method: string): void {
    this.selectedMethod = method;
    this.notice = `${method} method selected. A live version would re-map recognized revenue and cash timing.`;
  }

  setYear(year: string): void {
    this.selectedYear = year;
    this.notice = `${year} reporting period selected. A live version would load the warehouse snapshot for that year.`;
  }

  setChannel(channel: string): void {
    this.selectedChannel = channel;
    this.notice = `${channel} channel selected. A live version would apply channel-level filters across every tile.`;
  }

  selectMetric(metric: Metric): void {
    this.selectedMetricKey = metric.key;
    this.notice = `${metric.label} selected. Trend, gauge, and channel bars are now focused on that KPI.`;
  }

  runAction(action: string): void {
    const messages: Record<string, string> = {
      refresh: 'Refresh simulated. A live build would request the newest facts from the BI database.',
      controls: 'Controls simulated. A live build would open saved segments, cohorts, and custom metric definitions.',
      export: 'Export simulated. A live build would generate a CSV/PDF for the visible dashboard state.',
      database: 'Connector health simulated. A live build would show sync freshness, failures, and table counts.',
      search: 'Variance search simulated. A live build would query transactions behind the selected KPI.',
      filter: 'Budget mapping simulated. A live build would edit account rollups and allocation rules.',
      variance: 'Variance drilldown simulated. A live build would rank drivers by contribution.',
      cohorts: 'Regional cohort compare simulated. A live build would fetch customer segments.',
      alerts: 'Alert configuration simulated. A live build would route notifications to email or Slack.',
      funnel: 'Funnel step selected. A live version would open the customer journey segment behind this stage.',
      inventory: 'Inventory item selected. A live version would show purchasing, demand, and stockout forecasts.',
      cashflow: 'Cashflow bar selected. A live version would reconcile invoices, payouts, and scheduled bills.'
    };

    if (action === 'refresh') {
      this.refreshCount += 1;
    }

    this.notice = messages[action] ?? 'Demo action triggered.';
  }

  selectProduct(product: ProductLine): void {
    this.selectedProduct = product.sku;
    this.notice = `${product.sku} selected. A live version would filter the dashboard to SKU-level margin and inventory.`;
  }

  selectCampaign(campaign: CampaignLine): void {
    this.selectedCampaign = campaign.name;
    this.notice = `${campaign.name} selected. A live version would drill into spend, ROAS, and attributable orders.`;
  }

  toggleAccount(account: string): void {
    this.expandedAccount = this.expandedAccount === account ? '' : account;
    this.notice = this.expandedAccount
      ? `${account} expanded. A live version would show the underlying ledger rows.`
      : 'Budget row collapsed.';
  }

  barWidth(value: number): string {
    const max = Math.max(...this.activeCategories.flatMap((item) => [item.actual, item.plan]));
    return `${(value / max) * 100}%`;
  }
}
