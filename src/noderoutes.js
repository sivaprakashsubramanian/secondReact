import React, { useState } from 'react'
import {BrowserRouter , Router,Route,Link,Routes,Navigate} from 'react-router-dom'
import LoginValidation from './loginValidation'
import UserData from './userData'
import RegisterUser from './registerUser'
import Dyanamicform from './dyanamicform'
import FormDataDisplay from './formDataDisplay'
import ViewResponseData from './viewResponse'

function Noderoutes() {
    const [isLogIn,setIsLogIn]=useState(false)
    const [userId,setUserId]=useState(JSON.parse(localStorage.getItem('myData')))
    const [userRole,setUserRole]=useState(localStorage.getItem('role'))
    const [tokenData,setTokenData]=useState(localStorage.getItem('token'))
    const [viewIndex,setViewIndex]=useState()
    // const hi=(data)=>{
    //   setData(data);
    //   console.log(data,"zzzzzz");
    // }
    // const Data=localStorage.getItem('myData');
    // const UserId=JSON.parse(Data);
    // console.log(UserId)
    // setUserId(userId);
    const token=localStorage.getItem('token');

  return (
    <div>
    {/* <BrowserRouter>
        <Routes>
            <Route  path="/"
             element={<LoginValidation isLogIn={isLogIn} setIsLogIn={setIsLogIn} setUserID={setUserId}/>}></Route>
            {
               isLogIn ? ( <Route  path="/nodeApi" element={<NodeApi userId={userId}/>}></Route>):
               (<Route  path="/nodeApi" element={<LoginValidation/>}></Route>)
            }
           
            

        </Routes>
    </BrowserRouter> */}
    <BrowserRouter>
    
    
  <Routes>
    <Route
      path="/"
      element={<LoginValidation isLogIn={isLogIn} setIsLogIn={setIsLogIn} setUserId={setUserId} setUserRole={setUserRole} setTokenData={setTokenData}/>}
    ></Route>
    {token ? (
      <Route path="/userData" element={<UserData userId={userId}  userRole={userRole} tokenData={tokenData}/>} />
    ) : (
      <Route path="/userData" element={<Navigate to="/"/>} />
    )}
     <Route exact path="/registerUser" element={<RegisterUser/>}></Route>
     <Route exact path="/dyanamicform" element={<Dyanamicform userId={userId}  userRole={userRole} tokenData={tokenData}/>}></Route>
    <Route exact path="/formDataDisplay" element={<FormDataDisplay userId={userId} setViewIndex={setViewIndex} tokenData={tokenData}/>}></Route>
    <Route exact path="/viewResponse" element={<ViewResponseData viewIndex={viewIndex} userId={userId} tokenData={tokenData} />}></Route>
  </Routes>
  
  

</BrowserRouter>
    {
      console.log(userId,"siva[]]]][[")
    }
    </div>
    
  )
}

export default Noderoutes