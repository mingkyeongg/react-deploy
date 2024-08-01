import React from 'react';
import styled from '@emotion/styled';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';

export const LoginPage: React.FC = () => {
  const authorizeUrl = 'http://54.180.245.166:8080/api/oauth/authorize';

  const handleLogin = () => {
    window.location.href = authorizeUrl;
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
