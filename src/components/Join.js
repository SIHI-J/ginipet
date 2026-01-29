import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/sub.css'
import BASE_URL from '../config';
function Join(props) {
  // 1. 폼 데이터 상태 관리
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    tel: ''
  });
  const [isIdChecked, setIsIdChecked] = useState(false);

  const navigate = useNavigate();

  const CheckUsername = () => {
    if (!form.username) return alert("아이디를 입력해주세요.");

    axios.get(`${BASE_URL}/ginipet_users?username=${form.username}`)
      .then(res => {
        if (res.data.length > 0) {
          alert("이미 사용 중인 아이디입니다.");
          setIsIdChecked(false); // 실패 시 false
        } else {
          alert("사용 가능한 아이디입니다.");
          setIsIdChecked(true); // 성공 시 true
        }
      })
      .catch(err => {
        console.log(err.response?.status, err.response?.data);
        alert(err.response?.data?.sqlMessage || err.response?.data?.error || "회원가입 실패");
      });
  }
  const PhoneNumber = (value) => {
    // 숫자가 아닌 문자 제거
    const numbers = value.replace(/[^0-9]/g, '');

    // 11자 이상 입력 방지
    const target = numbers.slice(0, 11);

    // 하이픈 자동 삽입 로직
    if (target.length < 4) return target;
    if (target.length < 8) return `${target.slice(0, 3)}-${target.slice(3)}`;
    return `${target.slice(0, 3)}-${target.slice(3, 7)}-${target.slice(7)}`;
  };
  // 2. 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'tel'
        ? PhoneNumber(value)
        : value
    }));
  };

  // 3. 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isIdChecked) {
      alert("아이디 중복확인을 해주세요.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    console.log("회원가입 데이터:", form);
    axios.post(`${BASE_URL}/ginipet_users`, {
      username: form.username,
      password: form.password,
      email: form.email,
      tel: form.tel
    })
      .then(() => {
        alert('회원가입 완료!');
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
        alert('회원가입 실패');
      });
  };
  return (
    <main className="sub">
      <h2>회원가입</h2>
      <form className='join_form' onSubmit={handleSubmit}>
        <div className='id_box'>
          <label htmlFor="username">아이디:</label>

          <p><input type="text" id="username" name="username" placeholder='아이디 입력' required value={form.username} onChange={handleChange} /><button type='button' onClick={CheckUsername}>중복확인</button></p>
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" name="password" placeholder='비밀번호 입력' required value={form.password} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="confirmPassword">비밀번호 확인:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder='비밀번호 확인'
            required
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">이메일:</label>
          <input type="email" id="email" name="email" placeholder='ginipet@email.com' required value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="tel">전화번호:</label>
          <input type="tel" id="tel" name="tel" placeholder='010-0000-0000' required value={form.tel} onChange={handleChange} />
        </div>
        <p>
          <input type="checkbox" id="terms" name="terms" required />
          <label htmlFor="terms">이용약관, 개인정보 수집 및 이용, 마케팅 활용 선택에 모두 동의합니다.</label>
        </p>
        <button className='submit' type="submit">회원가입 완료</button>
      </form>
    </main>
  );
}

export default Join;