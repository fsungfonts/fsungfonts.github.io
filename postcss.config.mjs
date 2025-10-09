import fs from "fs";
import path from "path";
import { purgeCSSPlugin } from "@fullhuman/postcss-purgecss";

const statsFile = path.resolve(process.cwd(), "hugo_stats.json");

// Ensure the file exists before proceeding
if (!fs.existsSync(statsFile)) {
  throw new Error(`Missing hugo_stats.json at ${statsFile}. Did you run Hugo first?`);
}

const purgecss = purgeCSSPlugin({
  content: [statsFile],
  defaultExtractor: (content) => {
    let els;
    try {
      els = JSON.parse(content).htmlElements || {};
    } catch (err) {
      throw new Error(`Failed to parse hugo_stats.json: ${err.message}`);
    }
    return [
      ...(els.tags || []),
      ...(els.classes || []),
      ...(els.ids || []),
    ];
  },
  safelist: [
    // Add any dynamic classes you know Hugo/shortcodes/JS will generate
  ],
});

export default {
  plugins: [
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecss] : []),
  ],
};
