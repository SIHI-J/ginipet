import React from 'react';

function Footer(props) {
  return (
    <footer>
      <div className="footer_top">
        <a href="http://">공지사항</a>
      </div>

      <nav className='footer_nav'>
        <ul>
          <li><a href="http://">개인정보처리방침</a></li>
          <li><a href="http://">쇼핑몰약관</a></li>
        </ul>
        <a href="http://">
          <img src={process.env.PUBLIC_URL + 'images/footer_sns_2.gif'} alt="" />
        </a>
      </nav>
      <div className="tel_info">
        <h3>고객센터</h3>
        <a href="tel:+02-2166-7770">02-2166-7770</a>
        <p>평일 10:00 ~ 17:00</p>
        <p>(점심 12:00 ~ 13:00)</p>
      </div>
      <div className="business_info">
        <button className='business_btn' title='지니펫 사업자 정보 확인'>
          지니펫 사업자 정보 확인 &nbsp; <img src={process.env.PUBLIC_URL + '/images/iconArrow_bottom.png'} alt="아래 화살표 아이콘" />
        </button>
        {/* <address>
        주식회사 지니펫 | 대표자: 000 | 사업자등록번호: 123-45-67890
      </address> */}</div>

    </footer>
  );
}

export default Footer;