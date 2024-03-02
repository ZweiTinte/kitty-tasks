import * as React from "react";
import { Board, Lane, Ticket } from "../../models/models";

const LaneArea = ({
  activeBoard,
  tickets,
  lanes,
  updateTicket,
  selectTicket,
  createNewTicket,
  saveLane,
  createNewLane,
}: {
  activeBoard: Board;
  tickets: Ticket[];
  lanes: Lane[];
  updateTicket: (ticketId: string, laneId: string) => void;
  selectTicket: (ticket: Ticket) => void;
  createNewTicket: (laneId: number) => void;
  saveLane: (lane: Lane) => void;
  createNewLane: (boardId: number) => void;
}) => {
  function drop(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    const ticketId = ev.dataTransfer?.getData("id");
    if (!ticketId) {
      return;
    }
    const ticket = document.getElementById(ticketId);
    const laneId = (ev.target as HTMLDivElement)?.id;
    if (ticket && laneId) {
      (ev.target as HTMLDivElement).appendChild(ticket);
      updateTicket(ticketId.replace("ticket", ""), laneId);
    }
  }

  function allowDrop(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  function drag(ev: React.DragEvent<HTMLDivElement>) {
    ev.dataTransfer?.setData("id", (ev.target as HTMLDivElement)?.id);
  }

  return (
    <div className="laneArea">
      {lanes.map((lane) => {
        return (
          <div
            className="lane"
            key={lane.id}
            id={lane.id.toString()}
            onDrop={(e) => drop(e)}
            onDragOver={(e) => allowDrop(e)}
          >
            <div className="flex">
              <input
                type="text"
                defaultValue={lane.name}
                className="laneTitle"
                onBlur={(e) =>
                  saveLane({
                    id: lane.id,
                    board: lane.board,
                    name: e.target.value,
                  })
                }
              />
              <input
                type="button"
                className="newButton"
                value="+"
                title="New Ticket"
                onClick={() => createNewTicket(lane.id)}
              />
            </div>
            {(tickets as Ticket[])
              .filter((ticket) => {
                return ticket.lane === lane.id;
              })
              .map((ticket) => {
                return (
                  <div
                    className="ticket"
                    key={ticket.id}
                    id={"ticket" + ticket.id.toString()}
                    onClick={() => selectTicket(ticket)}
                    draggable
                    onDragStart={(e) => drag(e)}
                  >
                    {ticket.name}
                  </div>
                );
              })}
          </div>
        );
      })}
      <div className="newLaneSection">
        <input
          type="button"
          className="newLaneButton"
          value="+"
          title="New Lane"
          onClick={() => createNewLane(activeBoard.id)}
        />
      </div>
      <div className="laneAreaBlocker"></div>
    </div>
  );
};

export default LaneArea;
