import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { Select } from '@chakra-ui/react';

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const APIList = [
    { value: '1', label: '박혜연' },
    { value: '2', label: '이진솔' },
    { value: '3', label: '김상해' },
  ];

  return (
    <Wrapper>
      <Container flexDirection="row" alignItems="center" justifyContent="space-between">
        <Link to={RouterPath.home}>
          <Logo
            src="https://gift-s.kakaocdn.net/dn/gift/images/m640/pc_gift_logo.png"
            alt="카카오 선물하기 로고"
          />
        </Link>
        <RightWrapper>
          <Select size="xs" placeholder="백엔드 API 선택">
              {APIList.map(api => (
                <option key={api.value} value={api.value}>
                  {api.label}
                </option>
              ))}
            </Select>
          {authInfo ? (
            <LinkButton onClick={() => navigate(RouterPath.myAccount)}>내 계정</LinkButton>
          ) : (
            <LinkButton onClick={handleLogin}>로그인</LinkButton>
          )}
        </RightWrapper>
      </Container>
    </Wrapper>
  );
};

export const HEADER_HEIGHT = '54px';

export const Wrapper = styled.header`
  position: fixed;
  z-index: 9999;
  width: 100%;
  max-width: 100vw;
  height: ${HEADER_HEIGHT};
  background-color: #fff;
  padding: 0 16px;
`;

const Logo = styled.img`
  height: ${HEADER_HEIGHT};
`;
const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  `;

const LinkButton = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  width: 100px;
`;
