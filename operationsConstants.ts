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
                departureRate: { value: 91.5 }, // Max
                releaseRate: { value: 94.1 },
                peakDepartureRate: { value: 85.6 },
                cabinDoorRate: { value: 89.5 }, // Min
                cargoDoorRate: { value: 89.7 },
            },
            {
                name: '地服客运',
                takeoffRate: { value: 91.2 },
                departureRate: { value: 89.1 },
                releaseRate: { value: 93.8 },
                peakDepartureRate: { value: 83.4 }, // Min
                cabinDoorRate: { value: 94.5 }, // Max
                cargoDoorRate: { value: 91.8 },
            },
            {
                name: '祥鹏代理',
                takeoffRate: { value: 90.8 },
                departureRate: { value: 86.6 }, // Min
                releaseRate: { value: 97.4 }, // Max
                peakDepartureRate: { value: 86.1 },
                cabinDoorRate: { value: 91.9 },
                cargoDoorRate: { value: 86.3 }, // Min
            },
            {
                name: '东航代理',
                takeoffRate: { value: 88.5 }, // Min
                departureRate: { value: 88.9 },
                releaseRate: { value: 95.2 },
                peakDepartureRate: { value: 88.7 }, // Max
                cabinDoorRate: { value: 90.4 },
                cargoDoorRate: { value: 93.1 },
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
                takeoffRate: { value: 95.2 }, // Max
                departureRate: { value: 90.5 },
                releaseRate: { value: 92.0 }, // Min
                peakDepartureRate: { value: 85.2 },
                cabinDoorRate: { value: 92.1 },
                cargoDoorRate: { value: 93.5 }, // Max
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
