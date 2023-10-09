import clsx from "clsx";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { ComponentProps, ReactNode } from "react";
import { DASHBOARD_URL } from "../constants";
import { SignInIcon } from "../icons";
import * as Server from "../lib/server";
import { Button, LinkButton } from "../primitives/Button";
import { Container } from "../primitives/Container";
import styles from "../styles/index.module.css";
import { Popover } from "../primitives/Popover";
import { connectWithSeed } from "../utils/orbishelper";

interface FeatureProps extends Omit<ComponentProps<"div">, "title"> {
  description: ReactNode;
  title: ReactNode;
}

function Feature({ title, description, className, ...props }: FeatureProps) {
  return (
    <div className={clsx(className, styles.featuresFeature)} {...props}>
      <h4 className={styles.featuresFeatureTitle}>{title}</h4>
      <p className={styles.featuresFeatureDescription}>{description}</p>
    </div>
  );
}

export default function Index() {

  return (
    <>
      <Container className={styles.section}>
        <div className={styles.heroInfo}>
          <h1 className={styles.heroTitle}>
            Kickstart your DAO&nbsp;in minutes
          </h1>
          <p className={styles.heroLead}>
            A DAO Tooling solution on Solana aiming to simplify DAO Management and Governance.
          </p>
        </div>
        <div className={styles.heroActions}>
          <Button icon={<SignInIcon />} onClick={() => signIn()}>
            Dashboard
          </Button>
          <LinkButton
            href="/forum"
            variant="secondary"
          >
            Check Forum
          </LinkButton>
          <LinkButton
            href="/createdao"
            variant="secondary"
          >
            Create DAO
          </LinkButton>
        </div>
      </Container>
      <Container className={styles.section}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <div className={styles.featuresGrid}>
          <Feature
            description={
              <>
                Easily setup and manage your DAO management and voting on the Solana blockchain,
              </>
            }
            title="DAO Management"
          />
          <Feature
            description={
              <>
                An encrypted forum called Orbis for secure discussions and
                collaboration among DAO participants. This platform ensures that the
                best ideas rise to the top.
              </>
            }
            title="Encrypted Forum (Orbis)"
          />
          <Feature
            description={
              <>
                Utilizes OpenBook v2 for creating market-making vaults, enhancing
                liquidity and efficiency while enabling DAO members to earn rewards
                from the multisig vault created by Squads v4.
              </>
            }
            title="Market-Making Vaults"
          />
          <Feature
            description={
              <>
                Built on Squads Protocol's foundational technology, providing
                secure DAO Voting and Treasury Management on Solana.
              </>
            }
            title="Squads Protocol Integration"
          />
          <Feature
            description={
              <>
                Leverages OpenBook v2 programs to turn vaults into market-making vaults, enhancing liquidity and efficiency while enabling DAO members to earn rewards from the multisig vault created by Squads v4.
              </>
            }
            title="OpenBook V2 Integration "
          />
          <Feature
            description={
              <>
                Features multi-signature functionality,
                spending limits, sub-accounts, time locks, and more.
              </>
            }
            title="Amazing Features 💫"
          />
        </div>
      </Container>

      </>
  );
}

// If logged in, redirect to dashboard
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await Server.getServerSession(req, res);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: DASHBOARD_URL,
      },
    };
  }

  return {
    props: {},
  };
};
