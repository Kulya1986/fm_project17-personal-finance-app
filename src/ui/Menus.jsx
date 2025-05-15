import { createContext, useContext, useState } from "react";
import Button from "./Button";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

const Menu = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;

const StyledList = styled.ul`
  position: absolute;
  z-index: 5;
  background-color: var(--color-white);
  padding: 0px var(--spacing-250);
  border-radius: var(--spacing-100);

  top: ${(props) => props.$position.y};
  right: ${(props) => props.$position.x};

  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
`;

const StyledListItem = styled.li`
  border-bottom: 1px solid var(--color-grey-100);
  color: var(--color-grey-900);
  padding: var(--spacing-150) 0px;

  &:last-child {
    border-bottom: none;
    color: var(--color-red);
  }
`;

const StyledItem = styled.button`
  width: max-content;
  text-align: left;
  background: none;
  border: none;

  font-size: var(--text-preset-4);
  line-height: 1.5;
  transition: all 0.2s;

  display: flex;
  align-items: center;

  &:focus {
    outline: none;
  }
`;

const MenusContext = createContext(null);

function Menus({ children }) {
  const [shownId, setShownId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setShownId("");
  const open = setShownId;

  return (
    <MenusContext.Provider
      value={{ shownId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { shownId, open, close, setPosition } = useContext(MenusContext);

  function handleToggleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      y: `${Math.floor(rect.height) + 16}px`,
      x: "0px",
    });

    // shownId === ""?open(id):shownId===id?close():

    if (shownId === "" || shownId !== id) {
      open(id);
    } else close();
  }

  return (
    <Button $variation="context" onClick={(e) => handleToggleClick(e)}>
      <PiDotsThreeOutlineFill />
    </Button>
  );
}

function List({ id, children }) {
  const { close, shownId, position } = useContext(MenusContext);
  const ref = useOutsideClick(close);

  if (shownId !== id) return null;
  return (
    <StyledList ref={ref} $position={position}>
      {children}
    </StyledList>
  );
}

function Item({ children, onClick, isDelete }) {
  const { close } = useContext(MenusContext);

  function handleItemClick() {
    onClick?.();
    close();
  }

  return (
    <StyledListItem $isDelete={isDelete}>
      <StyledItem onClick={handleItemClick}>{children}</StyledItem>
    </StyledListItem>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Item = Item;

export default Menus;
