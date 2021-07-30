import { Publisher, OrderCreatedEvent, Subjects } from "@isotickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
}