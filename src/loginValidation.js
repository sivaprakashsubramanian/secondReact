import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserData from "./userData";
import RegisterUser from "./registerUser";
import { Button } from "antd";

function LoginValidation(props) {
  const [user, setUser] = useState([]);
  const [userDetail, setUserDettail] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/get-all")
  //     .then((res) => {
  //       const { data = [] } = res?.data;
  //       if (data.length) setUser(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  const handleSave = (e) => {
    const { name, value } = e.target;
    setUserDettail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    // console.log(userDetail.userName, "qqqqq");
    // if (!userDetail.userName || !userDetail.pass) {
    //   alert("UserName or Password Cannot be empty");
    // } else {
    //   const index = user.findIndex(
    //     (item) => item?.email === userDetail?.userName
    //   );
    //   console.log(index, "asiva");
    //   if (index > -1) {
    //     if (
    //       userDetail.userName === user[index].email &&
    //       userDetail.pass === user[index].password
    //     ) {
    //       console.log(userDetail.userName, "ppppp");
    //       // const filterData=user.filter((item)=>item.email!=userDetail.userName)
    //       console.log(props,"qwerty")
    //         props.setUserRole(user[index].role)
    //         props.setUserId(user[index]);
    //         props.setIsLogIn(true);
        
    //       navigate("/nodeApi");
    //     }
    //   } else {
    //     alert("UserName or Password not valid");
    //   }
    // }
    console.log(userDetail,"as")
    axios
      .post(`http://localhost:5000/login`,{...userDetail})
      .then((res) => {
        if(res.status===200){
          // console.log(res.data.token,"werrtyui")
          localStorage.setItem('myData',JSON.stringify( res.data.data));
          localStorage.setItem('token',res.data.token)
          localStorage.setItem('role',res.data.data.role)
          // const Data=JSON.parse(localStorage.getItem('myData'))
          // const Token=JSON.parse(localStorage.getItem('token'))
          // props.setTokenData(Token)
        //  props.setIsLogIn(true);
        props.setUserId(res.data.data);
        // props.setUserRole(Data.role)
        // console.log(res.data,"qwertysiva")
        // props.setRole(res.data.data.role);
        navigate("/userData")
        }else{
          return alert("invalid email ....")
        }
      }).catch((err) => {
          console.log(err)
          if (err.message) {
            alert(err.response.data.message);
          }
        });
  };
  return (
    <div
      className="bg-purple-100 flex justify-center"
     
    >
     
      <div
      className=""
        
      > 
      <h1 className="text-2xl m-5 text-bold">Login Page</h1>
        UserName
        <br/>
        <input
          className="p-3 m-5 border border-black"
          name="email"
          value={userDetail.email}
          onChange={handleSave}
          placeholder="Enter your Mail"
        />
        <br />
        Password
         <br/>
        <input
          className="p-3 m-5 border border-black"
          name="password"
          value={userDetail.password}
          onChange={handleSave}
          placeholder="Enter your Password"
        />
        <br />
        <div className="flex">
        <Button className="border border-black p-2 m-2" type="primary" onClick={handleSubmit}>Login</Button><br/>
        <Button className="border border-black p-2 m-2" type="primary" onClick={()=>navigate("/registerUser")}>New User</Button>
        </div>
      </div>
    </div>
  );
}

export default LoginValidation;
