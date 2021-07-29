import { Publisher, Subjects, TicketCreatedEvent } from "@isotickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;
}