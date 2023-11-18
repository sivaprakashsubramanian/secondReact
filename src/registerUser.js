import React,{useState} from 'react'
import { Button, Modal } from "antd";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function RegisterUser() {
  const navigate=useNavigate();
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    age: "",
    active: "",
    password: "",
    role: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/createNumber", { ...inputValue })
      .then((res) => {
        setInputValue({
          firstName: "",
          lastName: "",
          email: "",
          gender: "",
          age: "",
          active: "",
          password: "",
          role: "",
        });

        if (res.data.message) alert(res.data.message);
      })
      .catch(
        (err) => {
          if (err.response.data.message) alert(err.response.data.message);
        }
      );
  };
  return(
  <div className='flex justify-center bg-purple-200'>
    <div>
  FirstName<br/>
  <input
    name="firstName"
    value={inputValue.firstName}
    onChange={onChange}
    className='border border-black m-1'
  />
  <br />
  LastName<br/>
  <input name="lastName" value={inputValue.lastName} onChange={onChange} className='border border-black m-2'/>
  <br />
  Email<br/>
  <input name="email" value={inputValue.email} onChange={onChange} className='border border-black m-2'/>
  <br />
  Role<br/>
  <select
    name="role"
    value={inputValue.role}
    onChange={onChange}
    className='border border-black w-16 m-2'
  >
    <option value="">Select Role</option>
    <option value="Admin">Admin</option>
    <option value="Owner">Owner</option>
    <option value="SuperAdmin">Super Admin</option>
    <option value="Manager">Manager</option>
  </select>
  <br />
  Active<br/>
  <input name="active" value={inputValue.active} onChange={onChange} className='border border-black m-2'/>
  <br />
  Age<br/>
  <input name="age" value={inputValue.age} onChange={onChange} className='border border-black m-2'/>
  <br />
  Gender<br/>
  <input
    name="gender"
    type="radio"
    value="Male"
    onChange={onChange}
    checked={inputValue.gender === "Male"
  }
  />
  Male
  <input
    name="gender"
    type="radio"
    value="Female"
    onChange={onChange}
    checked={inputValue.gender === "Female"}
  />
  Female
  <br />
  Password <br/>
  <input
    name="password"
    value={inputValue.password}
    onChange={onChange}
    className='border border-black m-2'
  ></input>
  <br />
  <Button className='border border-black m-2'
    onClick={() => {handleSubmit();navigate("/")}}
    type="primary"
    disabled={
      !inputValue.firstName ||
      !inputValue.email ||
      !inputValue.lastName ||
      !inputValue.age ||
      !inputValue.gender ||
      !inputValue.active ||
      !inputValue.password
    }
  >
     Add
  </Button>
  </div>
  </div>
  )
}

export default RegisterUser;
