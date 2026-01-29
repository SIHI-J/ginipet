import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './styles/reset.css';
import './styles/layout.css';
import './styles/common.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Main from './components/Main';
import Cart from './components/Cart';
import Customer from './components/Customer';
import Event from './components/Event';
import Info from './components/Info';
import Intro from './components/Intro';
import Join from './components/Join';
import Login from './components/Login';
import Order from './components/Order';
import TopButton from './components/TopButton';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken'); //토큰 가져오기
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUser({ username: decoded.username });
    } catch {
      localStorage.removeItem('userToken');
      setUser(null);
    }
  }, []);
  return (
    <>
      <Header isNavOpen={isNavOpen} setNavToggle={setIsNavOpen} user={user} setUser={setUser} />
      {/* 컴포넌트 목록 */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/event" element={<Event />} />
        <Route path="/info" element={<Info />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      <TopButton />
      <Footer />
    </>
  );
}

export default App;
