import React from 'react';
import styled from '@emotion/styled';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';

const REST_API_KEY = 'cbb227fe87de25de54c477577d349447';
const REDIRECT_URI = 'http://localhost:3000/react-deploy/api/oauth/token';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const LoginPage: React.FC = () => {

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <Spacing height={{ initial: 40, sm: 60 }} />
      <Button onClick={handleLogin}>카카오톡으로 시작하기</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 88px;
  color: #333;
`;

export default LoginPage;
