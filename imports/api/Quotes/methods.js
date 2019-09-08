import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import Quotes from './Quotes';

Meteor.methods({
  'quotes.add': function quotesAdd(text) {
    check(text, String);

    if (this.userId) {
      return Quotes.insert({ text });
    }
    throw new Meteor.Error('403', 'Non autorisé à insérer une citation.');
  },
  'quotes.edit': function quotesEdit(id, values) {
    check(id, Match.OneOf(String, Meteor.Collection.ObjectID));
    check(values, {
      text: Match.Maybe(String),
      isActive: Match.Maybe(Boolean),
    });

    if (this.userId) {
      return Quotes.update(id, {
        $set: values
      });
    }
    throw new Meteor.Error('403', 'Non autorisé à modifier une citation.');
  },
  'quotes.remove': function quotesRemove(id) {
    check(id, Match.OneOf(String, Meteor.Collection.ObjectID));

    if (this.userId) {
      return Quotes.remove(id);
    }
    throw new Meteor.Error('403', 'Non autorisé à supprimer une citation.');
  }
});
