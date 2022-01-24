import { useEffect, useState } from 'react';

import MainContainer from "./components/MainContainer";
import { getTimeRange, defaultTimeRange } from './lib/utils';
import { OrdersEntity } from './types'

function App() {
  // Whole Transformed Data
  const [data, setData] = useState<OrdersEntity[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        // Temporary hosted data
        const res = await fetch('https://api.jsonbin.io/v3/b/61eaee4e3282972ff6803767', {
          headers: {
            "X-Master-Key": "$2b$10$3r5IPAvx8iNyxog8gC9wJOAQ35UQgP9DST618WPXrU1e4yPGOtEny",
          }
        });
        const resData = await res.json();
        const d = resData.record.shedules
        const temp: any = {}
        // Transforming data
        for (let i = 0; i < d.length; i++) {
          const itemDate: string = d[i].item_date
          const [scheduleDate, scheduleTime] = d[i].schedule_time.split(" ")
          const timeRange: any = getTimeRange(Number(scheduleTime.split(":")[0]))
          // If Order Date do not exist
          if (temp[itemDate] === undefined) {
            temp[itemDate] = {
              itemDate,
              orders: 1,
              scheduledAt: {
                [String(scheduleDate)]: {
                  scheduleDate,
                  "scheduled": 1,
                  timeFrames: {
                    ...JSON.parse(JSON.stringify(defaultTimeRange)),
                    [timeRange + d[i].slot]: {
                      timeRange,
                      count: 1,
                      slot: d[i].slot
                    }
                  }
                }
              }
            }
          }
          else {
            temp[itemDate].orders = temp[itemDate].orders + 1
            // If Order Date scheduled date do not exist
            if (temp[itemDate].scheduledAt[scheduleDate] === undefined) {
              temp[itemDate].scheduledAt[scheduleDate] = {
                scheduleDate,
                "scheduled": 1,
                timeFrames: {
                  ...JSON.parse(JSON.stringify(defaultTimeRange)),
                  [timeRange + d[i].slot]: {
                    timeRange,
                    count: 1,
                    slot: d[i].slot
                  }
                }
              };
            } else {
              temp[itemDate].scheduledAt[scheduleDate].scheduled = temp[itemDate].scheduledAt[scheduleDate].scheduled + 1
              temp[itemDate].scheduledAt[scheduleDate].timeFrames[timeRange + d[i].slot].count = temp[itemDate].scheduledAt[scheduleDate].timeFrames[timeRange + d[i].slot].count + 1
            }
          }
        }
        // Converting object propertie values to array items
        let result: OrdersEntity[] = Object.keys(temp).map((key) => {
          const root = { ...temp[key] }
          let sheduledAtArray = Object.keys(root.scheduledAt).map((key) => {
            const primary = { ...root.scheduledAt[key] }
            const timeFramesArray = Object.keys(primary.timeFrames).map((key) => primary.timeFrames[key])
            primary.timeFrames = timeFramesArray
            return primary
          });
          root.scheduledAt = sheduledAtArray
          return root
        })
        setData(result);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData()
  }, []);

  if (isError)
    return <div className='flex justify-center items-center w-screen h-screen'>Error Fetching Data</div>

  if (isLoading)
    return <div className='flex justify-center items-center w-screen h-screen'>Fetching Data...</div>

  return <MainContainer data={data} />
}
export default App
