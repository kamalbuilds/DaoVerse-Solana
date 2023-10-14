import { randomSeed } from "@orbisclub/orbis-sdk/utils/index.js"
import { Orbis } from "@orbisclub/orbis-sdk";

const orbis = new Orbis({});

export async function connectWithSeed() {
    /** Generate a new seed */
    const seed = randomSeed();
    const res = await orbis.connectWithSeed(seed)
    
    console.log("orbis did",res);
}