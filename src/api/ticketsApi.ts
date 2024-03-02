import axios from "axios";
import { Ticket } from "../models/models";

export async function fetchTicketsData(
  resolveFetching: (data: Ticket[]) => void
): Promise<void> {
  await axios
    .get("http://localhost:3030/api/tickets")
    .then((res) => resolveFetching(res.data))
    .catch();
}

export async function updateTicket(
  resolveFetching: () => void,
  ticketId: string,
  ticket: Ticket
): Promise<void> {
  await axios
    .put(`http://localhost:3030/api/tickets/${ticketId}`, {
      name: ticket.name,
      description: ticket.description,
      lane: ticket.lane,
    })
    .then(resolveFetching)
    .catch();
}

export async function createTicket(
  resolveFetching: () => void,
  ticket: Ticket
): Promise<void> {
  await axios
    .post(`http://localhost:3030/api/tickets`, {
      name: ticket.name,
      description: ticket.description,
      lane: ticket.lane,
    })
    .then(resolveFetching)
    .catch();
}

export async function deleteTicket(
  resolveFetching: () => void,
  ticketId: string
): Promise<void> {
  await axios
    .delete(`http://localhost:3030/api/tickets/${ticketId}`)
    .then(resolveFetching)
    .catch();
}
