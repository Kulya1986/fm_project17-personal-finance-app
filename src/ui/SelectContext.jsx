import { createContext, use, useState } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const CustomSelect = styled.div`
  /* margin-top: 3rem; */
  position: relative;
  display: inline-block;
  width: 300px;
  max-width: 100%;
  color: var(--color-grey-900);
`;

const StyledSelectControl = styled.button`
  font-size: var(--text-preset-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--spacing-150) var(--spacing-250);
  border: 1px solid var(--color-beige-500);
  border-radius: var(--spacing-100);
  background-color: var(--color-white);
  cursor: pointer;

  &:hover,
  :focus,
  :active {
    outline: 1px solid var(--color-grey-500);
    outline-offset: -1px;
  }
`;

const StyledSelectDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border-radius: var(--spacing-100);
  background-color: var(--color-white);
  list-style: none;
  padding: var(--spacing-150) var(--spacing-250);
  margin: var(--spacing-200) 0 0;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
  max-height: 300px;
  overflow-y: auto;
  transition: all ease-out 0.3s;

  &.hidden {
    display: none;
  }
`;

const StyledSelectOption = styled.li`
  padding: var(--spacing-150) 0;
  font-size: var(--text-preset-4);
  cursor: pointer;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.selected {
    font-weight: bold;
  }

  &.used {
    color: var(--color-grey-500);
    cursor: not-allowed;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
  &:hover,
  :focus {
    font-weight: bold;
  }
`;

const Arrow = styled.img`
  transition: transform ease-in-out 0.3s;

  &.up {
    transform: rotateX(180deg);
  }
`;

const ColorIcon = styled.div`
  border-radius: 50%;
  border: none;
  background-color: var(${(props) => props.color});
  margin-right: var(--spacing-150);
  opacity: ${(props) => (props.used ? 1 : 0.1)};
`;

const Used = styled.span`
  font-size: var(--text-preset-5);
`;

const SelectContext = createContext();

function SelectProvider({ children }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const close = () => setShowDropdown(false);
  const open = () => setShowDropdown(true);

  return (
    <SelectContext value={{ showDropdown, close, open }}>
      {children}
    </SelectContext>
  );
}

function SelectControl({ value }) {
  const { open, showDropdown } = use(SelectContext);
  return (
    <StyledSelectControl onClick={open}>
      <span className="selected-value">{value}</span>
      <Arrow
        className={showDropdown ? "up" : ""}
        src="https://ficcbcjzijeblkixdjqt.supabase.co/storage/v1/object/public/icons//icon-caret-down.svg"
        alt={showDropdown ? "close dropdown" : "open dropdown"}
      />
    </StyledSelectControl>
  );
}

function SelectDropdown({ children }) {
  const { showDropdown } = use(SelectContext);
  const ref = useOutsideClick(close, false);

  return (
    <StyledSelectDropdown ref={ref} className={showDropdown ? "" : "hidden"}>
      {children}
    </StyledSelectDropdown>
  );
}

function SelectOption({
  option,
  prefix,
  used = false,
  selected = false,
  children,
  onOptionClick,
}) {
  const { close } = use(SelectContext);

  function handleSelectOptionClick(value) {
    onOptionClick?.(value);
    close();
  }

  return (
    <StyledSelectOption
      // key={option}
      className={
        selected && prefix !== "color" ? "selected" : used ? "used" : ""
      }
      onClick={() => handleSelectOptionClick(option)}
    >
      {option}
    </StyledSelectOption>
    // <StyledSelectOption
    //   // key={option}
    //   className={
    //     selected && prefix !== "color" ? "selected" : used ? "used" : ""
    //   }
    //   onClick={() => handleSelectOptionClick(option)}
    // >
    //   <div>
    //     {prefix === "color" && (
    //       <ColorIcon color={`--color-${option}`} used={used}></ColorIcon>
    //     )}
    //     {children}
    //   </div>
    //   {prefix === "color" && (
    //     <div>
    //       {selected && (
    //         <img
    //           src="https://ficcbcjzijeblkixdjqt.supabase.co/storage/v1/object/public/icons//icon-selected.svg"
    //           alt="selected option"
    //         />
    //       )}
    //       {used && <Used>Already used</Used>}
    //     </div>
    //   )}
    // </StyledSelectOption>
  );
}

SelectProvider.CustomSelect = CustomSelect;
SelectProvider.SelectControl = SelectControl;
SelectProvider.SelectDropdown = SelectDropdown;
SelectProvider.SelectOption = SelectOption;

export default SelectProvider;
