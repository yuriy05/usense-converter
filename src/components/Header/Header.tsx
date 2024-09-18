import styles from "./Header.module.css";
import React from "react";

type CurrencyRate = {
  rate: { [key: string]: number };
};

const Header: React.FC<CurrencyRate> = ({ rate }) => {
  return (
    <header>
      <h1 className={styles.title}>USENSE converter</h1>
      <p className={styles.text}>Курс валют</p>
      <div className={styles.currenciesContainer}>
        <div className={styles.currencies}>
          <p className={styles.text}>
            USD: {parseInt(String(1 / rate.USD))}{" "}
          </p>
          <p className={styles.text}>
            EUR: {parseInt(String(1 / rate.EUR))}{" "}
          </p>

          <p className={styles.text}>
            USD: {parseInt(String(1 / rate.USD))}{" "}
          </p>
          <p className={styles.text}>
            EUR: {parseInt(String(1 / rate.EUR))}{" "}
          </p>

          <p className={styles.text}>
            USD: {parseInt(String(1 / rate.USD))}{" "}
          </p>
          <p className={styles.text}>
            EUR: {parseInt(String(1 / rate.EUR))}{" "}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
