import { CronJob } from "cron";
import { fetchAndStoreRSSFeeds } from "../services/rssService";

const interval = "0 */30 * * * *";

const job = new CronJob(interval, () => {
  console.log(`[${new Date().toLocaleString()}] Running scheduled cron job...`);
  fetchAndStoreRSSFeeds();
});

export const startCronJob = async () => {
  console.log(`[${new Date().toLocaleString()}] Starting cron job...`);
  await fetchAndStoreRSSFeeds(); // Run the job immediately
  job.start(); // Schedule the recurring job
  console.log(
    `[${new Date().toLocaleString()}] Cron job scheduled to run every 30 minutes.`
  );
};
