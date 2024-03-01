import * as React from "react";
import { Board, Project } from "../../models/models";
import DropdownMenu from "../atoms/DrodownMenu";

const LeftSidebar = ({
  selectedProject,
  projectList,
  boards,
  selectedItem,
  setSelectedItem,
  selectedBoard,
  setSelectedBoard,
}: {
  selectedProject: Project;
  projectList: Project[];
  boards: Board[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  selectedBoard: Board;
  setSelectedBoard: (board: Board) => void;
}) => {
  return (
    <div className="leftSidebar">
      <div className="dropdownWrapper">
        <DropdownMenu
          dropdownItem={selectedProject.value}
          dropdownData={projectList}
          selectedItem={selectedItem}
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
      </ul>
    </div>
  );
};

export default LeftSidebar;
