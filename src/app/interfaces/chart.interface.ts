export interface Company extends BaseCompany {
  type: string;
  revenuePerWeek: Week;
  revenue: number;
  monthRevenue: number;
}

export interface ChartCompany extends BaseCompany {
  category: string;
  weekStats: Week;
  balance: number;
  monthBalance: number;
}

export interface Week {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

export interface BaseCompany {
  id: number;
  name: string;
}

export interface ChartForm {
  name: string;
  category: string;
}
