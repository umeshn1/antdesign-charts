import { memo, Dispatch } from "react";
import { Line } from '@ant-design/plots';

import { OrdersEntity } from '../../types'

interface OrdersChartProps {
    data: OrdersEntity[] | undefined,
    handleClick: Dispatch<OrdersEntity>
}

const OrdersChart = memo(({ data, handleClick }: OrdersChartProps) => {
    const config = {
        data,
        point: {
            shape: "circle",
            size: 3
        },
        xField: 'itemDate',
        yField: 'orders',
        yAxis: {
            min: 0,
            title: {
                text: "Orders"
            },
        },
        xAxis: {
            tickCount: 6,
        },
        slider: {
            start: 0.7,
            end: 1,
            height: 30,
            minLimit: 3,
            maxLimit: 8,
            trendCfg: {
                isArea: true
            },
        },
    };

    // @ts-ignore
    return <Line {...config}
        onEvent={(chart, event) => {
            if (event.type == "dblclick") {
                const { x, y } = event;
                const item = chart.chart.getTooltipItems({ x, y });
                handleClick(item[0].data)
            }
        }}
    />
});

export default OrdersChart;