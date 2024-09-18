import styles from "./Converter.module.css";
import { useState, useReducer, useEffect } from "react";
import Header from "../Header/Header";
import CurrencyDropdown from "../CurrencyDropdown/CurrencyDropdown";

import UA from "../../assets/svg/UA.svg";
import US from "../../assets/svg/US.svg";
import EU from "../../assets/svg/EU.svg";

type State = {
  rate: { [key: string]: number };
  firstCurrency: string;
  amountFirstCurrency: number;
  secondCurrency: string;
  amountSecondCurrency: number;
};

type Action =
  | { type: "SET_RATE"; payload: { [key: string]: number } }
  | { type: "SET_FIRST_CURRENCY"; payload: string }
  | { type: "SET_AMOUNT_FIRST_CURRENCY"; payload: number }
  | { type: "SET_SECOND_CURRENCY"; payload: string }
  | { type: "SET_AMOUNT_SECOND_CURRENCY"; payload: number };

const initialState: State = {
  rate: { UAH: 0, USD: 0, EUR: 0 },
  firstCurrency: "UAH",
  amountFirstCurrency: 0,
  secondCurrency: "USD",
  amountSecondCurrency: 0,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_RATE":
      return {
        ...state,
        rate: action.payload,
      };
    case "SET_FIRST_CURRENCY":
      return {
        ...state,
        firstCurrency: action.payload,
        amountSecondCurrency:
          convertCurrency(
            state.amountFirstCurrency,
            action.payload,
            state.secondCurrency,
            state.rate,
          ) ?? 0,
      };
    case "SET_AMOUNT_FIRST_CURRENCY":
      return {
        ...state,
        amountFirstCurrency: action.payload,
        amountSecondCurrency:
          convertCurrency(
            action.payload,
            state.firstCurrency,
            state.secondCurrency,
            state.rate,
          ) ?? 0,
      };
    case "SET_SECOND_CURRENCY":
      return {
        ...state,
        secondCurrency: action.payload,
        amountFirstCurrency:
          convertCurrency(
            state.amountSecondCurrency,
            action.payload,
            state.firstCurrency,
            state.rate,
          ) ?? 0,
      };
    case "SET_AMOUNT_SECOND_CURRENCY":
      return {
        ...state,
        amountSecondCurrency: action.payload,
        amountFirstCurrency:
          convertCurrency(
            action.payload,
            state.secondCurrency,
            state.firstCurrency,
            state.rate,
          ) ?? 0,
      };
    default:
      throw new Error("Невідомий екшин, перевірте правильність написання");
  }
};

function convertCurrency(
  amount: number,
  from: string,
  to: string,
  rate: { [key: string]: number },
) {
  if (!rate[from] || !rate[to]) return;
  const amountInUAH = amount / rate[from];
  return amountInUAH * rate[to];
}

const Converter: React.FC = () => {
  const [
    {
      rate,
      firstCurrency,
      secondCurrency,
      amountFirstCurrency,
      amountSecondCurrency,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/UAH",
      );
      const data = await response.json();

      const adjustedRates = {
        UAH: 1,
        USD: data.rates.USD,
        EUR: data.rates.EUR,
      };

      dispatch({ type: "SET_RATE", payload: adjustedRates });
    };

    fetchRates();
  }, []);

  const currencyOptions = [
    { value: "UAH", flag: UA },
    { value: "USD", flag: US },
    { value: "EUR", flag: EU },
  ];

  return (
    <div className={styles.wrapper}>
      <Header rate={rate} />
      <div className={styles.inputsGroup}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={Number(amountFirstCurrency.toFixed(2))}
            className={styles.input}
            maxLength={7}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || !isNaN(Number(value))) {
                dispatch({
                  type: "SET_AMOUNT_FIRST_CURRENCY",
                  payload: value === "" ? 0 : +value,
                });
              }
            }}
          />
          <CurrencyDropdown
            value={firstCurrency}
            onChange={(currency) => {
              dispatch({ type: "SET_FIRST_CURRENCY", payload: currency });
              setOpenDropdown(null);
            }}
            options={currencyOptions}
            isOpen={openDropdown === "first"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "first" ? null : "first")
            }
          />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={Number(amountSecondCurrency.toFixed(2))}
            className={styles.input}
            maxLength={7}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || !isNaN(Number(value))) {
                dispatch({
                  type: "SET_AMOUNT_SECOND_CURRENCY",
                  payload: value === "" ? 0 : +value,
                });
              }
            }}
          />
          <CurrencyDropdown
            value={secondCurrency}
            onChange={(currency) => {
              dispatch({ type: "SET_SECOND_CURRENCY", payload: currency });
              setOpenDropdown(null); // Close dropdowns on change
            }}
            options={currencyOptions}
            isOpen={openDropdown === "second"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "second" ? null : "second")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Converter;
