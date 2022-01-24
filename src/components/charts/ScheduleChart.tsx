import { memo, Dispatch } from "react";
import { Line } from '@ant-design/plots';

import { ScheduledAtEntity } from '../../types'

interface ScheduleChartProps {
    data: ScheduledAtEntity[],
    handleClick: Dispatch<ScheduledAtEntity>
}
const ScheduleChart = memo(({ data, handleClick }: ScheduleChartProps) => {
    const config = {
        data,
        smooth: true,
        point: {
            shape: "circle",
            size: 3
        },
        xField: 'scheduleDate',
        yField: 'scheduled',
        label: {
            style: {
                fill: 'black',
                opacity: 1,
                fontSize: 12
            },
            rotate: false
        },
        yAxis: {
            min: 0,
            title: {
                text: "Orders Scheduled"
            },
        },
        xAxis: {
            tickCount: 4,
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

export default ScheduleChart