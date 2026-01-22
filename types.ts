export interface Metric {
  label: string;
  subLabel: string;
  executed: number;
  planned: number;
  percentage: number;
}

export interface AirportData {
  id: string;
  name: string;
  role: string;
  colorTheme: 'teal' | 'indigo';
  totalFlights: {
    executed: number;
    planned: number;
    percentage: number;
  };
  metrics: {
    domPax: Metric;
    domCgo: Metric;
    intPax: Metric;
    intCgo: Metric;
  };
}

export interface GapItem {
  label: string;
  gapValue: number;
  plan: number;
  act: number;
  percentage: number;
}

export interface JointOpsData {
  totalExecuted: number;
  totalPlanned: number;
  completionRate: number;
  gaps: GapItem[];
}