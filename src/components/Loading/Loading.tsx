import { motion } from "framer-motion";
import styles from "./loading.module.css";

const Loading = () => {
  const blocks = Array.from({ length: 61 }).fill("") as string[];
  blocks.splice(15, 0, "Weeks");
  blocks.splice(30, 0, "of");
  blocks.splice(35, 0, "your");
  blocks.splice(49, 0, "life");

  const variants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.025,
        duration: 0.3,
      },
    }),
    hidden: (i: number) => ({
      opacity: 0,
      y: -100,
      transition: {
        delay: i * 0.025,
        duration: 0.3,
      },
    }),
  };

  return (
    <main className={styles.main}>
      <div className={styles.loader}>
        {blocks.map((block, i) => (
          <motion.span
            key={i}
            className={block ? styles.word : styles.block}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            {block}
          </motion.span>
        ))}
      </div>
    </main>
  );
};

export default Loading;
