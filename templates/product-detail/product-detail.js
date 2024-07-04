import { getProductResponse } from "../../scripts/search.js";

export default async function buildAutoBlocks() {
    console.log(await getProductResponse());
}
