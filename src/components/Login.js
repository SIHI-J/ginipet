import React, { useEffect, useState } from 'react';
import '../styles/sub.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import BASE_URL from '../config';
function Login({ setUser }) {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [saveId, setSaveId] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const savedId = localStorage.getItem('savedId');
    if (savedId) {
      setLoginForm(prev => ({ ...prev, username: savedId }));
      setSaveId(true);
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/ginipet_login`, loginForm, {
        headers: { 'Content-Type': 'application/json' },
      });
      const token = res.data.token;
      localStorage.setItem('userToken', token);
      if (saveId) {
        localStorage.setItem('savedId', loginForm.username);
      } else {
        localStorage.removeItem('savedId');
      }
      const decoded = jwtDecode(token); // { username, exp, iat ... }
      setUser({ username: decoded.username });

      alert('로그인 성공');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || '로그인 중 오류가 발생했습니다.');
    }
  };
  return (
    <main className='sub'>
      <h2>로그인</h2>
      <form className='login_form' onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">아이디: </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={loginForm.username}
            placeholder="아이디를 입력하세요."
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={loginForm.password}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <p>
          <input type="checkbox" id="saveId"
            checked={saveId}
            onChange={(e) => setSaveId(e.target.checked)} />
          <label htmlFor="saveId">아이디 저장</label>
        </p>
        <input className='submit' type="submit" value="로그인" />
        <p className='link'>
          <Link to='/'>아이디 찾기</Link> <span>|</span>
          <Link to='/'>비밀번호 찾기</Link> <span>|</span>
          <Link to='/'>휴면계정찾기</Link>
        </p>
      </form>
      <div className="askjoin_box">
        <h3>아직! 회원이 아니세요??</h3>
        <p>지금 지니펫 회원으로 가입하시고 풍성한 혜택 받아가세요.</p>
        <Link to='/join'>회원가입</Link>
      </div>
    </main>
  );
}

export default Login;
