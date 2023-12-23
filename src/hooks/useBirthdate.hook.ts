import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IWeek } from "@/components/Week";

export function useBirthdate(bday: string | undefined) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [birthdate, setBirthdate] = React.useState(bday ?? "1997-04-04");

  function handleBirthdateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newBday = event.target.value;
    setBirthdate(newBday);

    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set("birthdate", newBday);
    router.push(`?${newParams.toString()}`, { scroll: false });
  }

  const decades = React.useMemo(() => {
    const tenDecades = [];
    const birthdateUTC = new Date(`${birthdate}T00:00:00Z`);
    let birthday = new Date(birthdateUTC);

    for (let decade = 0; decade < 10; decade++) {
      const decadeStart = new Date(birthdateUTC);
      decadeStart.setUTCFullYear(decadeStart.getUTCFullYear() + decade * 10);
      const decadeEnd = new Date(decadeStart);
      decadeEnd.setUTCFullYear(decadeEnd.getUTCFullYear() + 10);

      const sundayBeforeDecadeStart = new Date(decadeStart);
      sundayBeforeDecadeStart.setUTCDate(
        decadeStart.getUTCDate() - decadeStart.getUTCDay()
      );

      const decadeWeeks: IWeek[] = [];
      let sunday = new Date(sundayBeforeDecadeStart);
      let saturday = new Date(sunday);
      saturday.setUTCDate(saturday.getUTCDate() + 6);

      while (saturday < decadeEnd) {
        const isBdayWeek = birthday >= sunday && birthday <= saturday;
        const year = birthday.getUTCFullYear();
        const birthdayEvent = isBdayWeek
          ? `${year - birthdateUTC.getUTCFullYear()} in ${year}`
          : "";

        if (isBdayWeek) birthday.setUTCFullYear(year + 1);

        const weekKey = new Date(sunday).toISOString().split("T")[0];
        const weekEvent = searchParams.get(weekKey);
        const lifeEvent = weekEvent
          ? decodeURIComponent(weekEvent)
          : birthdayEvent;

        decadeWeeks.push({
          sunday: sunday.toUTCString(),
          saturday: saturday.toUTCString(),
          lifeEvent,
        });

        sunday.setUTCDate(sunday.getUTCDate() + 7);
        saturday.setUTCDate(saturday.getUTCDate() + 7);
      }

      tenDecades.push(decadeWeeks);
    }

    return tenDecades;
  }, [birthdate, searchParams]);

  return { birthdate, handleBirthdateChange, decades };
}

export const DECADE_LABELS = [
  "Early years",
  "Teens",
  "20s",
  "30s",
  "40s",
  "50s",
  "60s",
  "70s",
  "80s",
  "90s",
];
