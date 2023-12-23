import React from "react";

/*
  The main component in page.tsx takes a second or two to mount,
  and the lag from birthdays filling in (e.g. "1 in 1998") is janky.
  This hook is here to show the animated loader for a few seconds.
*/

export function useLoader() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return loading;
}
