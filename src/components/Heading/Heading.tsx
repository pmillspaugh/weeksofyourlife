import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./heading.module.css";

const Heading = ({
  children,
  Tag,
  urlKey,
}: {
  children: string;
  Tag: "h1" | "h2";
  urlKey: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [heading, setHeading] = React.useState<string>(children);

  React.useEffect(() => {
    const savedHeading = searchParams.get(urlKey);
    if (savedHeading) {
      setHeading(decodeURIComponent(savedHeading));
      document.title = decodeURIComponent(savedHeading);
    }
  }, [searchParams, urlKey]);

  function saveHeading(e: React.FocusEvent<HTMLHeadingElement>) {
    const newHeading = e.target.innerText;
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set(urlKey, encodeURIComponent(newHeading));
    router.push(`?${newParams.toString()}`);
  }

  return (
    <Tag
      className={Tag === "h1" ? styles.h1 : styles.h2}
      contentEditable={true}
      onBlur={(e) => saveHeading(e)}
    >
      {heading}
    </Tag>
  );
};

export default Heading;
