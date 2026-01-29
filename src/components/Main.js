import React from 'react';
import '../styles/main.css';

function Main(props) {
  return (
    <main>
      <img src={process.env.PUBLIC_URL + '/images/main1.jpg'} alt="메인 이미지" />
      <img src={process.env.PUBLIC_URL + '/images/shop.jpg'} alt="메인 이미지" />
      <img src={process.env.PUBLIC_URL + '/images/story.jpg'} alt="메인 이미지" />
      <img src={process.env.PUBLIC_URL + '/images/in_star.jpg'} alt="메인 이미지" />
    </main>
  );
}

export default Main;