import hre, { ethers } from "hardhat";
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config({ path: ".env" });

async function main() {
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  console.log("sleeping ..");

  await sleep(90000);

  console.log("done sleeping");

  // TODO: check this code for automatic verification of contract
  // CODE TO NOTE
  // Refer to : https://hardhat.org/plugins/nomiclabs-hardhat-etherscan
  await hre.run("verify:verify", {
    address: greeter.address,
    constructorArguments: ["Hello, George!"],
  });
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
