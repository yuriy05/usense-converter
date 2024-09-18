import styles from "./CurrencyDropDown.module.css";

type Option = {
  value: string;
  flag: string;
};

type CurrencyDropdownProps = {
  value: string;
  onChange: (option: string) => void;
  options: Option[];
  isOpen: boolean;
  onToggle: () => void;
};

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  value,
  onChange,
  options,
  isOpen,
  onToggle,
}) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.selected} onClick={onToggle}>
        {value}{" "}
        <img
          src={options.find((opt) => opt.value === value)?.flag}
          alt={`${value} flag`}
        />
        <span
          className={`${styles.arrow} ${isOpen ? styles.up : styles.down}`}
        />
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.dropdownItem}
              onClick={() => {
                onChange(option.value);
                onToggle();
              }}
            >
              {option.value}{" "}
              <img src={option.flag} alt={`${option.value} flag`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;
