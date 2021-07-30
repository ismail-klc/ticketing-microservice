import { Publisher, OrderCancelledEvent, Subjects } from "@isotickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled;
}