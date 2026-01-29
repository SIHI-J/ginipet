import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user, setUser, isNavOpen, setNavToggle }) {
  // 네비게이션 토글 함수
  // 상태 변경 함수
  const handleToggle = (status) => {
    setNavToggle(status);
  };
  const handleLogout = () => {
    localStorage.removeItem('userToken');//토큰 삭제
    setUser(null);
  };

  return (
    <header>
      <h1>
        <Link to='/' title='지니펫 홈으로 이동'>
          <img
            src={process.env.PUBLIC_URL + '/images/logo_clr.png'}
            alt="상단 로고"
          />
        </Link>
      </h1>
      <button className='toggle_btn' onClick={() => handleToggle(true)} title='메뉴 열기 '>
        <img
          src={process.env.PUBLIC_URL + '/images/topIcon_burger.png'}
          alt="메뉴 아이콘"
        />
      </button>
      <Link to='/cart' className='cart_btn' title='장바구니로 이동'>
        <img
          src={process.env.PUBLIC_URL + '/images/topIcon_cart.png'}
          alt="장바구니 아이콘"
        />
      </Link>
      <nav className='navigation'
        style={{ left: isNavOpen ? '0' : '-100%' }}>
        <button className='close_btn' onClick={() => handleToggle(false)} title='메뉴 닫기'>
          <img
            src={process.env.PUBLIC_URL + '/images/btn_close.png'}
            alt="메뉴 닫기 아이콘"
          />
        </button>
        <ul className='gnb'>
          <li onClick={() => handleToggle(false)}><Link to='/' >지니펫 쇼핑몰</Link></li>
          <li onClick={() => handleToggle(false)}><Link to='/intro' >브랜드 소개</Link></li>
          <li onClick={() => handleToggle(false)}><Link to='/info' >반려견 정보</Link></li>
          <li onClick={() => handleToggle(false)}><Link to='/event' >이벤트</Link></li>
          <li onClick={() => handleToggle(false)}><Link to='/customer' >고객지원</Link></li>
        </ul>
        <ul className='form_nav'>
          {!user ? (
            <>
              <li onClick={() => handleToggle(false)}><Link to='/login'>로그인</Link></li>
              <li onClick={() => handleToggle(false)}><Link to='/join'>회원가입</Link></li>
            </>
          ) : (
            <>
              <li>
                <button type="button" onClick={handleLogout} className="logout_btn">
                  로그아웃
                </button>
              </li>
              <li onClick={() => handleToggle(false)}>
                <Link to='/mypage'>{user.username}님</Link>
              </li>
            </>
          )}
          <li onClick={() => handleToggle(false)}><Link to='/order'>주문조회</Link></li>
          <li onClick={() => handleToggle(false)}><Link to='/cart'>장바구니</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;