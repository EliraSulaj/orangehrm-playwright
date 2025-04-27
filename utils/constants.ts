export const URLs = {
  login: "https://opensource-demo.orangehrmlive.com/",
};

export const Credentials = {
  admin: { username: "Admin", password: "admin123" },
  invalid: { username: "Admin", password: "wrongpassword" },
};

export const screenshotPath = `./test-results/no-records-imported-${new Date()
  .toISOString()
  .replace(/[:.]/g, "-")}.png`;
