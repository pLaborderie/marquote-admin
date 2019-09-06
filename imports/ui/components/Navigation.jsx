import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Icon, Layout, Menu } from 'antd/lib';
import { withRouter } from 'react-router';

import routes from '../Router/routes';

function Navigation({ user, location, history }) {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleCollapse() {
    setCollapsed(!collapsed);
  }

  function navigate({ key }) {
    history.push(key);
  }

  function filterRoutes(route) {
    if (route.hide) return false;
    if (!user && route.auth) return false;
    return true;
  }

  return (
    <Layout.Sider
      collapsible
      breakpoint="sm"
      collapsed={collapsed}
      onCollapse={handleCollapse}
      theme="light"
      collapsedWidth={isMobile ? 0 : 80}
      onBreakpoint={setIsMobile}
    >
      <Menu mode="inline" theme="light" selectedKeys={[location.pathname]}>
        {routes.filter(filterRoutes).map(route => (
          <Menu.Item key={route.path} onClick={navigate}>
            <Icon type={route.icon} />
            <span>{route.name}</span>
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  );
}

export default withTracker(() => {
  const user = Meteor.user();
  return { user };
})(withRouter(Navigation));
