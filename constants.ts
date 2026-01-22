import { AirportData, JointOpsData } from './types';

export const AIRPORT_A_DATA: AirportData = {
  id: 'A',
  name: 'A 机场',
  role: '核心枢纽 / 北区运行',
  colorTheme: 'teal',
  totalFlights: {
    executed: 650,
    planned: 800,
    percentage: 81.2,
  },
  metrics: {
    domPax: { label: '国内客机', subLabel: '', executed: 300, planned: 350, percentage: 85 },
    domCgo: { label: '国内货机', subLabel: '', executed: 50, planned: 60, percentage: 83 },
    intPax: { label: '国际客机', subLabel: '', executed: 200, planned: 250, percentage: 80 },
    intCgo: { label: '国际货机', subLabel: '', executed: 100, planned: 140, percentage: 71 },
  },
};

export const AIRPORT_B_DATA: AirportData = {
  id: 'B',
  name: 'B 机场',
  role: '辅助枢纽 / 南区运行',
  colorTheme: 'indigo',
  totalFlights: {
    executed: 590,
    planned: 700,
    percentage: 84.3,
  },
  metrics: {
    domPax: { label: '国内客机', subLabel: '', executed: 280, planned: 320, percentage: 88 },
    domCgo: { label: '国内货机', subLabel: '', executed: 45, planned: 50, percentage: 90 },
    intPax: { label: '国际客机', subLabel: '', executed: 190, planned: 240, percentage: 79 },
    intCgo: { label: '国际货机', subLabel: '', executed: 75, planned: 90, percentage: 83 },
  },
};

export const JOINT_OPS_DATA: JointOpsData = {
  totalExecuted: 1240,
  totalPlanned: 1500,
  completionRate: 82.6,
  gaps: [
    { label: '国内客机', gapValue: -90, plan: 670, act: 580, percentage: 86 },
    { label: '国内货机', gapValue: -15, plan: 110, act: 95, percentage: 86 },
    { label: '国际客机', gapValue: -100, plan: 490, act: 390, percentage: 79 },
    { label: '国际货机', gapValue: -55, plan: 230, act: 175, percentage: 76 },
  ],
};