import NftContractProvider from "../lib/NftContractProvider";

async function main() {
    // attach to deploy contract
    const contract = await NftContractProvider.getContract();

    // Disable whitelist sale (if needed)
    if ((await contract.feature(1)).isOpen) {
      console.log('Disabling freemint...');

      await contract.toggleMintPhase(1, false);
  }
    
    console.log("Free mint has been disabled!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});