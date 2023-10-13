import { GetServerSideProps } from "next";
import { DASHBOARD_URL } from "../constants";
import { MarketingLayout } from "../layouts/Marketing";
import * as Server from "../lib/server";
import { Button} from "../primitives/Button";
import { Container } from "../primitives/Container";
import styles from "./index.module.css";
import { Input } from "../primitives/Input";
import { Popover } from "../primitives/Popover";
import { Toolbar } from "../components/TextEditor/Toolbar";
import { Tooltip } from "@radix-ui/react-tooltip";


export default function Index() {
  return (
    <MarketingLayout>
      <Container className={styles.section}>
        <div className={styles.heroInfo}>
        {/** Name */}
          <h1 className={styles.heroTitle}>
          Let's get started.
          </h1>
          <p className={styles.heroLead}>
          What is the name of your wallet? 
          It's best to choose a descriptive, memorable name for you and your members. 
          </p>
          <Input></Input>

        </div>

         {/** Invite members */}
    <div className={styles.heroInfo}></div>
         <h1 className={styles.heroTitle}>
          Next, invite members with their Solana Wallet Address.
          </h1>
          <p className={styles.heroLead}>
          Add Solana wallet addressses, separated by a comma or line-break.
          </p>
          <Input placeholder="9WzDXwBjf8iwHjdi..."></Input>

          {/** Approval threshold */}

          <div className={styles.heroInfo}></div>
         <h1 className={styles.heroTitle}>
        Next, set your wallet's approval threshold.
          </h1>
          <p className={styles.heroLead}>
          Adjust the percentage to determine votes needed to pass a proposal.
          </p>
          <Input placeholder="60"></Input>

        <div className={styles.heroActions}>
        </div>
      </Container>

      <Container>
        <Button icon={null} onClick={() => null}>
            Create DAO
          </Button>
        </Container>
    </MarketingLayout>
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
