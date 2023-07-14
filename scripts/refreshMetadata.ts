import NftContractProviders from "../lib/NftContractProvider";
import CollectionConfig from "../config/CollectionConfig";
import fetch from "node-fetch";

async function main() {
  const contract = await NftContractProviders.getContract();
  const totalToken = Number(await contract.totalSupply());
  const options = {
    method: 'POST',
    headers: {accept: 'application/json', 'X-API-KEY': `${process.env.OPENSEA_API_KEY}`}
  };

  for (let i = 1; i <= totalToken; i++) {
    fetch(`https://api.opensea.io/v2/chain/ethereum/contract/${CollectionConfig.contractAddress}/nfts/${i}/refresh`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
