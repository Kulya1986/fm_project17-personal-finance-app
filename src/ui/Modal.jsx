import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { PiXCircle } from "react-icons/pi";
import Heading from "./Heading";

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-250);
  width: 560px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-white);
  border-radius: var(--spacing-150);
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.05);
  padding: var(--spacing-400);
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  color: var(--color-grey-900);
`;

const Button = styled.button`
  border: none;
  background: none;

  & svg {
    width: var(--spacing-400);
    height: var(--spacing-400);
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}
function Window({ children, name, heading }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Header>
          <Heading as="h1">{heading}</Heading>
          <Button onClick={close}>
            <PiXCircle />
          </Button>
        </Header>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
