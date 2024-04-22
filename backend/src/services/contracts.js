require("dotenv").config({ path: "../../.env" });
const { Web3 } = require("web3");
const web3 = new Web3(process.env.RPC_URL);
const { strategyManagerAbi } = require("../utils/abi/strategyManagerAbi");
const { delegationManagerAbi } = require("../utils/abi/DelegationManagerABI");
const { AVSDirectoryABI } = require("../utils/abi/AVSDirectoryABI");

const strategyManagerAddress = "0x858646372CC42E1A627fcE94aa7A7033e7CF075A";
const strategyManager = new web3.eth.Contract(
  strategyManagerAbi,
  strategyManagerAddress
);

const delegationManagerProxyAddress =
  "0x39053D51B77DC0d36036Fc1fCc8Cb819df8Ef37A";
const delegationManager = new web3.eth.Contract(
  delegationManagerAbi,
  delegationManagerProxyAddress
);

const additionalContractsInfo = [
  {
    abi: strategyManagerAbi,
    address: "0x54945180dB7943c0ed0FEE7EdaB2Bd24620256bc",
    name: "cbEth",
  },
  {
    abi: strategyManagerAbi,
    address: "0x93c4b944D05dfe6df7645A86cd2206016c51564D",
    name: "stEth",
  },
  {
    abi: strategyManagerAbi,
    address: "0x1BeE69b7dFFfA4E2d53C2a2Df135C388AD25dCD2",
    name: "rEth",
  },
  {
    abi: strategyManagerAbi,
    address: "0x9d7eD45EE2E8FC5482fa2428f15C971e6369011d",
    name: "ethx",
  },
  {
    abi: strategyManagerAbi,
    address: "0x13760F50a9d7377e4F20CB8CF9e4c26586c658ff",
    name: "ankrEth",
  },
  {
    abi: strategyManagerAbi,
    address: "0xa4C637e0F704745D182e4D38cAb7E7485321d059",
    name: "oeth",
  },
  {
    abi: strategyManagerAbi,
    address: "0x57ba429517c3473B6d34CA9aCd56c0e735b94c02",
    name: "osEth",
  },
  {
    abi: strategyManagerAbi,
    address: "0x0Fe4F44beE93503346A3Ac9EE5A26b130a5796d6",
    name: "swEth",
  },
  {
    abi: strategyManagerAbi,
    address: "0x7CA911E83dabf90C90dD3De5411a10F1A6112184",
    name: "wBeth",
  },
  {
    abi: strategyManagerAbi,
    address: "0x8CA7A5d6f3acd3A7A8bC468a8CD0FB14B6BD28b6",
    name: "sfrxEth",
  },
  {
    abi: strategyManagerAbi,
    address: "0xAe60d8180437b5C34bB956822ac2710972584473",
    name: "lsEth",
  },
  {
    abi: strategyManagerAbi,
    address: "0x298aFB19A105D59E74658C4C334Ff360BadE6dd2",
    name: "mEth",
  },
];

const avsContractList = [
  {
    abi: AVSDirectoryABI,
    address: "0x135DDa560e946695d6f155dACaFC6f1F25C1F5AF",
    name: "altLayer",
  },
  {
    abi: AVSDirectoryABI,
    address: "0x135DDa560e946695d6f155dACaFC6f1F25C1F5AF",
    name: "altLayer",
  },
];

const additionalContracts = additionalContractsInfo.reduce(
  (acc, { abi, address, name }) => {
    acc[name] = new web3.eth.Contract(abi, address);
    return acc;
  },
  {}
);

module.exports = {
  strategyManager,
  delegationManager,
  ...additionalContracts,
};
