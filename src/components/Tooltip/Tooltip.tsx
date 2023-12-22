import * as RadixTooltip from "@radix-ui/react-tooltip";
import styles from "./tooltip.module.css";

const Tooltip = ({
  trigger,
  children,
}: {
  trigger: JSX.Element;
  children: JSX.Element;
}) => {
  return (
    <RadixTooltip.Root delayDuration={100}>
      <RadixTooltip.Trigger asChild>{trigger}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content className={styles.content}>
          <RadixTooltip.Arrow />
          {children}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
};

export default Tooltip;
