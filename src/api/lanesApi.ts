import axios from "axios";
import { Lane } from "../models/models";

export async function fetchLanesData(
  resolveFetching: (data: Lane[]) => void
): Promise<void> {
  await axios
    .get("http://localhost:3030/api/lanes")
    .then((res) => resolveFetching(res.data))
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
