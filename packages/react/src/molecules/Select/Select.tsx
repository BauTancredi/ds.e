import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEventHandler,
  createRef,
} from "react";

import Text from "../../atoms/Text";

const KEY_CODES = {
  ENTER: "Enter",
  SPACE: "Space",
  DOWN_ARROW: "ArrowDown",
  UP_ARROW: "ArrowUp",
  ESC: "Escape",
};
interface SelectOption {
  label: string;
  value: string;
}

interface RenderOptionProps {
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps: Object) => Object;
}

interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
  label?: string;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

const getPreviousOptionIndex = (
  currentIndex: number | null,
  options: Array<SelectOption>
) => {
  if (currentIndex === null) return 0;

  if (currentIndex === 0) return options.length - 1;

  return currentIndex - 1;
};

const getNextOptionIndex = (
  currentIndex: number | null,
  options: Array<SelectOption>
) => {
  if (currentIndex === null) return 0;

  if (currentIndex === options.length - 1) return 0;

  return currentIndex + 1;
};

const Select: React.FC<SelectProps> = ({
  options = [],
  label = "Please select an option ...",
  onOptionSelected: handler,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<null | number>(null);
  const labelRef = useRef<HTMLButtonElement>(null);
  const [optionRefs, setOptionRefs] = useState<
    React.RefObject<HTMLLIElement>[]
  >([]);
  const [overlayTop, setOverlayTop] = useState<number>(0);

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    if (handler) handler(option, optionIndex);

    setSelectedIndex(optionIndex);
    setIsOpen(false);
  };

  const onLabelClicked = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);

  let selectedOption = null;

  if (selectedIndex !== null) selectedOption = options[selectedIndex];

  const highlightOption = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex);
  };

  const onButtonKeyDown: KeyboardEventHandler = (e) => {
    e.preventDefault();

    if (
      [KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(e.code)
    ) {
      setIsOpen(true);

      highlightOption(0);
    }
  };

  useEffect(() => {
    setOptionRefs(options.map((_) => createRef<HTMLLIElement>()));
  }, [options.length]);

  useEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      const ref = optionRefs[highlightedIndex];

      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen, highlightedIndex]);

  const onOptionKeyDown: KeyboardEventHandler = (e) => {
    if (e.code === KEY_CODES.ESC) {
      setIsOpen(false);
      return;
    }

    if (e.code === KEY_CODES.DOWN_ARROW) {
      highlightOption(getNextOptionIndex(highlightedIndex, options));
    }

    if (e.code === KEY_CODES.UP_ARROW) {
      highlightOption(getPreviousOptionIndex(highlightedIndex, options));
    }

    if (e.code === KEY_CODES.ENTER) {
      onOptionSelected(options[highlightedIndex!], highlightedIndex!);
    }
  };

  return (
    <div className="dse-select">
      <button
        aria-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        aria-controls="ds-select-list"
        ref={labelRef}
        className="dse-select__label"
        onClick={() => onLabelClicked()}
        onKeyDown={onButtonKeyDown}
        data-testid="DseSelectButton"
      >
        <Text>{selectedIndex === null ? label : selectedOption?.label}</Text>
        <svg
          className={`dse-select__caret ${
            isOpen ? "dse-select__caret--open" : "dse-select__caret--closed"
          }`}
          width="1rem"
          height="1rem"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {
        <ul
          role="menu"
          id="ds-select-list"
          style={{ top: overlayTop }}
          className={`dse-select__overlay ${
            isOpen ? "dse-select__overlay--open" : ""
          }`}
        >
          {options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isHighlighted = highlightedIndex === optionIndex;

            const ref = optionRefs[optionIndex];

            const renderOptionProps = {
              ref,
              option,
              isSelected,
              getOptionRecommendedProps: (overrideProps = {}) => {
                return {
                  ref,
                  role: "menuitemradio",
                  "aria-label": option.label,
                  "aria-checked": isSelected ? true : undefined,
                  onKeyDown: onOptionKeyDown,
                  tabIndex: isHighlighted ? -1 : 0,
                  onMouseEnter: () => highlightOption(optionIndex),
                  onMouseLeave: () => highlightOption(null),
                  className: `dse-select__option 
                  ${isSelected ? "dse-select__option--selected" : ""}
                  ${isHighlighted ? "dse-select__option--highlighted" : ""}
                  }`,
                  key: option.value,
                  onClick: () => onOptionSelected(option, optionIndex),
                  ...overrideProps,
                };
              },
            };

            if (renderOption) {
              return renderOption(renderOptionProps);
            }

            return (
              <li {...renderOptionProps.getOptionRecommendedProps()}>
                <Text>{option.label}</Text>
                {isSelected ? (
                  <svg
                    width="1rem"
                    height="1rem"
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : null}
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
};

export default Select;
