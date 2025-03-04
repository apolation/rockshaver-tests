require('dotenv').config()

const { configurePlugin } = require('cypress-mongodb');

module.exports = {
  projectId: "qc7qrn",
  env: {
    mongodb: {
      uri: process.env.MONGO_URI,
      database: process.env.DATABASE
    },
    baseApi: process.env.API_URL
  },
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
    },
    baseUrl: process.env.WEB_URL,
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true
  },
};
