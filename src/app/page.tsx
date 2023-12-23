"use client";

import React from "react";
import { motion } from "framer-motion";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import styles from "./page.module.css";
import { useBirthdate, DECADE_LABELS } from "@/hooks/useBirthdate.hook";
import { useAccentColor } from "@/hooks/useAccentColor.hook";
import { useLoader } from "@/hooks/useLoader.hook";
import Loading from "@/components/Loading";
import Heading from "@/components/Heading";
import Instructions from "@/components/Instructions";
import PastWeek from "@/components/Week";
import FutureWeek from "@/components/Week/FutureWeek";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { birthdate: bday, accent } = searchParams;
  const { birthdate, handleBirthdateChange, decades } = useBirthdate(bday);
  const { accentColor, handleAccentColorChange } = useAccentColor(accent);

  const loading = useLoader();
  if (loading) return <Loading />;

  return (
    <TooltipProvider>
      <motion.main
        className={styles.main}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Heading Tag="h1" urlKey="title">
          Weeks of your life
        </Heading>

        <Instructions
          birthdate={birthdate}
          handleBirthdateChange={handleBirthdateChange}
          accentColor={accentColor}
          handleAccentColorChange={handleAccentColorChange}
        />

        {decades.map((decade, index) => (
          <React.Fragment key={DECADE_LABELS[index]}>
            <Heading Tag="h2" urlKey={`decade-${index}`}>
              {DECADE_LABELS[index]}
            </Heading>
            <section className={styles.decade}>
              {decade.map((week) =>
                new Date(week.sunday) < new Date() ? (
                  <PastWeek key={week.sunday} week={week} />
                ) : (
                  <FutureWeek key={week.sunday} week={week} />
                )
              )}
            </section>
          </React.Fragment>
        ))}
      </motion.main>
    </TooltipProvider>
  );
}
