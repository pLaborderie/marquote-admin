import React, { useState } from 'react';
import { Button, Card, List, message, Modal, Input } from 'antd';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Quotes from '/imports/api/Quotes/Quotes';
const { TextArea } = Input;

function QuotesPage({ loading, quotes }) {
  const [selected, setSelected] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');

  function updateVisibility(id, isActive) {
    Meteor.call('quotes.edit', id, { isActive }, (err) => {
      if (err) {
        message.error(err.reason);
      } else {
        message.success('Citation mise à jour.');
      }
    });
  }

  function handleClickEdit(quote) {
    setSelectedValue(quote.text);
    setSelected(quote._id);
  }

  function handleChangeValue(e) {
    setSelectedValue(e.target.value);
  }

  function saveNewText() {
    Meteor.call('quotes.edit', selected, { text: selectedValue }, (err) => {
      if (err) {
        message.error(err.reason);
      } else {
        setSelected(null);
        setSelectedValue('');
        message.success('Citation mise à jour.');
      }
    });
  }

  function deleteQuote(id) {
    Meteor.call('quotes.remove', id, (err) => {
      if (err) {
        message.error(err.reason);
      } else {
        message.success('Citation supprimée.');
      }
    });
  }

  function displayDeleteModal(id) {
    Modal.confirm({
      title: 'Supprimer cette citation ?',
      content: 'Le contenu supprimé n\'est pas récupérable.',
      okText: 'Supprimer',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk: () => deleteQuote(id),
    });
  }

  function getActions(quote) {
    return [
      <Button
        shape="circle"
        onClick={() => updateVisibility(quote._id, !quote.isActive)}
        icon={quote.isActive ? 'eye' : 'eye-invisible'}
      />,
      quote._id === selected
        ? (
          <Button
            shape="circle"
            onClick={saveNewText}
            icon="save"
            type="primary"
          />
        ) : (
          <Button
            shape="circle"
            onClick={() => handleClickEdit(quote)}
            icon="edit"
          />
        )
      ,
      <Button
        shape="circle"
        onClick={() => displayDeleteModal(quote._id)}
        type="danger"
        icon="delete"
      />,
    ];
  }

  return (
    <>
      <h1>Gestion des citations</h1>
      <List
        header="Citations"
        loading={loading}
        dataSource={quotes}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        }}
        renderItem={(item, index) => (
          <List.Item
            key={item._id}
          >
            <Card
              title={`Citation ${index + 1}`}
              actions={getActions(item)}
            >
              {item._id === selected
                ? <TextArea
                  value={selectedValue}
                  onChange={handleChangeValue}
                  autosize
                /> : item.text
              }
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}

export default withTracker(() => {
  const quotesSub = Meteor.subscribe('quotes');
  return {
    loading: !quotesSub.ready(),
    quotes: Quotes.find().fetch(),
  };
})(QuotesPage);
