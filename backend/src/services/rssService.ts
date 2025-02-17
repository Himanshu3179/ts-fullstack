// FILEPATH: /Users/apple/Desktop/company/cron-job/backend/src/services/rssService.ts

import axios from "axios";
import xml2js from "xml2js";
import { Feed } from "../models/Feed";
import { rssFeedUrls } from "../config/rssFeeds";

export const fetchAndStoreRSSFeeds = async () => {
  console.log(`[${new Date().toLocaleString()}] Starting RSS feed fetch...`);
  for (const url of rssFeedUrls) {
    console.log(`[${new Date().toLocaleString()}] Fetching data from: ${url}`);
    try {
      const response = await axios.get(url);
      const parser = new xml2js.Parser({ explicitArray: false });
      const jsonData = await parser.parseStringPromise(response.data as string);

      console.log(
        `[${new Date().toLocaleString()}] Parsing and normalizing data from: ${url}`
      );
      const items = jsonData.rss.channel.item || [];
      const normalizedItems = Array.isArray(items) ? items : [items];

      // Print the total count of fetched articles to the console
      console.log(
        `[${new Date().toLocaleString()}] Fetched ${
          normalizedItems.length
        } articles from ${url}`
      );

      for (const item of normalizedItems) {
        // Add or update the feed with the current fetched time
        await Feed.updateOne(
          { "guid._": item.guid._ }, // Match existing feed by unique GUID
          {
            $set: {
              title: item.title,
              link: item.link,
              description: item.description,
              pubDate: new Date(item.pubDate),
              category: item.category,
              customCategory: [],
              sourceUrl: url,
              fetchedAt: new Date(), // Update fetchedAt to the current time
            },
          },
          { upsert: true } // Insert new feed if it doesn't exist
        );
      }
      console.log(
        `[${new Date().toLocaleString()}] Successfully updated data from: ${url}`
      );
    } catch (error: any) {
      console.error(
        `[${new Date().toLocaleString()}] Error fetching data from ${url}:`,
        error.message
      );
    }
  }
  console.log(`[${new Date().toLocaleString()}] RSS feed fetch completed.`);
};
