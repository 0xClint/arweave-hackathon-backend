// const express = require("express");
// const nodeMailer = require("nodemailer");
// const cron = require("node-cron");
import cron from "node-cron"
import express from "express";
import nodeMailer from "nodemailer"
import { readContractState } from 'arweavekit/contract';
import axios from "axios";
import https from 'https'


const app = express();


//send email after 1 minute
cron.schedule("*/10 * * * * *", function () {
    main()
});


async function main() {
    console.log("***********Getting UsersState from contract************")
    await getState()
    console.log("***********Fetching Data from Arweave************")
    await fetchDb();

}

async function fetchDb() {
    const agent = new https.Agent({
        rejectUnauthorized: false // Disables SSL certificate validation
    });
    const endpoint = "https://arweave.net/graphql";
    const query = `query {
  transactions
  {
    edges {
      node {
        id  
        owner {
           address
           key
          }
        data {
          size
          type
            }
        tags {
          name
          value
        }
      }
    }
  }
}`;

    try {
        const response = await axios.post(endpoint, {
            query,
        }, { httpsAgent: agent });

        console.log("Data:", response.data.data);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getState() {
    const { readContract } = await readContractState({ environment: "testnet", contractTxId: "keDV7TiAfFf7o1EoACUpZpaAn3HFPx9Z5pq7qugHw3U" });
    console.log(readContract.cachedValue.state)

}

async function mailService() {

    console.log("running a task every 5 seconds");
    // Async function enables allows handling of promises with await

    // First, define send settings by creating a new transporter:
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: "arweavenotifier@gmail.com",
            pass: "itvxhycjmjursncj",

        },
    });

    // Define and send message inside transporter.sendEmail() and await info about send from promise:
    let info = {
        from: 'arweavenotifier@gmail.com',
        to: "omkardarde9@gmail.com",
        subject: "Testing, testing, 123",
        text: "Hello testing"
    };

    // transporter.sendMail(info, (err, result) => {
    //     if (err) {
    //         console.log("Error in sending Mail", err);
    //     }
    //     else {
    //         console.log("Mail sent successfully", info);
    //     }
    // })
}

const port = 4000; // Change this to the desired port number
app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
});
