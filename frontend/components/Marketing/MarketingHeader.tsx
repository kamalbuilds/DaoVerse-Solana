import clsx from "clsx";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ComponentProps } from "react";
import { SignInIcon } from "../../icons";
import { Button } from "../../primitives/Button";
import { Container } from "../../primitives/Container";
import { Logo } from "../Logo";
import styles from "./MarketingHeader.module.css";
import dynamic from 'next/dynamic';

const WalletMultiButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), {
  ssr: false, // This line ensures the component is not rendered during server-side rendering
});
export function MarketingHeader({
  className,
  ...props
}: ComponentProps<"header">) {
  return (
    <header className={clsx(className, styles.header)} {...props}>
      <Container className={styles.container}>
        <Link href="/">
          <Logo />
        </Link>
        <WalletMultiButton />
      </Container>
    </header>
  );
}
