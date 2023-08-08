import dotenv from "dotenv";
dotenv.config();

import cron from "node-cron";
import express from "express";
import { fetchState } from "./functions/fetchState.js";
import { fetchQuery } from "./functions/fetchQuery.js";
import { mailSender } from "./functions/mailSender.js";

const app = express();

//send email after 1 minute
// cron.schedule("*/10 * * * * *", function () {
//   main();
// });
function currentUnixTime() {
  return Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
}

const mergeArray = (arr1, arr2) => {
  return arr1.map((item) => {
    const matchingAddress = item.node.owner.address;
    const matchingEmail = arr2.find(
      (entry) => entry.address === matchingAddress
    )?.email;

    if (matchingEmail) {
      item.node.owner.email = matchingEmail;
    }
    return item;
  });
};

async function main() {
  let state, queryData;
  let currentTimestamp = currentUnixTime() - 600;
  console.log(process.env.CONTRACT_TX_ID);

  console.log("***********Getting UsersState from contract************");
  state = await fetchState();
  console.log("State: ", state);

  console.log("***********Fetching Data from Arweave************");
  queryData = await fetchQuery(state);
  // console.log("queryData: ", queryData);
  //   console.log("queryData: ", queryData[1].node.block.timestamp);

  let sortedArray = queryData
    ? queryData.filter((item) => {
        console.log(item);
        console.log(item.node.block.timestamp, currentTimestamp);
        if (item.node.block.timestamp >= currentTimestamp) {
          return item;
        }
      })
    : [];
  console.log("sortedArray", sortedArray);
  //   console.log(mergeArray(sortedArray, state)[2]);
  await mailSender(mergeArray(sortedArray, state));
  console.log("***********************END********************");
}
main();

// const port = 4000; // Change this to the desired port number
// app.listen(port, () => {
//   console.log(`Application listening on port ${port}`);
// });
