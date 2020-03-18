import { ChartCompany, Company, Week } from '@interfaces';


export class CompanyChart {
  public id: number;
  public name: string;
  public category: string;
  public weekStats: Week;
  public balance: number;
  public monthBalance: number;

  constructor(company: Company) {
    this.id = company.id;
    this.name = company.name;
    this.category = company.type;
    this.weekStats = company.revenuePerWeek;
    this.balance = company.revenue;
    this.monthBalance = company.monthRevenue;
  }
}

export class ChartSeries {
  public name: string;
  public data: number[] = [];

  constructor(company: ChartCompany) {
    this.name = company.name;
    Object.keys(company.weekStats).forEach(key => this.data.push(company.weekStats[key]));
  }
}

export class TotalValues {
  public monthValue: number = 0;
  public totalValue: number = 0;

  public increment(data: ChartCompany): void {
    this.monthValue += data.monthBalance;
    this.totalValue += data.balance;
  }
}
