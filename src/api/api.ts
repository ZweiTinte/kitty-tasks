import axios from "axios";
import { Project, Board, Lane, Ticket } from "../models/models";

export async function fetchProjectsData(
  resolveFetching: (data: Project[]) => void
): Promise<void> {
  await axios
    .get("http://localhost:3030/api/projects")
    .then((res) => resolveFetching(res.data))
    .catch();
}

export async function fetchBoardsData(
  resolveFetching: (data: Board[]) => void
): Promise<void> {
  await axios
    .get("http://localhost:3030/api/boards")
    .then((res) => resolveFetching(res.data))
    .catch();
}

export async function fetchLanesData(
  resolveFetching: (data: Lane[]) => void
): Promise<void> {
  await axios
    .get("http://localhost:3030/api/lanes")
    .then((res) => resolveFetching(res.data))
    .catch();
}

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

export async function updateLane(
  resolveFetching: () => void,
  lane: Lane
): Promise<void> {
  await axios
    .put(`http://localhost:3030/api/lanes/${lane.id}`, {
      name: lane.name,
      board: lane.board,
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

export async function createLane(
  resolveFetching: () => void,
  boardId: number
): Promise<void> {
  await axios
    .post(`http://localhost:3030/api/lanes`, {
      name: "New Lane",
      board: boardId,
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
