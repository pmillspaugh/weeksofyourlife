import React from "react";
import { IWeek } from ".";
import styles from "./futureWeek.module.css";

const FutureWeek = ({ week }: { week: IWeek }) => {
  return <div className={styles.futureWeek}>{week.lifeEvent}</div>;
};

export default FutureWeek;
