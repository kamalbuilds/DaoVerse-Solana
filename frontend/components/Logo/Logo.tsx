import clsx from "clsx";
import { ComponentProps } from "react";
import styles from "./Logo.module.css";

export function Logo({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={clsx(className, styles.logo)} {...props}>
      <img src="/white-logo.png" className="h-8" />
      <span className={styles.wordmark}>Solana DaoVerse</span>
    </div>
  );
}
