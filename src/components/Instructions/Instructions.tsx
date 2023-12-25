import React from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import styles from "./instructions.module.css";

const DFW_URL =
  "https://www.weeksofyour.life/?birthdate=1962-02-21&accent=%230daf18&title=Weeks%2520of%2520David%2520Foster%2520Wallace%27s%2520life&2008-09-07=Died%2520in%2520Claremont%252C%2520California%2520%25F0%259F%2592%2594&1987-01-04=Published%2520first%2520novel%253A%2520The%2520Broom%2520of%2520the%2520System&1996-01-28=Published%2520Infinite%2520Jest&2005-05-15=Delivered%2520commencement%2520address%2520at%2520Kenyon%2520College%253A%2520This%2520is%2520Water&1962-02-18=Born%2520in%2520Ithaca%252C%2520New%2520York&2011-04-10=Unfinished%2520novel%252C%2520The%2520Pale%2520King%252C%2520published%2520posthumously&2004-12-26=Got%2520married%2520to%2520Karen%2520Green&decade-4=40s%2520%25E2%2580%2594%2520Final%2520years&decade-0=Early%2520years%2520in%2520Illinois&2004-08-01=Published%2520essay%253A%2520Consider%2520the%2520Lobster&1989-07-30=Published%2520short%2520stories%2520collection%253A%2520Girl%2520with%2520Curious%2520Hair&1999-05-23=Published%2520short%2520stories%2520collection%253A%2520Brief%2520Interviews%2520with%2520Hideous%2520Men&2004-06-06=Published%2520short%2520stories%2520collection%253A%2520Oblivion&1991-12-01=Published%2520essay%253A%2520Derivative%2520Sport%2520in%2520Tornado%2520Alley&1993-08-01=Published%2520essay%253A%2520Getting%2520Away%2520from%2520Already%2520Being%2520Pretty%2520Much%2520Away%2520from%2520It%2520All&decade-3=30s&1995-12-31=Published%2520essay%253A%2520A%2520Supposedly%2520Fun%2520Thing%2520I%27ll%2520Never%2520Do%2520Again&2001-04-01=Published%2520essay%253A%2520Authority%2520and%2520American%2520Usage&2006-08-20=Published%2520essay%253A%2520Roger%2520Federer%2520as%2520Religious%2520Experience&1980-08-24=Started%2520at%2520Amherst%2520College&1985-05-19=Graduated%2520from%2520Amherst%2520college&1997-06-29=Received%2520MacArthur%2520Grant&decade-1=Tennis%2520teen%2520%25F0%259F%258E%25BE&1962-07-29=Family%2520moved%2520to%2520Champaign-Urbana%252C%2520Illinois%2520for%2520his%2520father%27s%2520job%2520as%2520a%2520philosophy%2520professor&1987-05-24=Completed%2520Masters%2520at%2520University%2520of%2520Arizona&1989-10-29=Spent%2520four%2520weeks%2520at%2520psychiatric%2520institute%2520for%2520drug%2520and%2520alcohol%2520detoxification%2520program&1991-08-18=Began%2520teaching%2520literature%2520at%2520Emerson%2520College&1992-08-23=Began%2520teaching%2520at%2520Illinois%2520State%2520University&2002-08-25=Started%2520teaching%2520Creative%2520Writing%2520and%2520English%2520at%2520Pomona%2520College&1976-05-30=Ranked%2520%252317%2520player%2520in%2520junior%2520tennis%2520USTA%2520Western%2520Section%2520%28IL%252C%2520IN%252C%2520OH%252C%2520MI%252C%2520WI%252C%2520WV%29&decade-2=20s%2520%25F0%259F%2593%259A";

const Instructions = ({
  birthdate,
  handleBirthdateChange,
  accentColor,
  handleAccentColorChange,
}: {
  birthdate: string;
  handleBirthdateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accentColor: string;
  handleAccentColorChange: (newAccentColor: string) => void;
}) => {
  const [bday, setBday] = React.useState(birthdate);
  const [showInstructions, setShowInstructions] = React.useState(false);

  return (
    <>
      <p className={styles.subtitle}>
        <sup>*</sup>
        <em>
          Inspired by Tim Urban&apos;s{" "}
          <a
            href="https://waitbutwhy.com/2014/05/life-weeks.html"
            target="_blank"
          >
            Your Life in Weeks
          </a>{" "}
          and Buster Benson&apos;s{" "}
          <a href="https://busterbenson.com/life-in-weeks" target="_blank">
            Life in Weeks
          </a>
          .
        </em>
      </p>

      <menu className={styles.controls}>
        <label>
          <VisuallyHidden.Root>Select your birthdate</VisuallyHidden.Root>
          <input
            type="date"
            value={bday}
            onChange={(e) => setBday(e.target.value)}
            onBlur={handleBirthdateChange}
          />
        </label>

        <label>
          <VisuallyHidden.Root>Select an color</VisuallyHidden.Root>
          <input
            type="color"
            className={styles.colorPicker}
            value={accentColor}
            onChange={(e) => handleAccentColorChange(e.target.value)}
          />
        </label>

        <button
          className={styles.button}
          onClick={() => setShowInstructions(!showInstructions)}
        >
          {showInstructions ? "Hide" : "Show"} instructions
        </button>

        <button
          className={styles.button}
          onClick={() => window.location.assign("/")}
        >
          Reset
        </button>
      </menu>

      {showInstructions && (
        <>
          <ol className={styles.instructions}>
            <li className={styles.step}>
              Select your birthdate. Once you click or tab outside of the date
              picker, the grid of weeks will update.
            </li>
            <li className={styles.step}>Select an accent color (optional).</li>
            <li className={styles.step}>
              Each box is a week of your life, grouped by decade. Hover over any
              week to see its dates.
            </li>
            <li className={styles.step}>
              Click any week to add a life event.{" "}
              <a href={DFW_URL} target="_blank">
                Here&apos;s an example for David Foster Wallace&apos;s life.
              </a>
            </li>
            <li className={styles.step}>
              Click on any decade title (e.g. &quot;Early years&quot;) to edit
              its label. The heading atop this page is editable, too.
            </li>
          </ol>
          <p className={styles.note}>
            <em>
              Everything you write is saved in the URL. So if you accidentally
              click the reset button or close the browser tab, you can hit the
              back button or visit history to restore your progress.
            </em>
          </p>
        </>
      )}
    </>
  );
};

export default Instructions;
