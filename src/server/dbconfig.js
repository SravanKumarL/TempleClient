const config = {
  mongoURL: process.env.MONGODB_URI || 'mongodb://localhost:/temple',
  port: process.env.PORT || 7000,
};

export default config;