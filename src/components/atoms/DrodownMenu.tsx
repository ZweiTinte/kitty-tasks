import * as React from "react";
import { Board } from "../../models/models";
import { DropdownItem } from "../../types/dropdownTypes";

const DropdownMenu = ({
  dropdownItem,
  dropdownData,
  selectedItem,
  setSelectedItem,
}: {
  dropdownItem: string;
  dropdownData: DropdownItem[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}) => {
  const [open, setOpen] = React.useState(false);

  const [dropdownStyle, setDropdownStyle] = React.useState(
    `colLayout dropdownBorder `
  );
  const [spacerStyle, setSpacerStyle] = React.useState(``);

  function handleFocusOut() {
    setOpen(false);
  }

  function selectItem(item: string) {
    setSelectedItem(
      (dropdownData as Board[]).filter(function (i) {
        return i.value === item;
      })[0].value
    );
    setOpenState(false);
  }

  function setOpenState(openState: boolean) {
    setOpen(openState);
    setDropdownStyle(`colLayout dropdownBorder ${openState ? "priority" : ""}`);
    setSpacerStyle(`${openState ? "dropdownSpacer" : ""}`);
  }

  return (
    <>
      <div className={dropdownStyle} onBlur={handleFocusOut} tabIndex={0}>
        <div className="dropdown" onClick={() => setOpenState(!open)}>
          {selectedItem || dropdownItem}
        </div>
        {open && (
          <>
            {dropdownData.map((item: DropdownItem) => {
              return (
                <div
                  className="dropdown"
                  key={item.id}
                  onClick={() => selectItem(item.value)}
                >
                  {item.value}
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className={spacerStyle}></div>
    </>
  );
};

export default DropdownMenu;
