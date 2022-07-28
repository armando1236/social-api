const connection = require('../config/connection');
const { user, thought } = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await user.deleteMany({});

  // Drop existing students
  await thought.deleteMany({});

  

  // Log out the seed data to indicate what should appear in the database
  console.table(students);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
