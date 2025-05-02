import { useRef, useState } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { removeHyphen } from "../utils/helpers";

const StyledSelect = styled.div`
  /* margin-top: 3rem; */
  position: relative;
  display: inline-block;
  width: ${(props) => props.$selectwidth};
  max-width: 100%;
  color: var(--color-grey-900);
`;

const SelectButton = styled.button`
  font-size: var(--text-preset-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
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

const SelectDropdown = styled.ul`
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
  z-index: 2;

  &.hidden {
    display: none;
  }
`;

const DropdownOption = styled.li`
  padding: var(--spacing-150) 0;
  font-size: var(--text-preset-4);
  cursor: pointer;
  /* text-transform: capitalize; */
  border-bottom: 1px solid var(--color-grey-100);
  /* font-weight: ${(props) => (props.all ? "bold" : "normal")}; */

  &.color {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &.selected {
    font-weight: bold;
  }

  &.used {
    color: var(--color-grey-500);
    cursor: not-allowed;
    pointer-events: none;
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
  width: var(--spacing-200);
  height: var(--spacing-200);
  display: inline-block;
  border-radius: 50%;
  border: none;
  background-color: var(${(props) => props.color});
  margin-right: var(--spacing-150);
  opacity: ${(props) => (props.used === "true" ? 0.1 : 1)};
`;

const Used = styled.span`
  font-size: var(--text-preset-5);
  text-transform: none;
`;

const Color = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
`;

function Select({
  options,
  value,
  onChange,
  selectwidth,
  color = false,
  used = [],
  ...props
}) {
  const [showDropdown, setShowDropDown] = useState(false);

  const close = () => setShowDropDown(false);
  const ref = useOutsideClick(close, false);

  function handleOptionSelect(value) {
    onChange(value);
    setShowDropDown(false);
  }

  return (
    <StyledSelect ref={ref} {...props} $selectwidth={selectwidth}>
      <SelectButton
        onClick={() => setShowDropDown((curr) => !curr)}
        role="combobox"
        aria-label="select button"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="select-dropdown"
      >
        {color ? (
          <Color>
            <ColorIcon color={`--color-${value}`} />
            <span className="selected-value">{removeHyphen(value)}</span>
          </Color>
        ) : (
          <span className="selected-value">{value}</span>
        )}

        <Arrow
          className={showDropdown ? "up" : ""}
          src="https://ficcbcjzijeblkixdjqt.supabase.co/storage/v1/object/public/icons//icon-caret-down.svg"
          alt={showDropdown ? "close dropdown" : "open dropdown"}
        />
      </SelectButton>
      <SelectDropdown
        className={showDropdown ? "" : "hidden"}
        role="listbox"
        id="select-dropdown"
        aria-labelledby="dropdown-button"
      >
        {/* {allOption && <DropdownOption all>All Transactions</DropdownOption>} */}
        {!color &&
          options.map((option) => (
            <DropdownOption
              key={option}
              className={option === value ? "selected" : ""}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </DropdownOption>
          ))}
        {color &&
          options.map((option) => (
            <DropdownOption
              key={option}
              className={used.includes(option) ? "used color" : "color"}
              onClick={() => handleOptionSelect(option)}
            >
              <Color>
                <ColorIcon
                  color={`--color-${option}`}
                  $used={used.includes(option).toString()}
                ></ColorIcon>
                <span>{removeHyphen(option)}</span>
              </Color>

              <div>
                {option === value && (
                  <img
                    src="https://ficcbcjzijeblkixdjqt.supabase.co/storage/v1/object/public/icons//icon-selected.svg"
                    alt="selected option"
                  />
                )}
                {used.includes(option) && <Used>Already used</Used>}
              </div>
            </DropdownOption>
          ))}
      </SelectDropdown>
    </StyledSelect>
  );
}

export default Select;
