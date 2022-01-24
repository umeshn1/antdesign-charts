import { memo } from "react";
import { Column } from '@ant-design/plots';

import { TimeFramesEntity } from '../../types'

interface ColumnChartProps {
    data: TimeFramesEntity[],
}

const ColumnChart = memo(({ data }: ColumnChartProps) => {
    const config = {
        data,
        colorField: 'slot',
        xField: 'timeRange',
        yField: 'count',
        isStack: true,
        seriesField: 'slot',
        label: {
            position: 'middle',
            layout: [
                {
                    type: 'interval-adjust-position',
                },
                {
                    type: 'interval-hide-overlap',
                },
                {
                    type: 'adjust-color',
                },
            ],
        },
        color: ({ slot }: any) => {
            if (slot == 'D') {
                return '#ffb8b3';
            }
            return '#adffb4';
        },
    };
    // @ts-ignore
    return <Column {...config} />
});

export default ColumnChart;
