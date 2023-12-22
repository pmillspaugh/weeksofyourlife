import React from "react";
import debounce from "lodash.debounce";
import styles from "./week.module.css";
import Tooltip from "@/components/Tooltip";
import { useRouter, useSearchParams } from "next/navigation";

function formatDate(date: string, showYear?: boolean) {
  return new Date(date).toLocaleDateString("en-US", {
    year: showYear ? "numeric" : undefined,
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export interface IWeek {
  sunday: string;
  saturday: string;
  lifeEvent: string;
}

const MemoizedWeek = React.memo(function Week({ week }: { week: IWeek }) {
  const { sunday, saturday, lifeEvent: existingLifeEvent } = week;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [lifeEvent, setLifeEvent] = React.useState(existingLifeEvent);

  const handleUrlUpdate = debounce((newEvent: string) => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    const sundayKey = new Date(sunday).toISOString().split("T")[0];

    newEvent
      ? newParams.set(sundayKey, encodeURIComponent(newEvent))
      : newParams.delete(sundayKey);

    router.push(`?${newParams.toString()}`, { scroll: false });
  }, 100);

  function handleLifeEventChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newEvent = e.target.value;
    setLifeEvent(newEvent);
    handleUrlUpdate(newEvent);
  }

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${Math.max(1, lifeEvent.length + 2)}ch`;
    }
  }, [lifeEvent]);

  return (
    <Tooltip
      trigger={
        <input
          ref={inputRef}
          type="text"
          className={styles.week}
          value={lifeEvent}
          data-empty={!lifeEvent}
          onChange={handleLifeEventChange}
          maxLength={100}
        />
      }
    >
      <p className={styles.tooltip}>
        {formatDate(sunday)} to {formatDate(saturday, true)}
      </p>
    </Tooltip>
  );
});

export default MemoizedWeek;
