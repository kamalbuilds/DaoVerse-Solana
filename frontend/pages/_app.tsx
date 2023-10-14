
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
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

import { Orbis, OrbisProvider } from "@orbisclub/components";
import "@orbisclub/components/dist/index.modern.css";
import React, { useEffect, useState } from "react";
// import { GlobalContext } from "../contexts/GlobalContext";

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  const endpoint = clusterApiUrl("devnet");
  const phantomWallet = new PhantomWalletAdapter();

  /**
   * Set the global forum context here (you can create categories using the dashboard by clicking on "Create a sub-context"
   * from your main forum context)
   */
  // @ts-ignore
  global.orbis_context  ="kjzl6cwe1jw14a01y9zyiwr6vbw7dib3jalr2sjpgbyfz79om0lejt0olo2qi9m";
  /**
   * Set the global chat context here (the chat displayed when users click on the "Community Chat" button).
   * The Community Chat button will be displayed only if this variable is set
   */

  const [score, setScore] = useState(null);
  let orbis = new Orbis({
    useLit: false,
    node: "https://node2.orbis.club",
    PINATA_GATEWAY: "https://orbis.mypinata.cloud/ipfs/",
    PINATA_API_KEY: process.env.NEXT_PUBLIC_PINATA_API_KEY,
    PINATA_SECRET_API_KEY: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
  });

  return (
    <>
      <Head>
        <title>Solana DaoVerse</title>
        <link href="/favicon.svg" rel="icon" type="image/svg" />
      </Head>
      <TooltipProvider>
        <SessionProvider session={pageProps.session}>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[phantomWallet]}>
              <WalletModalProvider>
                <OrbisProvider
                  defaultOrbis={orbis}
                  authMethods={[
                    "metamask",
                    "wallet-connect",
                    "email",
                    "phantom",
                  ]}
                >
                    <Component {...pageProps} />
                </OrbisProvider>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
          <Badge />
        </SessionProvider>
      </TooltipProvider>
    </>
  );
}
