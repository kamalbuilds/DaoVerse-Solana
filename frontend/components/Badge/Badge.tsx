import clsx from "clsx";
import { ComponentProps } from "react";
import styles from "./Badge.module.css";

export function Badge({
  className,
  ...props
}: Omit<ComponentProps<"a">, "href">) {
  return (
    <a
      className={clsx(className, styles.badge)}
      href="https://v4.squads.so/"
      rel="noreferrer"
      target="_blank"
      {...props}
    >
      <picture>
        <source
          srcSet="https://avatars.githubusercontent.com/u/84348534?s=45&v=4"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="https://avatars.githubusercontent.com/u/84348534?s=45&v=4"
          alt="Made with Squadsv4"
          className={styles.image}
        />
      </picture>
    </a>
  );
}
