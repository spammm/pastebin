'use client';
import React, { useState, useEffect, useCallback, useRef, useId } from 'react';
import clsx from 'clsx';
import styles from './SelectBox.module.scss';

interface SelectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; name: string }[];
}

const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  options,
  className,
  id,
  ...props
}) => {
  const uniqueId = useId();
  const [filter, setFilter] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const optionsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setHighlightedIndex(0);
  };

  const handleOptionClick = (value: string) => {
    if (props.onChange) {
      const event = {
        target: { value, name: props.name },
        currentTarget: { value },
      } as React.ChangeEvent<HTMLSelectElement>;
      props.onChange(event);
    }
    setFilter('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prevIndex) =>
            Math.min(prevIndex + 1, filteredOptions.length - 1)
          );
          optionsRefs.current[highlightedIndex + 1]?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
          optionsRefs.current[highlightedIndex - 1]?.focus();
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen && filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex].value);
        } else {
          setIsOpen(true);
        }
        break;
      default:
        break;
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node;
    if (!document.getElementById('dropdown-list')?.contains(target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      className={clsx(styles.selectWrapper, className)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-haspopup="listbox"
      aria-labelledby={id || `${uniqueId}-label`}
    >
      {label && (
        <label
          htmlFor={id || uniqueId}
          className={styles.label}
          id={`${uniqueId}-label`}
        >
          {label}
        </label>
      )}
      <div
        className={styles.customSelect}
        onClick={() => !props.disabled && setIsOpen(!isOpen)}
        role="combobox"
        aria-controls="dropdown-list"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={id || `${uniqueId}-label`}
      >
        <div
          className={clsx(styles.selected, {
            [styles.disabled]: props.disabled,
          })}
        >
          {filteredOptions.find((option) => option.value === props.value)
            ?.name || 'Select an option'}
        </div>
        {isOpen && !props.disabled && (
          <div className={styles.dropdown} id="dropdown-list" role="listbox">
            <input
              type="text"
              id={id || uniqueId}
              className={styles.searchInput}
              value={filter}
              onChange={handleFilterChange}
              placeholder="Search..."
              onClick={(e) => e.stopPropagation()}
              role="searchbox"
              aria-label="Search options"
            />
            <div className={styles.options}>
              {filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  className={clsx(styles.option, {
                    [styles.highlighted]: index === highlightedIndex,
                  })}
                  onClick={() => handleOptionClick(option.value)}
                  role="option"
                  aria-selected={option.value === props.value}
                  tabIndex={-1}
                  ref={(el) => {
                    optionsRefs.current[index] = el;
                  }}
                >
                  {option.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectBox;
