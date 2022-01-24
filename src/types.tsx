export interface OrdersEntity {
    itemDate: string;
    orders: number;
    scheduledAt: (ScheduledAtEntity)[];

}
export interface ScheduledAtEntity {
    scheduleDate: string;
    scheduled: number;
    timeFrames: (TimeFramesEntity)[];
}
export interface TimeFramesEntity {
    timeRange: string;
    count: number;
    slot: string;
}
