import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserData from './userData';
import reportWebVitals from './reportWebVitals';
import LoginValidation from './loginValidation';
import Noderoutes from './noderoutes';
import Dyanamicform from './dyanamicform';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
  
    {/* <App />
     */}
     {/* <UserData/> */}
     
      {/* <LoginValidation/> */}
      <Noderoutes/>
      {/* <Dyanamicform/> */}
  
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
