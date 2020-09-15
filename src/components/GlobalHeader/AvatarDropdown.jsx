import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import React from 'react';
import { history } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import { getCurrentUser } from '@/utils/authority';
import styles from './index.less';
import menu from '@/locales/zh-CN/menu';

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'logout') {
      history.push(`/user/login`);
    }
  };

  render() {
    const currentUser = getCurrentUser();
    console.log(currentUser);
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600169681042&di=0eefc773a8d07d4d09f4746b207ab366&imgtype=0&src=http%3A%2F%2Fdp.gtimg.cn%2Fdiscuzpic%2F0%2Fdiscuz_x5_gamebbs_qq_com_forum_201306_19_1256219xc797y90heepdbh.jpg%2F0"
            alt="avatar"
          />
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    );
  }
}

export default AvatarDropdown;
