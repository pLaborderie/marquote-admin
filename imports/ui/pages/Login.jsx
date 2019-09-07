import React from 'react';
import {Col, Row, Form, Icon, Input, Button, message} from 'antd';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';

const Container = styled(Col)`
background: #FFFFFF;
padding: 10px;
border-radius: 5px;
margin: 0 5px;
`;

function Login({ form }) {
  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        Meteor.loginWithPassword(values.email, values.password, (err, res) => {
          if (err) {
            if (err.error === 403) {
              message.error('Email ou mot de passe erroné.');
            } else {
              message.error(err.reason);
            }
          } else {
            message.success('Bienvenue !');
          }
        });
      } else {
        console.log(err);
      }
    });
  }

  const { getFieldDecorator } = form;
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ height: '100vh' }}
    >
      <Container xs={24} sm={18} md={12}>
        <h1>Connexion</h1>
        <Form onSubmit={handleSubmit} layout="vertical">
          <Form.Item label="Email">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Veuillez saisir une adresse email.' }]
            })(
              <Input
                prefix={<Icon type={"mail"} />}
                placeholder="example@provider.com"
              />
            )}
          </Form.Item>
          <Form.Item label="Mot de passe">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Veuillez saisir un mot de passe.' }]
            })(
              <Input
                prefix={<Icon type={"lock"} />}
                type="password"
                placeholder="********"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Se connecter</Button>
          </Form.Item>
        </Form>
      </Container>
    </Row>
  );
}

export default Form.create({ name: 'login' })(Login);
