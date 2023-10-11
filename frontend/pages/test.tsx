// @ts-nocheck
import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { createTokenMint } from "../utils/minttoken";

async function lo(){
  const createtok = await createTokenMint();
  console.log(createtok,"cere")
  // mintTokens(createtok,"ApHZ4DtDyVPYP84XnPgTHpYTqEg5o67UmNF9jfU3iX7" )
}
lo();
// mintTokens();

export default function Home() {
  const [messageAccount, _] = useState(Keypair.generate());
  const [message, setMessage] = useState("");
  const [messageAuthor, setMessageAuthor] = useState("");
  const [messageTime, setMessageTime] = useState(0);
  const [inputtedMessage, setInputtedMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const wallet = useAnchorWallet();

  return (
    <div>
      <div >{<WalletMultiButton />}</div>

      <div >
        <h1>
          Hello Solana ✨
        </h1>

        {wallet && (
          <div>
            <input
              placeholder="Write Your Message!"
              onChange={(e) => setInputtedMessage(e.target.value)}
              value={inputtedMessage}
            />
            <button
              disabled={!inputtedMessage}
              onClick={async () => {
                setLoading(true);
                const deployedMessage = message
                  ? await updateMessage(inputtedMessage, wallet, messageAccount)
                  : await createMessage(
                      inputtedMessage,
                      wallet,
                      messageAccount
                    );

                if (deployedMessage) {
                  setMessage(deployedMessage.content.toString());
                  setMessageAuthor(deployedMessage.author.toString());
                  setMessageTime(deployedMessage.timestamp.toNumber() * 1000);
                  setInputtedMessage("");
                }
                setLoading(false);
              }}
            >
              {message ? "Update the Message!" : "Create a Message!"}
            </button>
          </div>
        )}

        {loading ? (
          <div >
            <h2> Loading</h2>
            <div />
          </div>
        ) : (
          wallet &&
          message && (
            <div>
              <h2>Current Message: {message}</h2>
              <h2>
                Message Author: {messageAuthor.substring(0, 4)}
                ...
                {messageAuthor.slice(-4)}
              </h2>
              <h2>Time Published: {new Date(messageTime).toLocaleString()}</h2>
            </div>
          )
        )}
      </div>
    </div>
  );
}
