import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://nameless-cove-12440.herokuapp.com/",
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
