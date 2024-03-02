import * as React from "react";
import LeftSidebar from "../components/level1/LeftSidebar";
import LaneArea from "../components/atoms/LaneArea";
import RightSidebar from "../components/atoms/RightSidebar";
import { Board, Lane, Project, Ticket } from "../models/models";
import { createLane, fetchLanesData, updateLane } from "../api/lanesApi";
import {
  createTicket,
  deleteTicket,
  fetchTicketsData,
  updateTicket,
} from "../api/ticketsApi";
import { fetchProjectsData } from "../api/projectsApi";
import { createBoard, fetchBoardsData } from "../api/boardsApi";

const IndexPage = () => {
  const [boardsReady, setBoardsReady] = React.useState(false);
  const [projectsReady, setProjectsReady] = React.useState(false);
  const [ticketsReady, setTicketsReady] = React.useState(false);
  const [lanesReady, setLanesReady] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState({
    id: 0,
    value: "",
  });
  const [selectedBoard, setSelectedBoard] = React.useState({
    id: 0,
    project: 0,
    value: "",
  });
  const [selectedTicket, setSelectedTicket] = React.useState({
    id: 0,
    lane: 0,
    name: "",
    description: "",
  });
  const [projectList, setProjectList] = React.useState<Project[]>([]);
  const [boards, setBoards] = React.useState<Board[]>([]);
  const [lanes, setLanes] = React.useState<Lane[]>([]);
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [activeLanes, setActiveLanes] = React.useState<Lane[]>([]);

  function selectTicket(ticket: Ticket) {
    setSelectedTicket(ticket);
    localStorage.setItem("activeTicket", ticket.id.toString());
  }

  async function ticketUpdate(ticket: Ticket) {
    await updateTicket(
      () => {
        setTicketsReady(false);
      },
      ticket.id.toString(),
      ticket
    );
  }

  async function ticketDelete(ticketId: number) {
    await deleteTicket(() => {
      setTicketsReady(false);
    }, ticketId.toString());
  }

  async function laneSave(lane: Lane) {
    await updateLane(() => {
      setLanesReady(false);
    }, lane);
  }

  async function laneCreate(boardId: number) {
    await createLane(() => {
      setLanesReady(false);
    }, boardId);
  }

  async function ticketLaneUpdate(ticketId: string, laneId: string) {
    const ticket = tickets.filter((t) => {
      return t.id.toString() === ticketId;
    })[0];
    ticket.lane = parseInt(laneId);
    await updateTicket(
      () => {
        setTicketsReady(false);
      },
      ticketId,
      ticket
    );
  }

  async function ticketCreate(laneId: number) {
    const newTicket = {
      lane: laneId,
      name: "New Ticket",
      description: "",
      id: 0,
    };
    await createTicket(() => {
      setTicketsReady(false);
    }, newTicket);
  }

  async function boardCreate(projectId: number) {
    const newBoard = {
      project: projectId,
      value: "New Board",
      id: 0,
    };
    await createBoard(() => {
      setBoardsReady(false);
    }, newBoard);
  }

  function resolveFetchingProjects(data: Project[]): void {
    setProjectList(data);
    const activeId = localStorage.getItem("activeProject");
    if (activeId) {
      setSelectedProject(data[parseInt(activeId) - 1]);
    } else {
      setSelectedProject(data[0]);
    }
    setProjectsReady(true);
  }

  function resolveFetchingBoards(data: Board[]): void {
    const newBoards = data.filter((item) => {
      return selectedProject.id === item.project;
    });
    setBoards(newBoards);
    const activeId = localStorage.getItem("activeBoard");
    if (activeId) {
      setSelectedBoard(
        newBoards.filter((board) => {
          return board.id === parseInt(activeId);
        })[0]
      );
    } else {
      setSelectedBoard(newBoards[0] ?? selectedBoard);
    }
    setBoardsReady(true);
  }

  function resolveFetchingTickets(data: Ticket[]): void {
    setTickets(data);
    const activeId = localStorage.getItem("activeTicket");
    if (activeId) {
      setSelectedTicket(data[parseInt(activeId) - 1]);
    } else {
      setSelectedTicket(data[0]);
    }
    setTicketsReady(true);
  }

  function resolveFetchingLanes(data: Lane[]): void {
    setLanes(data);
    setActiveLanes(
      data.filter((item) => {
        return (selectedBoard as Board)?.id === item.board;
      })
    );
    setLanesReady(true);
  }

  React.useEffect(() => {
    fetchProjectsData(resolveFetchingProjects);
  }, [projectsReady]);

  React.useEffect(() => {
    fetchBoardsData(resolveFetchingBoards);
  }, [boardsReady, projectsReady]);

  React.useEffect(() => {
    fetchLanesData(resolveFetchingLanes);
  }, [lanesReady, boardsReady, selectedBoard]);

  React.useEffect(() => {
    fetchTicketsData(resolveFetchingTickets);
  }, [ticketsReady, lanesReady]);

  return (
    <>
      {boardsReady && projectsReady && (
        <LeftSidebar
          selectedProject={selectedProject}
          projectList={projectList}
          boards={boards}
          selectedBoard={selectedBoard}
          setSelectedItem={async (item) => {
            setSelectedProject(
              (projectList as Project[]).filter(function (i) {
                return i.value === item;
              })[0]
            );
            setBoardsReady(false);
          }}
          setSelectedBoard={(board: Board) => {
            setSelectedBoard(board);
            setActiveLanes(
              lanes.filter((item) => {
                return (board as Board)?.id === item.board;
              })
            );
            localStorage.setItem("activeBoard", board.id.toString());
            localStorage.setItem(
              "activeProject",
              selectedProject.id.toString()
            );
          }}
          createNewBoard={boardCreate}
        />
      )}
      {boardsReady && ticketsReady && lanesReady && (
        <LaneArea
          lanes={activeLanes}
          tickets={tickets}
          activeBoard={selectedBoard}
          selectTicket={selectTicket}
          updateTicket={ticketLaneUpdate}
          createNewTicket={ticketCreate}
          saveLane={laneSave}
          createNewLane={laneCreate}
        />
      )}
      {lanesReady && ticketsReady && (
        <RightSidebar
          selectedTicket={selectedTicket}
          lanes={lanes}
          saveTicket={ticketUpdate}
          deleteTicket={ticketDelete}
        />
      )}
    </>
  );
};

export default IndexPage;
