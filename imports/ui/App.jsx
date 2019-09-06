import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import Router from './Router/Router';

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Router />
    </Layout>
  );
}

export default App;
