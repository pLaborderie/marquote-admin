import { Meteor } from 'meteor/meteor';

import Quotes from '../Quotes';

Meteor.publish('quotes', function publishQuotes(page = 0, quotesPerPage = 10) {
  if (this.userId) {
    // return Quotes.find().skip(page * quotesPerPage).limit(quotesPerPage);
    return Quotes.find();
  }
  throw new Meteor.Error('403', 'Non autorisé à récupérer les citations');
});
