// Setup global site URI
let site_uri = process.env.PROD_SITE_URI;

// Check if server is in "dev" or "prod" mode
if(process.env.STATE === "development"){
  site_uri = process.env.SITE_URI;
}

module.exports = {
  port: process.env.PORT || 8000,
  mongoUri: process.env.MONGO_URI,
  siteUri: site_uri
};