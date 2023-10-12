import * as multisig from "@sqds/multisig";
import { connection } from "../pages/api/utils/constants";
import { PublicKey } from "@solana/web3.js";

const {
    Multisig
} = multisig.accounts;


export async function retrieveMultisig( createKey : string ) {

    const createkeypk = new PublicKey(createKey);

    const [multisigPda] = multisig.getMultisigPda({
        createKey: createkeypk,
    });

    const multisigAccount = await Multisig.fromAccountAddress(
        connection,
        multisigPda
    );
    // Log out the multisig's members
    console.log("Members", multisigAccount.members);

}