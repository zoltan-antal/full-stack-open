const app = require('./app');
const config = require('./utils/config');
const { connectToDatabase } = require('./utils/db');

const start = async () => {
  await connectToDatabase();
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};

start();
