// Operation Panel Data Constants

// Helper to get current day of year for calculation
const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime(); // Explicitly use .getTime() for arithmetic
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
};

export interface OperationMetric {
    label: string;
    yearTarget: number;
    // plannedComplete is now dynamic, so we might remove it from source data or ignore it
    // keeping it in interface for compatibility but will calculate on fly or update here
    plannedComplete: number;
    actualComplete: number;
    dailyRequired: number;
    twoAirportRatio: number; // percentage
    progressPercent: number;
    unit: string;
}

export interface AirportOperationData {
    name: string;
    code: string;
    metrics: {
        flights: OperationMetric;
        passengers: OperationMetric;
        cargo: OperationMetric;
    };
}

// Base data - targets and actuals. Planned will be calculated.
// Date: 10-24 (Day 297~298), actuals should be 75%-90% of targets
const RAW_DATA = {
    airportA: {
        // Target 380k, ~31% -> 120,000
        flights: { target: 380000, actual: 120000, daily: 1050, ratio: 58.2 },
        // Target 52M, ~50% -> 26,000,000
        passengers: { target: 52000000, actual: 26000000, daily: 145000, ratio: 62.5 },
        // Target 680k, ~82% -> 560,000
        cargo: { target: 680000, actual: 560000, daily: 1890, ratio: 71.3 }
    },
    airportB: {
        // Target 280k, ~78% -> 220,000
        flights: { target: 280000, actual: 220000, daily: 780, ratio: 41.8 },
        // Target 31M, ~32% -> 10,000,000
        passengers: { target: 31000000, actual: 10000000, daily: 86000, ratio: 37.5 },
        // Target 275k, ~51% -> 140,000
        cargo: { target: 275000, actual: 140000, daily: 765, ratio: 28.7 }
    },
    combined: {
        // Sum of A+B
        flights: { target: 660000, actual: 340000, daily: 1830, ratio: 100 },
        passengers: { target: 83000000, actual: 36000000, daily: 231000, ratio: 100 },
        cargo: { target: 955000, actual: 700000, daily: 2655, ratio: 100 }
    }
};

// Fixed day of year: 10-24 = Day 324 (as specified by user)
const FIXED_DAY_OF_YEAR = 324;

// Function to build the data object with calculated planned values
const buildOperationData = () => {
    // Planned = Target / 365 * 324
    const calculatePlanned = (target: number) => Math.floor(target / 365 * FIXED_DAY_OF_YEAR);

    // Helper to constructing a full metric object
    const mkMetric = (label: string, unit: string, data: any): OperationMetric => ({
        label,
        unit,
        yearTarget: data.target,
        plannedComplete: calculatePlanned(data.target),
        actualComplete: data.actual,
        dailyRequired: data.daily,
        twoAirportRatio: data.ratio,
        // Dynamic progress calculation as requested: Actual / Target * 100
        progressPercent: (data.actual / data.target) * 100
    });

    return {
        airportA: {
            name: 'A机场',
            code: 'A',
            metrics: {
                flights: mkMetric('累计航班架次', '架次', RAW_DATA.airportA.flights),
                passengers: mkMetric('旅客吞吐量', '人次', RAW_DATA.airportA.passengers),
                cargo: mkMetric('货邮吞吐量', '吨', RAW_DATA.airportA.cargo)
            }
        },
        airportB: {
            name: 'B机场',
            code: 'B',
            metrics: {
                flights: mkMetric('累计航班架次', '架次', RAW_DATA.airportB.flights),
                passengers: mkMetric('旅客吞吐量', '人次', RAW_DATA.airportB.passengers),
                cargo: mkMetric('货邮吞吐量', '吨', RAW_DATA.airportB.cargo)
            }
        },
        combined: {
            name: '两场合计',
            code: 'ALL',
            metrics: {
                flights: mkMetric('累计航班架次', '架次', RAW_DATA.combined.flights),
                passengers: mkMetric('旅客吞吐量', '人次', RAW_DATA.combined.passengers),
                cargo: mkMetric('货邮吞吐量', '吨', RAW_DATA.combined.cargo)
            }
        }
    };
};

export const OPERATION_DATA = buildOperationData();

// Formatter for standardized display
export const formatMetricValue = (value: number, type: 'flights' | 'passengers' | 'cargo', isTarget: boolean = false): { val: string, unit: string } => {
    // Target values - rounded, no decimals often requested for high level goals, but '万' implies decimal might be needed unless whole number
    // User requested "Year Target no decimals" -> meaning integer after unit conversion? Or just integer?
    // Assuming user means: 52000000 -> 5200 万 (no 5200.00)

    const digits = isTarget ? 0 : 2; // 0 decimals for target, 2 for others

    if (type === 'passengers') {
        const val = (value / 10000).toFixed(digits);
        return { val, unit: '万' };
    }
    if (type === 'cargo') {
        const val = (value / 10000).toFixed(digits);
        return { val, unit: '万吨' };
    }
    // flights
    return { val: value.toString(), unit: '' };
};
