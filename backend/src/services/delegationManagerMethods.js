require('dotenv').config({path: '../../.env'});
const DelegationManager = require('../db/DelegationManager');
const { weiToEth, saveToMongoDB } = require('../utils/utils');
const { Web3 } = require('web3');
const web3 = new Web3(process.env.RPC_URL);

async function getLastProcessedBlock() {
    try {
        const lastEvent = await DelegationManager.findOne().sort({ block: -1 }).exec();
        return lastEvent ? lastEvent.block : null; // default to this block if the database is empty
    } catch (error) {
        console.error("Error retrieving last processed block:", error);
        return null; // return a default block in case of an error
    }
}


async function checkEventsAtBlock(contract, eventName) {
    let fromBlock = await getLastProcessedBlock() + 1;
    const toBlock = Number(await web3.eth.getBlockNumber());
    const batchSize = 5000;

    console.log("Starting fetch from:", fromBlock, "to:", toBlock);

    let eventData = [];
    while (fromBlock <= toBlock) {
        const endBlock = Math.min(fromBlock + batchSize - 1, toBlock);
        try {
            let options = { fromBlock, toBlock: endBlock };
            console.log(`Fetching events for ${eventName} from block ${fromBlock} to ${endBlock}`);
            const events = await contract.getPastEvents(eventName, options);
            const blockCache = {}; 

            for (const event of events) {
                if (!blockCache[event.blockNumber]) {
                    blockCache[event.blockNumber] = await web3.eth.getBlock(event.blockNumber);
                }
                const block = blockCache[event.blockNumber];

                if (['OperatorSharesIncreased', 'OperatorSharesDecreased', 'OperatorMetadataURIUpdated'].includes(event.event)) {
                    console.log(event.event)
                    let dataPoint = {
                        event: event.event,
                        operator: event.returnValues.operator,
                        block: Number(block.number),
                        timestamp: Number(block.timestamp)
                    };

                    if (event.event === 'OperatorSharesIncreased' || event.event === 'OperatorSharesDecreased') {
                        const sharesInEth = weiToEth(event.returnValues.shares);
                        dataPoint.shares = sharesInEth;
                        dataPoint.staker = event.returnValues.staker;
                        dataPoint.strategy = event.returnValues.strategy;
                    } else if (event.event === 'OperatorMetadataURIUpdated') {
                        dataPoint.metadataURI = event.returnValues.metadataURI;
                    }

                    eventData.push(dataPoint);
                }
            }
        } catch (error) {
            console.error(`Error fetching '${eventName}' events from block ${fromBlock} to ${endBlock}:`, error);
        }
        fromBlock = endBlock + 1;
    }

    if (eventData.length > 0) {
        await saveToMongoDB(DelegationManager, eventData);
    }
}

module.exports = { checkEventsAtBlock };