import { Meteor } from 'meteor/meteor';
import seeder from '@cleverbeagle/seeder'
import Quotes from "../../api/Quotes/Quotes";

// Development (user and quotes)
seeder(Meteor.users, {
  environments: ['development'],
  noLimit: true,
  data: {
    static: [{
      email: 'admin@admin.com',
      password: 'admin',
      profile: {
        name: {
          first: 'Admin',
          last: 'Admin',
        },
      },
    }],
  },
});

seeder(Quotes, {
  environments: ['development'],
  resetCollection: false,
  seedIfExistingData: false,
  noLimit: true,
  data: {
    dynamic: {
      count: 5,
      seed(iteration, faker) {
        return {
          text: `Quote ${iteration}: ${faker.lorem.lines(1)}`,
        }
      },
    },
  },
});

// Production user
seeder(Meteor.users, {
  environments: ['production'],
  noLimit: true,
  data: {
    static: [{
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      profile: {
        name: {
          first: process.env.ADMIN_FIRST_NAME,
          last: process.env.ADMIN_LAST_NAME,
        },
      },
    }],
  },
});
