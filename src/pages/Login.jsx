import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FloatingBackground from '../components/auth/FloatingBackground';
import RabbitCharacter from '../components/auth/RabbitCharacter';
import LoginForm from '../components/auth/LoginForm';
import WelcomeText from '../components/auth/WelcomeText';
import LoadingScreen from '../components/auth/LoadingScreen';
import CarrotRain from '../components/auth/CarrotRain';
import { apiAuth } from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (email, password) => {
    try {
      setLoginFail(false);
      setErrorMessage('');
      setLoading(true);

      const res = await apiAuth.login({
        email,
        password,
      });

      const token = res.data.accessToken;

      // lưu jwt
      localStorage.setItem('token', token);

      setLoginSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 2500);
    } catch (error) {
      console.log(error);

      setLoginFail(true);

      setErrorMessage(
        error?.response?.data?.message || 'Email hoặc mật khẩu không đúng',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#87CEEB] via-[#CFFFE2] to-[#FDF6E3] flex items-center justify-center px-4">
      <FloatingBackground />

      <div className="grid lg:grid-cols-2 gap-10 w-full max-w-6xl z-10">
        <div className="flex flex-col items-center justify-center">
          <RabbitCharacter
            isPasswordFocus={isPasswordFocus}
            loginFail={loginFail}
            loginSuccess={loginSuccess}
          />

          <WelcomeText />
        </div>

        <LoginForm
          onLogin={handleLogin}
          setIsPasswordFocus={setIsPasswordFocus}
          loginFail={loginFail}
          errorMessage={errorMessage}
        />
      </div>

      {loading && <LoadingScreen />}
      {loginSuccess && <CarrotRain />}
    </div>
  );
};

export default Login;
