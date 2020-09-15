import { Alert, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import { Link, history } from 'umi';
import { login } from '@/services/login';
import LoginForm from './components/Login';
import { setToken, setCurrentUser } from '@/utils/authority';

import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');

  const handleSubmit = (values) => {
    login({ mobile: values.mobile, password: values.password }).then((res) => {
      console.log(res);
      if (res.code === 200) {
        message.success('登陆成功！');
        setToken(res.token);
        setCurrentUser(res.data);
        history.push('/welcome');
      } else {
        message.error('登录失败！');
      }
    });
  };

  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="账户或密码错误（admin/ant.design）" />
          )}

          <UserName
            name="mobile"
            placeholder="手机号: admin or user"
            rules={[
              {
                required: true,
                message: '请输入手机号!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码: ant.design"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab="手机号登录">
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage content="验证码错误" />
          )}
          <Mobile
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <Link
            style={{
              float: 'right',
            }}
            className={styles.register}
            to="/user/register"
          >
            注册账户
          </Link>

          <a
            style={{
              float: 'right',
              marginRight: 10,
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
      </LoginForm>
    </div>
  );
};

export default Login;
