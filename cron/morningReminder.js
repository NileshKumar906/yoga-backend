const cron = require("node-cron");

const User = require("../models/user.model");
const admin = require("../config/firebase");

// Runs every day at 6:00 AM India Time
cron.schedule(
  "0 6 * * *",
  async () => {

    console.log("================================");
    console.log("Running Morning Reminder Cron");
    console.log("Time:", new Date());
    console.log("================================");

    try {

      const users = await User.find({
        fcmToken: {
          $exists: true,
          $ne: null,
        },
      });

      console.log(`Found ${users.length} users`);

      for (const user of users) {

        try {

          await admin.messaging().send({

            token: user.fcmToken,

            notification: {
              title: "🧘 Good Morning",
              body: "Start your day with 10 minutes of yoga.",
            },

          });

          console.log(`Sent to ${user.email}`);

        } catch (error) {

          console.log(`Failed for ${user.email}`);
          console.log(error.message);

        }
      }

    } catch (error) {

      console.log("Cron Error:");
      console.log(error);

    }

  },
  {
    timezone: "Asia/Kolkata",
  }
);
