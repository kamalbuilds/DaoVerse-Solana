import { TooltipProvider } from "@radix-ui/react-tooltip";
import { AppProps } from "next/app";
import Head from "next/head";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Badge } from "../components/Badge";
import "../styles/globals.css";
import "../styles/text-editor.css";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {  clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {

  const endpoint = clusterApiUrl("devnet");
  const phantomWallet = new PhantomWalletAdapter();
  return (
    <>
      <Head>
        <title>Starter Kit</title>
        <link href="/favicon.svg" rel="icon" type="image/svg" />
      </Head>
      <TooltipProvider>
        <SessionProvider session={pageProps.session}>
        <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[phantomWallet]}>
        <WalletModalProvider>
          <Component {...pageProps} />
          </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
          <Badge />
        </SessionProvider>
      </TooltipProvider>
    </>
  );
}
