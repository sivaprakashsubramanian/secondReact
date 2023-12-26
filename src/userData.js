import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { Button, Modal } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import LoginValidation from "./loginValidation";
import Dyanamicform from "./dyanamicform";
import Navbarroutes from "./navbarroutes";
// import Navbarroutes from "./navbarroutes";

 function UserData(props) {
  const navigate=useNavigate();
  console.log(props,"sivaprakash")
  const role=!(props.userRole==="Owner"||props.userRole==="SuperAdmin");
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
  const [user, setUser] = useState([]);
  const[editUserModal,setEditUserModal]=useState(false);
  const[userModal,setUserModal]=useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [data, setData] = useState();
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/get-userData")
      .then((res) => {
        const { data = [] } = res?.data || {};
        if (data.length) setUser(data);
      })
      .catch((err) => console.log(err));
    // setUser([...props.user])
  }, []);
  // useEffect(() => {
  //   localStorage.setItem('myData', JSON.stringify(props));
  // }, [props]);
  // const storedData = localStorage.getItem('myData');
  // console.log( JSON.parse(storedData),"local storage")
  // const userInfo=JSON.parse(storedData);
  const openModal=()=>{
    setEditUserModal(true);
  }
  const closeModal=()=>{
    setEditUserModal(false);
  }
  const userModalOpen=()=>{
    setUserModal(true);
  }
  const userModalClose=()=>{
    setUserModal(false);
  }
  // console.log(role,'kkhhkkhhkk')
  const [columnDefs] = useState([
    { field: "firstName" },
    { field: "lastName" },
    { field: "email" },
    { field: "gender" },
    { field: "age" },
    { field: "active" },
    { field: "role" },
    { field: "Edit",
      cellRenderer: ({ data }) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              handleUpdate(data);
              setUpdateBtn(true);
              setData(data);
              userModalOpen();
            }}
          >
            Edit
          </Button>
        );
      },hide:role,
    },
    {
      field: "Delete",hide:role,
      cellRenderer: ({ data }) => {
        return (
          <Button type="primary" onClick={() => handleDelete(data)}>
            Delete
          </Button>
        );
      },
    },
  ]);

  const handleSubmit = () => {
    // if(!inputValue)
    // return;
    axios
      .post("http://localhost:5000/create-userData", { ...inputValue })
      .then((res) => {
        // console.log(res,"as")
        console.log(inputValue.active, "wwwwwwwww");
        setUser((prev) => {
          const arr = [...prev];
          arr.push({
            firstName: inputValue.firstName,
            lastName: inputValue.lastName,
            age: Number(inputValue.age),
            gender: inputValue.gender,
            email: inputValue.email,
            active: JSON.parse(inputValue.active),
            id: getID(),
            password: inputValue.password,
            role: inputValue.role,
          });
          return arr;
        });
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
          // console.log(err.response.data.message,"aaaaaaaaa")
          if (err.response.data.message) alert(err.response.data.message);
        }

        // console.log(err.response.data.message)
      );
  };

  const handleDelete = (t) => {
    // console.log(user, "qqwwfdvxbwf");
    const id = t._id;
    axios
      .delete(`http://localhost:5000/delete-userData/${id}`,{headers:{Authorization:`Bearer ${props.tokenData}`}})
      .then((res) => {
        setUser(res.data.data)

        if (res.data.message) alert(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  // console.log(user, "qwertyuiop");
  // getting id
  const getID = () => {
    const maxID = user.reduce(
      (max, user) => (user.id > max ? user.id : max),
      0
    );

    return maxID + 1;
  };
  // update function
  const handleUpdate = (t) => {
    setInputValue({
      firstName: t.firstName,
      lastName: t.lastName,
      age: t.age,
      gender: t.gender,
      email: t.email,
      active: t.active,
      password: t.password,
      role: t.role,
    });
  };
  // set the values
  const checkData = () => {
    // console.log(data?._id,"vijay")
    const id = data?._id;
    console.log(props.tokenData,"qqqqqqqq")
    axios
      .patch(`http://localhost:5000/update-userData/${id}`, { ...inputValue },{headers:{Authorization:`Bearer ${props.tokenData}`}})
      .then((response) => {
        
        console.log(response,"asdfghjkl")
        // setUser((prev) => {
        //   const index = prev.findIndex((item) => item._id === id);
        //   if (index > -1) {
        //     user[index] = {
        //       ...user[index],
        //       firstName:inputValue.firstName,
        //       lastName: inputValue.lastName,
        //       gender: inputValue.gender,
        //       age: inputValue.age,
        //       active: inputValue.active,
        //       email: inputValue.email,
        //       password: inputValue.password,
        //       role: inputValue.role,
        //     };
        //   }
        // });
        // setUser([...user])
        setUser(response.data.data)
      });
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

    setUpdateBtn(false);
  };
   console.log(props, "daatat");
  const filterUser = user?.filter((item) => item._id != props.userId._id);
  // console.log(user, "hiii");
  const profile=user?.filter((item)=>item._id===props.userId._id)
  // console.log(userInfo,"idddd");
  // const filterRole=user?.filter((item)=>item._id===props.userId)
  // console.log(filterRole[0].role,"role")
  const prop=JSON.stringify(props);
  const userProp=JSON.parse(prop);
  console.log(userProp,"prop")

  return (
    <div>
      {/* {console.log(inputValue,"abiiiiii")} */}
      <Navbarroutes setUserId={userProp} setToken={props.tokenData}/>
     
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <div><Button type="primary" onClick={userModalOpen}>AddData</Button></div>
      <Modal
      open={userModal}
      // onCancel={userModalClose}
      onOk={()=>{
        userModalClose()
      }}
      footer={[
        <Button key="back" onClick={()=>{userModalClose();setUpdateBtn(false);
          setInputValue({
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            age: "",
            active: "",
            password: "",
            role: "",
          });}}>
          cancel
        </Button>,
       <Button className="p-1 m-2 border border-black"
       onClick={() => {
         updateBtn ? checkData() : handleSubmit();
         userModalClose()
       }}
       type="primary"
       disabled={
         // !productDetail.id ||
         updateBtn?!inputValue.firstName ||
         !inputValue.email ||
         !inputValue.lastName ||
         !inputValue.age ||
         !inputValue.gender ||
         inputValue.active.length===0 ||
         !inputValue.role:
         !inputValue.firstName ||
         !inputValue.email ||
         !inputValue.lastName ||
         !inputValue.age ||
         !inputValue.gender ||
         inputValue.active.length===0 ||
         !inputValue.password||
         !inputValue.role
       }
     >
       {updateBtn ? "Edit" : "Add"}
     </Button>

      ]}>
        <div>
      FirstName
      <input
        name="firstName"
        value={inputValue.firstName}
        onChange={onChange}
        className="p-1 m-2 border border-black"
      />
      <br />
      LastName
      <input name="lastName" value={inputValue.lastName} onChange={onChange} className="p-1 m-2 border border-black" />
      <br />
      Email
      <input name="email" value={inputValue.email} onChange={onChange}  className="p-1 m-2 border border-black"/>
      <br />
      Role
      <select
        name="role"
        value={inputValue.role}
        onChange={onChange}
        className="p-1 m-2 border border-black w-100"
      >
        <option value="">Select Role</option>
        <option value="Admin">Admin</option>
        <option value="Owner">Owner</option>
        <option value="SuperAdmin">Super Admin</option>
        <option value="Manager">Manager</option>
      </select>
      <br />
      Active
      <input name="active" value={inputValue.active} onChange={onChange} className="p-1 m-2 border border-black" />
      <br />
      Age
      <input name="age" value={inputValue.age} onChange={onChange} className="p-1 m-2 border border-black" />
      <br />
      Gender
      <input
        name="gender"
        type="radio"
        value="Male"
        onChange={onChange}
        checked={inputValue.gender === "Male"}
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
      {updateBtn?null:<div>
      Password
      <input
        name="password"
        value={inputValue.password}
        onChange={onChange}
        className="p-1 m-2 border border-black"
      ></input></div>}
      <br />
      {/* <Button className="p-1 m-2 border border-black"
        onClick={() => {
          updateBtn ? checkData() : handleSubmit();
        }}
        type="primary"
        disabled={
          // !productDetail.id ||
          !inputValue.firstName ||
          !inputValue.email ||
          !inputValue.lastName ||
          !inputValue.age ||
          !inputValue.gender ||
          inputValue.active.length===0 ||
          !inputValue.password||
          !inputValue.role
        }
      >
        {updateBtn ? "Edit" : "Add"}
      </Button> */}
      </div>
      </Modal>
      <div>
        {/* <button onClick={()=>navigate("/dyanamicform")}>Dyanamic Form</button>
        <button onClick={()=>navigate("/formDataDisplay")}>Dyanamic Form Data</button> */}
        {/* {console.log(profile[0]?._id,"sathish")} */}
        {/* <p>User:{profile?profile[0]?.firstName:"hello"}</p>
        <p>UserRole:{profile?profile[0]?.role:"hello"}</p> */}
       <div className="flex">
        <p><Button type="primary" onClick={()=>{navigate("/");localStorage.removeItem("myData");localStorage.removeItem("token");localStorage.removeItem("role");localStorage.removeItem("id")}}>LogOut</Button></p>
        <p><Button  type="primary" onClick={()=>{handleUpdate(profile[0]);setUpdateBtn(true);setData(profile[0]) ;console.log(data,"vimal");openModal()}}>edit</Button></p>
        </div>
      </div>
      </div>
      
        {/* {console.log("use", user)} */}
        {/* {
             
            user.length?user.map((value,index)=>(

               <div key={index}>{value.firstName}||
               {value.lastName}||
               {value.age}||
               {value.gender}||
               {value.email}||
               {value.active}<button onClick={()=>handleDelete(index)}>Delete</button></div>
            )):null
        } */}
      
      <div
        className="ag-theme-alpine"
        style={{ height: "600px", width: "100%" }}
      >
        <AgGridReact rowData={filterUser} columnDefs={columnDefs}></AgGridReact>
      </div>
      {/* <Modal
      open={editUserModal}
      onCancel={closeModal}>
      FirstName
      <input
        name="firstName"
        value={inputValue.firstName}
        onChange={onChange}
        className="p-1 m-2 border border-black"
      />
      <br />
      LastName
      <input name="lastName" value={inputValue.lastName} onChange={onChange} className="p-1 m-2 border border-black" />
      <br />
      Email
      <input name="email" value={inputValue.email} onChange={onChange}  className="p-1 m-2 border border-black"/>
      <br />
      Role
      <select
        name="role"
        value={inputValue.role}
        onChange={onChange}
        className="p-1 m-2 border border-black w-100"
      >
        <option value="">Select Role</option>
        <option value="Admin">Admin</option>
        <option value="Owner">Owner</option>
        <option value="SuperAdmin">Super Admin</option>
        <option value="Manager">Manager</option>
      </select>
      <br />
      Active
      <input name="active" value={inputValue.active} onChange={onChange} className="p-1 m-2 border border-black" />
      <br />
      Age
      <input name="age" value={inputValue.age} onChange={onChange} className="p-1 m-2 border border-black" />
      <br />
      Gender
      <input
        name="gender"
        type="radio"
        value="Male"
        onChange={onChange}
        checked={inputValue.gender === "Male"}
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
      Password
      <input
        name="password"
        value={inputValue.password}
        onChange={onChange}
        className="p-1 m-2 border border-black"
      ></input>
      <br />
      <Button className="p-1 m-2 border border-black"
        onClick={() => {
          updateBtn ? checkData() : handleSubmit();
        }}
        type="primary"
        disabled={
          // !productDetail.id ||
          !inputValue.firstName ||
          !inputValue.email ||
          !inputValue.lastName ||
          !inputValue.age ||
          !inputValue.gender ||
          inputValue.active.length===0 ||
          !inputValue.password||
          !inputValue.role
        }
      >
        {updateBtn ? "Edit" : "Add"}
      </Button>
      </Modal> */}
    </div>
  );
}

export default UserData;
