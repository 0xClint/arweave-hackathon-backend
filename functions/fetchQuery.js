import axios from "axios";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false, // Disables SSL certificate validation
});

export async function fetchQuery(stateData) {
  let data;

  const address = JSON.stringify(
    stateData ? stateData.map((item) => item.address) : []
  );
  console.log(address);
  const endpoint = "https://arweave-search.goldsky.com/graphql";
  const query = `query {
    transactions( first:10,owners:${address})
  
    {
      edges {
        node {
          id
        block{
          id
          timestamp
        }
          recipient
          anchor
          fee{
            winston
            ar
          }
          owner {
             address

            }
        }
      }
    }
  }`;

  try {
    const response = await axios.post(
      endpoint,
      {
        query,
      },
      { httpsAgent: agent }
    );

    // console.log(response.data.data.transactions.edges);
    data = response.data.data.transactions.edges;

    return data ? data : [];
  } catch (error) {
    console.error("Error:", error);
  }
}
fetchQuery();
