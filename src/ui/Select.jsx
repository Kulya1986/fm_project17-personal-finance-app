import { useRef, useState } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { removeHyphen } from "../utils/helpers";

const StyledSelect = styled.div`
  /* margin-top: 3rem; */
  position: relative;
  display: flex;
  height: 45px;
  color: var(--color-grey-900);

  &:disabled {
    opacity: 0.8;
    pointer-events: none;
  }
`;

const SelectButton = styled.button`
  font-size: var(--text-preset-4);
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-200);
  height: 45px;

  align-items: center;
  text-transform: capitalize;
  padding: var(--spacing-150) var(--spacing-250);
  border: 1px solid var(--color-beige-500);
  border-radius: var(--spacing-100);
  background-color: var(--color-white);

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
  max-height: 270px;
  overflow-y: auto;
  transition: all ease-out 0.3s;
  z-index: 10;

  &.hidden {
    display: none;
  }
`;

const DropdownOption = styled.li`
  padding: var(--spacing-150) 0;
  font-size: var(--text-preset-4);
  cursor: pointer;
  border-bottom: 1px solid var(--color-grey-100);

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

const Arrow = styled.div`
  transition: transform ease-in-out 0.3s;
  width: 16px;
  height: 16px;
  max-width: 16px;

  & img {
    width: 100%;
    height: 100%;
  }

  & img.up {
    transform: rotateX(180deg);
  }
`;

const ColorIcon = styled.div`
  max-width: var(--spacing-200);
  width: var(--spacing-200);
  height: var(--spacing-200);
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

const OptionName = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  text-align: left;
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

  const close = (e) => {
    setShowDropDown(false);
  };
  const ref = useOutsideClick(close, false);

  function handleOptionSelect(value) {
    onChange(value);
    setShowDropDown(false);
  }

  function dropdownToggle(e) {
    e.preventDefault();
    setShowDropDown((curr) => !curr);
  }

  return (
    <StyledSelect ref={ref} {...props}>
      <SelectButton
        onClick={(e) => dropdownToggle(e)}
        role="combobox"
        aria-label="select-button"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="select-dropdown"
      >
        <OptionName>
          {color ? (
            <>
              <ColorIcon color={`--color-${value}`} />
              <span className="selected-value">{removeHyphen(value)}</span>
            </>
          ) : (
            <span className="selected-value">{value}</span>
          )}
        </OptionName>
        <Arrow style={{ textAlign: "right" }}>
          <img
            className={showDropdown ? "up" : ""}
            src="https://ficcbcjzijeblkixdjqt.supabase.co/storage/v1/object/public/icons//icon-caret-down.svg"
            alt={showDropdown ? "close dropdown" : "open dropdown"}
          />
        </Arrow>
      </SelectButton>
      <SelectDropdown
        className={showDropdown ? "" : "hidden"}
        role="listbox"
        id="select-dropdown"
        aria-labelledby="select-button"
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
              <OptionName>
                <ColorIcon
                  color={`--color-${option}`}
                  $used={used.includes(option).toString()}
                ></ColorIcon>
                <span>{removeHyphen(option)}</span>
              </OptionName>

              <div style={{ textAlign: "right" }}>
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
