import axios from "axios";
import { Board } from "../models/models";

export async function fetchBoardsData(
  resolveFetching: (data: Board[]) => void
): Promise<void> {
  await axios
    .get("http://localhost:3030/api/boards")
    .then((res) => resolveFetching(res.data))
    .catch();
}

export async function createBoard(
  resolveFetching: () => void,
  board: Board
): Promise<void> {
  await axios
    .post(`http://localhost:3030/api/boards`, {
      value: board.value,
      project: board.project,
    })
    .then(resolveFetching)
    .catch();
}
