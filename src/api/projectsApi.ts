import axios from "axios";
import { Project } from "../models/models";

export async function fetchProjectsData(
  resolveFetching: (data: Project[]) => void
): Promise<void> {
  await axios
    .get("http://localhost:3030/api/projects")
    .then((res) => resolveFetching(res.data))
    .catch();
}
