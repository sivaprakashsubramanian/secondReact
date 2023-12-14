import React, { useState } from 'react'
import {BrowserRouter , Router,Route,Link,Routes,Navigate} from 'react-router-dom'
import LoginValidation from './loginValidation'
import UserData from './userData'
import RegisterUser from './registerUser'
import Dyanamicform from './dyanamicform'
import FormDataDisplay from './formDataDisplay'

function Noderoutes() {
    const [isLogIn,setIsLogIn]=useState(false)
    const [userId,setUserId]=useState("")
    const [userRole,setUserRole]=useState("")
    const [tokenData,setTokenData]=useState("")
    // const hi=(data)=>{
    //   setData(data);
    //   console.log(data,"zzzzzz");
    // }

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
    {isLogIn ? (
      <Route path="/userData" element={<UserData userId={userId}  userRole={userRole} tokenData={tokenData}/>} />
    ) : (
      <Route path="/userData" element={<Navigate to="/"/>} />
    )}
    <Route exact path="/registerUser" element={<RegisterUser/>}></Route>
    <Route exact path="/dyanamicform" element={<Dyanamicform userId={userId}  userRole={userRole}/>}></Route>
    <Route exact path="/formDataDisplay" element={<FormDataDisplay userId={userId}/>}></Route>
  </Routes>
</BrowserRouter>
    {
      console.log(userRole,"siva[]]]][[")
    }
    </div>
    
  )
}

export default Noderoutes