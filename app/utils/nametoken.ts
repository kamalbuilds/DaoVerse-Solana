// @ts-nocheck
import * as mpl from "@metaplex-foundation/mpl-token-metadata";
import * as web3 from "@solana/web3.js";
import * as anchor from '@project-serum/anchor';
import { Keypair } from "@solana/web3.js";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

const INITIALIZE = true;

export async function nametoken( name : string , symbol : string , uri : string , sellerFeeBasisPoints : number){
    console.log("let's name some tokens!");
    const myKeypair = Keypair.fromSecretKey(bs58.decode(process.env.NEXT_PUBLIC_SECRET_KEY));
    const mint = new web3.PublicKey("Dz5rcnmA9zy6dAbDvnadBHxn9vbXqM1bEKt2xekcoQ6t");
    const seed1 = Buffer.from(anchor.utils.bytes.utf8.encode("metadata"));
    const seed2 = Buffer.from(mpl.PROGRAM_ID.toBytes());
    const seed3 = Buffer.from(mint.toBytes());
    const [metadataPDA, _bump] = web3.PublicKey.findProgramAddressSync([seed1, seed2, seed3], mpl.PROGRAM_ID);
    const accounts = {
        metadata: metadataPDA,
        mint,
        mintAuthority: myKeypair.publicKey,
        payer: myKeypair.publicKey,
        updateAuthority: myKeypair.publicKey,
    }

    const dataV2 = {
        name,
        symbol,
        uri,
        // we don't need that
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
    }

    // const dataV2 = {
    //     name: "KamalS TOken",
    //     symbol: "KAM",
    //     uri: "https://gist.github.com/kamalbuilds/4e6987d961276e6ba29de83f13e91166",
    //     // we don't need that
    //     sellerFeeBasisPoints: 0,
    //     creators: null,
    //     collection: null,
    //     uses: null
    // }

    let ix;
    if (INITIALIZE) {
        const args : mpl.CreateMetadataAccountV3InstructionArgs =  {
            createMetadataAccountArgsV3: {
                data: dataV2,
                isMutable: true,
                collectionDetails: null
            }
        };
        ix = mpl.createCreateMetadataAccountV3Instruction(accounts, args);
    } else {
        const args =  {
            updateMetadataAccountArgsV2: {
                data: dataV2,
                isMutable: true,
                updateAuthority: myKeypair.publicKey,
                primarySaleHappened: true
            }
        };
        ix = mpl.createUpdateMetadataAccountV2Instruction(accounts, args)
    }
    const tx = new web3.Transaction();
    tx.add(ix);
    const connection = new web3.Connection("https://api.devnet.solana.com");
    const txid = await web3.sendAndConfirmTransaction(connection, tx, [myKeypair]);
    console.log(txid);

}