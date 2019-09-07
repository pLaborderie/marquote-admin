import React from 'react';
import { Button } from 'antd';
import { Meteor } from 'meteor/meteor';

function Logout() {
  function logout() {
    Meteor.logout();
  }
  return (
    <>
      <h1>Voulez vous vraiment vous déconnecter ?</h1>
      <Button onClick={logout} type="primary">Confirmer</Button>
    </>
  )
}

export default Logout;
