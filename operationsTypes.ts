// 运行指标数据类型

// 单个指标（百分比）
export interface OperationMetric {
    value: number;  // 百分比值，如 95.5
}

// 代理的6项运行指标
export interface AgentMetrics {
    name: string;  // 代理名称
    takeoffRate: OperationMetric;        // 起飞正常率
    departureRate: OperationMetric;      // 始发正常率
    releaseRate: OperationMetric;        // 放行正常率
    peakDepartureRate: OperationMetric;  // 早高峰始发正常率
    cabinDoorRate: OperationMetric;      // 提前5分钟关客舱门
    cargoDoorRate: OperationMetric;      // 提前5分钟关货舱门
}

// 机场运行数据
export interface AirportOperations {
    id: string;
    name: string;
    colorTheme: 'teal' | 'indigo';
    agents: AgentMetrics[];
}

// 页面数据
export interface OperationsPageData {
    airportA: AirportOperations;
    airportB: AirportOperations;
}
