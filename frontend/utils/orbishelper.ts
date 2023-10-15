// @ts-ignore
import { randomSeed } from "@orbisclub/orbis-sdk/utils/index.js";
// @ts-ignore
import { Orbis } from "@orbisclub/orbis-sdk";


const orbis = new Orbis({});

const content = {
    "issuer": {
      "id": "did:key:z6MktJkCSfvgVJebRFpJoB55GkjAy6v4mNU5TCcidrEcBCtx",
      "name": "daoverse"
    },
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ],
    "issuanceDate": "1682314834",
    "credentialSubject": {
      "id": "did:key:z6MktJkCSfvgVJebRFpJoB5a5GkjAy6v4mNU5TCcidrEcBCtx",
      "name": "Mango DAO",
      "type": "dao-project",
      "network": "Solana",
      "protocol": "daoverse",
      "description": "Is part of a specific DAO"
    }
  }

  const tags = ["dao", "project", "solana"]
  const family = "orbis"
  const awaitIndex = false

export async function connectWithSeed() {
    /** Generate a new seed */
    // const seed = randomSeed();
    // console.log("seed",seed);

    const a = {}
    const seed = new Uint8Array(Object.values(a));
    const res = await orbis.connectWithSeed(seed);
    
    console.log("orbis did",res,seed);
}

export async function createTileDoc() {
    const a = {}
    const seed = new Uint8Array(Object.values(a));
    const resconnect = await orbis.connectWithSeed(seed);
    const res = await orbis.createTileDocument(content);
    console.log(resconnect,res,"orbos tile created")
}

export async function connectuser(){
    const res = await orbis.isConnected();
}

const ORBIS_CREDENTIAL = "dao-project"
const ORBIS_ISSUER = "mango dao"
const ORBIS_NAME= "daoverse"
const ORBIS_PROJECT_ID ="kjzl6cwe1jw145i0ycmmvk80ndfn1kgrqamcw6tpfcm8ph5xuaoqrs380r4m70d"

export async function createContext(name: string) {

    const a = {
        "0": 106,
        "1": 9,
        "2": 1,
        "3": 217,
        "4": 162,
        "5": 168,
        "6": 6,
        "7": 36,
        "8": 9,
        "9": 50,
        "10": 234,
        "11": 243,
        "12": 85,
        "13": 89,
        "14": 231,
        "15": 70,
        "16": 117,
        "17": 237,
        "18": 57,
        "19": 148,
        "20": 47,
        "21": 175,
        "22": 187,
        "23": 196,
        "24": 230,
        "25": 189,
        "26": 91,
        "27": 197,
        "28": 249,
        "29": 41,
        "30": 35,
        "31": 198
    }
    // const seed = new Uint8Array(Object.values(a));
    // const response = await orbis.connectWithSeed(seed);
    // console.log(response,"orbis did",seed);
    // const pk = new Uint8Array(JSON.parse(process.env.NEXT_PUBLIC_ORBIS_PRIVATE));
    // await orbis.connectWithSeed(pk);
    const res = await orbis.createContext({
        project_id: ORBIS_PROJECT_ID,
        name,
        websiteUrl: 'https://ethereum.org',
        accessRules: [
            // {
            //     type: 'credential',
            //     requiredCredentials: [
            //         {
            //             identifier: `${ORBIS_ISSUER}-${ORBIS_CREDENTIAL}-${sessionId}`,
            //         },
            //     ],
            // },
        ],
        context: "kjzl6cwe1jw14a01y9zyiwr6vbw7dib3jalr2sjpgbyfz79om0lejt0olo2qi9m"
    });
    console.log(res);
    return res;
}

export async function grantAccess(address: string, name: string, sessionId: number) {
    // @ts-ignore
    const pk = new Uint8Array(JSON.parse(process.env.NEXT_PUBLIC_ORBIS_PRIVATE));
    await orbis.connectWithSeed(pk);
    const { data } = await orbis.getCredentials('did:pkh:eip155:1:' + address);
    for (const i of data) {
        if (
            i.identifier == `${ORBIS_ISSUER}-${ORBIS_CREDENTIAL}-${sessionId}`
        ) {
            return true;
        }
    }
    const content = {
        issuer: {
            id: 'did:key:z6MkihuPGVB8wu3VmH69TvAffYZDHk7AmkDqw314FAtyb6JA',
            name: ORBIS_NAME,
        },
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        issuanceDate: '1685536158',
        credentialSubject: {
            id: 'did:pkh:eip155:1:' + address,
            name: ORBIS_NAME,
            type: `${ORBIS_CREDENTIAL}-${sessionId}`,
            network: 'EVM',
            protocol: ORBIS_ISSUER,
            description: `Has access to ${name}.`,
        },
    };
    const res = await orbis.createTileDocument(content);
    console.log(res);
    return true;
}

export async function getcontext(){
    
const { data, error } = await orbis.getContexts("kjzl6cwe1jw145i0ycmmvk80ndfn1kgrqamcw6tpfcm8ph5xuaoqrs380r4m70d");
console.log(data,"orbis context");
}