import React from 'react';
import './style.css';

const MailInbox = () => {
  return (

<div className="main-section">
  <div className='function-section'>
    <div className='fun-ch select-all-btn'>
    <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_44_206)">
<path d="M16.9 7.1V16.9H7.1V7.1H16.9ZM19 5H5V19H19V5Z" fill="#A4A4A4"/>
<g clip-path="url(#clip1_44_206)">
<path d="M31 12.6416L34.5 9.95828V12.1749L31 14.8583L27.5 12.1749V9.95828L31 12.6416Z" fill="black"/>
<path d="M31 12.6416L34.5 9.95828V12.1749L31 14.8583L27.5 12.1749V9.95828L31 12.6416Z" fill="#A4A4A4"/>
</g>
</g>
<defs>
<clipPath id="clip0_44_206">
<rect width="38" height="24" fill="white"/>
</clipPath>
<clipPath id="clip1_44_206">
<rect width="14" height="14" fill="white" transform="matrix(0 -1 1 0 24 19)"/>
</clipPath>
</defs>
</svg>
    </div>
    <div className='fun-ch refresh-btn'>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.75 7.25C14.5511 7.25 14.3603 7.32902 14.2197 7.46967C14.079 7.61032 14 7.80109 14 8C14.0089 9.40477 13.5277 10.7687 12.6392 11.8568C11.7508 12.945 10.5106 13.6893 9.13247 13.9615C7.7543 14.2337 6.32434 14.0167 5.08888 13.3481C3.85342 12.6794 2.88981 11.6009 2.36399 10.2982C1.83818 8.99551 1.7831 7.55024 2.20822 6.21131C2.63334 4.87238 3.51206 3.7236 4.69303 2.96283C5.874 2.20207 7.2833 1.87693 8.6782 2.04343C10.0731 2.20993 11.3663 2.85764 12.335 3.875H10.535C10.3361 3.875 10.1453 3.95402 10.0047 4.09467C9.86402 4.23532 9.785 4.42609 9.785 4.625C9.785 4.82391 9.86402 5.01468 10.0047 5.15533C10.1453 5.29598 10.3361 5.375 10.535 5.375H13.9325C14.1314 5.375 14.3222 5.29598 14.4628 5.15533C14.6035 5.01468 14.6825 4.82391 14.6825 4.625V1.25C14.6825 1.05109 14.6035 0.860322 14.4628 0.71967C14.3222 0.579017 14.1314 0.5 13.9325 0.5C13.7336 0.5 13.5428 0.579017 13.4022 0.71967C13.2615 0.860322 13.1825 1.05109 13.1825 1.25V2.5775C11.9335 1.38354 10.3106 0.657464 8.58801 0.521997C6.86547 0.386529 5.14897 0.849983 3.72869 1.83402C2.30841 2.81805 1.27146 4.26231 0.793124 5.92264C0.314788 7.58298 0.42441 9.35756 1.10346 10.9464C1.78251 12.5352 2.98933 13.8409 4.51992 14.6426C6.05052 15.4444 7.811 15.6931 9.50378 15.3466C11.1966 15.0002 12.7178 14.0799 13.8104 12.7413C14.9029 11.4027 15.4998 9.72787 15.5 8C15.5 7.80109 15.421 7.61032 15.2803 7.46967C15.1397 7.32902 14.9489 7.25 14.75 7.25Z" fill="#A4A4A4"/>
</svg>
    </div>
    <div className='fun-ch kebab-btn'>
    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="4" cy="1.5" r="1.5" fill="#A4A4A4"/>
<circle cx="4" cy="7.5" r="1.5" fill="#A4A4A4"/>
<circle cx="4" cy="13.5" r="1.5" fill="#A4A4A4"/>
</svg>
    </div>
  </div>
  <div className='mail-section'>
    <article className='message-01'>
        <div className='mes-ch icons'>
            <div className='check-box'>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9 2.1V11.9H2.1V2.1H11.9ZM14 0H0V14H14V0Z" fill="#A4A4A4"/>
</svg>
            </div>
            <div className='star'>
                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.34375 2.37361L11.4129 6.34645L11.6083 6.72146L12.0302 6.74847L16.1883 7.01458L13.1212 9.95896L12.804 10.2635L12.9148 10.689L14.0557 15.0699L9.68555 12.8324L9.34375 12.6574L9.00195 12.8324L4.6318 15.0699L5.77267 10.689L5.88348 10.2635L5.56627 9.95896L2.49922 7.01458L6.65728 6.74847L7.07924 6.72146L7.27456 6.34645L9.34375 2.37361Z" stroke="#A4A4A4" stroke-width="1.5"/>
</svg>
            </div>
        </div>
        <section className='mes-ch message-content'>
            <div className='highlight message-subject'>
                <p>Message Subject</p>
            </div>
            <div className='message-body'>
                <p>Message Body</p>
            </div>
        </section>
        <section className='mes-ch from-info'>
            <div className='highlight first-name'>
                <p>Rosa</p>
            </div>
            <div className='mail-id'>
                <p>Rosa66@yahoo.com</p>
            </div>
        </section>
        <section className='mes-ch time-stamp'>
            <p><b>10:00 AM</b></p>
        </section>
    </article>
    
    </div>
</div> 
);
};

export default MailInbox;