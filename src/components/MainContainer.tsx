import { useEffect, useState, useRef } from 'react';

import OrdersChart from './charts/OrdersChart';
import ScheduleChart from './charts/ScheduleChart';
import ColumnChart from './charts/ColumnChart';

import { OrdersEntity, ScheduledAtEntity } from '../types'

interface MainContainerProps {
    data: OrdersEntity[] | undefined
}

export default function MainContainer({ data }: MainContainerProps) {
    // seletedDate data is used in details container
    const [selectedDate, setSelectedDate] = useState<OrdersEntity>();

    // Only used for programmatically scrolling
    let containerRef = useRef<HTMLInputElement>(null)

    return <div className='max-h-screen overflow-y-scroll snap-y snap-mandatory' ref={containerRef} >
        <div className='w-full max-w-screen-lg m-auto p-4 min-h-screen flex flex-col justify-center items-center snap-start '>
            <div className='text-2xl md:text-3xl mb-24 w-full'>Number of orders</div>
            <div className='w-full' onDoubleClick={() => {
                // Scrolling on double click
                // @ts-ignore
                containerRef.current?.scrollTo({ top: containerRef.current.children[0].offsetHeight, behavior: 'smooth' })
            }}>
                <OrdersChart data={data} handleClick={setSelectedDate} />
            </div >
            {!selectedDate ? <div className='fixed mb-4 bottom-0'>Double-click on the chart to show details</div> : null}
        </div>
        {selectedDate ? <DetailsContainer data={selectedDate} /> : null}
    </div >
};

interface DetailsContainerProps {
    data: OrdersEntity
}

function DetailsContainer({ data }: DetailsContainerProps) {
    // SeletedDate data is used in ColumnChart
    const [selectedDate, setSelectedDate] = useState<ScheduledAtEntity>();
    useEffect(() => {
        // Auto select Last date to display in ColumnChart
        if (data)
            setSelectedDate(data.scheduledAt[data.scheduledAt.length - 1])
    }, [data])

    return <div className='w-full max-w-screen-lg m-auto p-4 min-h-screen flex flex-col justify-center items-center snap-start'>
        <div className='text-2xl md:text-3xl mb-24 w-full'>Orders Scheduled for {data.itemDate}</div>
        <div className='grid w-full grid-rows-2 md:grid-rows-1 md:grid-cols-2'>
            <div className='mx-2'>
                <ScheduleChart data={data.scheduledAt} handleClick={setSelectedDate} />
                <p className='text-center mt-4'>{data.itemDate}</p>
            </div>
            <div className='mx-2 mt-8 md:mt-0'>
                {selectedDate ?
                    <ColumnChart data={selectedDate.timeFrames} />
                    : "Loading"
                }
                <p className='text-center mt-4'>{selectedDate?.scheduleDate}</p>
            </div>
        </div>
    </div>
}
