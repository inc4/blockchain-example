async function main() {
  // We get the contract to deploy
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();

  console.log("Greeter deployed to:", counter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
