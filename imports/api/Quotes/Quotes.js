import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Quotes = new Mongo.Collection('quotes');

Quotes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Quotes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Quotes.schema = new SimpleSchema({
  createdAt: {
    type: Date,
    label: 'Creation date',
    autoValue() {
      if (this.isInsert) return new Date();
    }
  },
  updatedAt: {
    type: Date,
    label: 'Updated date',
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date();
    }
  },
  text: {
    type: String,
    required: true,
    label: 'The quote text',
  },
  isActive: {
    type: Boolean,
    label: 'If false, cannot be recovered by Discord bot',
    defaultValue: true,
  },
});

export default Quotes;
