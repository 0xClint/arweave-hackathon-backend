import axios from "axios";
import https from 'https'

const agent = new https.Agent({
  rejectUnauthorized: false // Disables SSL certificate validation
});

async function getData() {
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
getData();
