import * as React from "react";
import { Lane, Ticket } from "../../models/models";

const RightSidebar = ({
  selectedTicket,
  saveTicket,
  deleteTicket,
  lanes,
}: {
  selectedTicket: Ticket;
  saveTicket: (ticket: Ticket) => void;
  deleteTicket: (id: number) => void;
  lanes: Lane[];
}) => {
  function getLaneName(): string {
    return (
      lanes.filter((lane) => {
        return lane.id === (selectedTicket as Ticket)?.lane;
      })[0]?.name ?? ""
    );
  }

  return (
    <div className="rightSidebar">
      <div className="flex">
        <input
          type="text"
          key={selectedTicket?.id ?? 1}
          defaultValue={selectedTicket?.name}
          className="ticketTitle"
          onBlur={(e) => {
            saveTicket({
              id: selectedTicket.id,
              name: e.target.value,
              description: selectedTicket.description,
              lane: selectedTicket.lane,
            });
          }}
        />
        <button
          className="deleteButton"
          onClick={() => deleteTicket(selectedTicket.id)}
          title="Delete Ticket"
        >
          x
        </button>
      </div>
      <textarea
        defaultValue={selectedTicket?.description}
        key={selectedTicket?.id ?? 1}
        className="ticketDescription"
        onBlur={(e) => {
          saveTicket({
            id: selectedTicket.id,
            name: selectedTicket.name,
            description: e.target.value,
            lane: selectedTicket.lane,
          });
        }}
      ></textarea>
      <div className="ticketLane">
        <span>Lane:</span>
        <span>{getLaneName()}</span>
      </div>
    </div>
  );
};

export default RightSidebar;
