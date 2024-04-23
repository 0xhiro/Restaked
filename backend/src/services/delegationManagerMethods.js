const DelegationManager = require("../db/DelegationManager");
const { weiToEth, saveToMongoDB } = require("../utils/utils");
const { Web3 } = require("web3");
const web3 = new Web3("https://mainnet.infura.io/v3/32a39c105d1d49f395bcb2ce44014d1d");

async function checkEventsAtBlock(contract, eventName) {
  let fromBlock = 19612227;
  const toBlock = Number(await web3.eth.getBlockNumber());
  const batchSize = 500;

  console.log("Starting fetch from:", fromBlock, "to:", toBlock);

  let eventData = [];
  while (fromBlock <= toBlock) {
    const endBlock = Math.min(fromBlock + batchSize - 1, toBlock);
    try {
      let options = { fromBlock, toBlock: endBlock };
      console.log(
        `Fetching events for ${eventName} from block ${fromBlock} to ${endBlock}`
      );
      const events = await contract.getPastEvents(eventName, options);
      const blockCache = {};

      for (const event of events) {
        console.log(event.event)
        if (!blockCache[event.blockNumber]) {
          blockCache[event.blockNumber] = await web3.eth.getBlock(
            event.blockNumber
          );
        }
        const block = blockCache[event.blockNumber];

        if (
          [
            "OperatorSharesIncreased",
            "OperatorSharesDecreased",
            "OperatorMetadataURIUpdated",
          ].includes(event.event)
        ) {
          let dataPoint = {
            event: event.event,
            operator: event.returnValues.operator,
            block: Number(block.number),
            timestamp: Number(block.timestamp),
          };

          if (
            event.event === "OperatorSharesIncreased" ||
            event.event === "OperatorSharesDecreased"
          ) {
            const sharesInEth = weiToEth(event.returnValues.shares);
            dataPoint.shares = sharesInEth;
            dataPoint.staker = event.returnValues.staker;
            dataPoint.strategy = event.returnValues.strategy;
          } else if (event.event === "OperatorMetadataURIUpdated") {
            dataPoint.metadataURI = event.returnValues.metadataURI;
          }

          eventData.push(dataPoint);
        }
      }
    } catch (error) {
      console.error(
        `Error fetching '${eventName}' events from block ${fromBlock} to ${endBlock}:`,
        error
      );
    }
    fromBlock = endBlock + 1;
  }

  if (eventData.length > 0) {
    await saveToMongoDB(DelegationManager, eventData);
  }
}


module.exports = { checkEventsAtBlock };
