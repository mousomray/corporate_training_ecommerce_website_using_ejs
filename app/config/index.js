module.exports = {
  // Define application configuration
  appRoot: {
    env: process.env.NODE_ENV || "development",
    isProd: process.env.NODE_ENV === "production",
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 3004,
    appName: process.env.APP_NAME || "corporate_training",
    getUserFolderName: process.env.USER_FOLDER_NAME || "user",
    getAdminFolderName: process.env.ADMIN_FOLDER_NAME || "admin",
  },
};