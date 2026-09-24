import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://erickmakeablogastro.netlify.app/npx astro add preact",
  integrations: [preact()]
});