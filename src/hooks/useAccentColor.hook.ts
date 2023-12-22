import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";

export function useAccentColor(accent: string | undefined) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [accentColor, setAccentColor] = React.useState(accent ?? "#ffb300");

  React.useEffect(() => {
    const accent = searchParams.get("accent");

    accent
      ? document.documentElement.style.setProperty(
          "--accent-color",
          decodeURIComponent(accent)
        )
      : setAccentColor(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--accent-color"
          )
        );
  }, [searchParams]);

  const handleAccentColorChange = debounce((newAccentColor: string) => {
    setAccentColor(newAccentColor);
    document.documentElement.style.setProperty(
      "--accent-color",
      newAccentColor
    );

    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set("accent", newAccentColor);
    router.push(`?${newParams.toString()}`, { scroll: false });
  }, 50);

  return { accentColor, handleAccentColorChange };
}
