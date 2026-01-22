import { OperationsPageData } from './operationsTypes';

export const OPERATIONS_DATA: OperationsPageData = {
    airportA: {
        id: 'A',
        name: 'A 机场',
        colorTheme: 'teal',
        agents: [
            {
                name: '地服代理',
                takeoffRate: { value: 92.5 },
                departureRate: { value: 88.3 },
                releaseRate: { value: 95.1 },
                peakDepartureRate: { value: 85.6 },
                cabinDoorRate: { value: 91.2 },
                cargoDoorRate: { value: 89.7 },
            },
            {
                name: '地服客运',
                takeoffRate: { value: 94.2 },
                departureRate: { value: 90.1 },
                releaseRate: { value: 96.8 },
                peakDepartureRate: { value: 87.4 },
                cabinDoorRate: { value: 93.5 },
                cargoDoorRate: { value: 91.8 },
            },
            {
                name: '祥鹏代理',
                takeoffRate: { value: 89.8 },
                departureRate: { value: 85.6 },
                releaseRate: { value: 92.4 },
                peakDepartureRate: { value: 82.1 },
                cabinDoorRate: { value: 88.9 },
                cargoDoorRate: { value: 86.3 },
            },
            {
                name: '东航代理',
                takeoffRate: { value: 91.3 },
                departureRate: { value: 87.9 },
                releaseRate: { value: 94.2 },
                peakDepartureRate: { value: 84.7 },
                cabinDoorRate: { value: 90.4 },
                cargoDoorRate: { value: 88.1 },
            },
        ],
    },
    airportB: {
        id: 'B',
        name: 'B 机场',
        colorTheme: 'indigo',
        agents: [
            {
                name: '地服代理',
                takeoffRate: { value: 93.1 },
                departureRate: { value: 89.5 },
                releaseRate: { value: 95.8 },
                peakDepartureRate: { value: 86.2 },
                cabinDoorRate: { value: 92.1 },
                cargoDoorRate: { value: 90.3 },
            },
        ],
    },
};

// 指标名称映射
export const METRIC_LABELS = {
    takeoffRate: '起飞正常率',
    departureRate: '始发正常率',
    releaseRate: '放行正常率',
    peakDepartureRate: '早高峰始发正常率',
    cabinDoorRate: '提前5分关客舱门',
    cargoDoorRate: '提前5分关货舱门',
};
