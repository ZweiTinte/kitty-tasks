import * as React from "react";
import { Board, Project } from "../../models/models";
import DropdownMenu from "../atoms/DrodownMenu";

const LeftSidebar = ({
  selectedProject,
  projectList,
  boards,
  setSelectedItem,
  selectedBoard,
  setSelectedBoard,
  createNewBoard,
}: {
  selectedProject: Project;
  projectList: Project[];
  boards: Board[];
  setSelectedItem: (item: string) => void;
  selectedBoard: Board;
  setSelectedBoard: (board: Board) => void;
  createNewBoard: (projectId: number) => void;
}) => {
  return (
    <div className="leftSidebar">
      <div className="dropdownWrapper">
        <DropdownMenu
          dropdownItem={selectedProject.value}
          dropdownData={projectList}
          setSelectedItem={setSelectedItem}
        />
      </div>
      <ul>
        {boards.map((board: Board) => {
          return (
            <li
              key={board.id}
              className={board.id === selectedBoard?.id ? "activeBoard" : ""}
              onClick={() => setSelectedBoard(board)}
            >
              {board.value}
            </li>
          );
        })}
        <input
          type="button"
          className="newButton"
          value="+"
          title="New Board"
          onClick={() => createNewBoard(selectedProject.id)}
        />
      </ul>
    </div>
  );
};

export default LeftSidebar;
