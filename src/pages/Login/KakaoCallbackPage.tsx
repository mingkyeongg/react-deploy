// src/pages/Login/KakaoCallbackPage.tsx
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const KakaoCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  console.log('Code:', code);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        console.log('Fetching token with code:', code);
        const response = await axios.get(`/api/oauth/token`, {
          params: { code },
        });

        const data = response.data;

        if (data.http_result === 'OK') {
          const accessToken = data.data;
          console.log('Access Token:', accessToken);
          localStorage.setItem('authToken', accessToken);
          navigate('/');
        } else {
          console.error('Error: ', data.message);
        }
      } catch (error) {
        console.error('Error getting access token:', error);
      }
    };

    if (code) {
      fetchToken();
    } else {
      console.error('No code found in URL');
    }
  }, [code, navigate]);

  return <div>카카오 로그인 중...</div>;
};

export default KakaoCallbackPage;
