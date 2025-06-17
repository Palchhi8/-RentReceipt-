const cron = require('node-cron');
const sendEmail = require('./email');

// Example: Schedule a job to run on the 1st of every month at 9:00 AM
cron.schedule('0 9 1 * *', async () => {
  // Fetch tenants and send reminders (pseudo-code)
  // const tenants = await getTenantsWithDueRent();
  // tenants.forEach(tenant => {
  //   sendEmail(tenant.email, 'Rent Reminder', 'Your rent is due!');
  // });
  console.log('Monthly rent reminder job executed');
}); 