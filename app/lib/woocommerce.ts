import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Basic Auth setup for Pantheon
const USERNAME = "aviji646"; 
const APP_PASSWORD = "8Eqp fSio etIJ KAoc qIpR SOL6";
const authHeader = Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64');

export const api = new (WooCommerceRestApi as any)({
  url: "https://dev-mesy.pantheonsite.io",
  consumerKey: "ck_9304120bd6878947f779772c8e03d522eb450ad9",
  consumerSecret: "cs_08ae962d4f00a7bc2793ed847965f6f3a764bc73",
  version: "wc/v3",
  queryStringAuth: true,
  axiosConfig: {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${authHeader}`
    }
  }
});