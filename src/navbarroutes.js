import React,{ useState} from 'react'

import {useNavigate} from 'react-router-dom'

// import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import axios from 'axios'
import {  Modal } from "antd";
import { Block } from '@mui/icons-material';
// import Dyanamicform from './dyanamicform'
// import FormDataDisplay from './formDataDisplay'


function Navbarroutes(props) {
  const [user,setUser]=useState(JSON?.parse(localStorage?.getItem('myData')));
  // const [user,setUser]=useState(props?.setUserId?.userId);
  const [token,setToken]=useState(localStorage.getItem('token'));
  const [userDetail,setUserDetail]=useState();
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
  const [editUserData,setEditUserData]=useState(false)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    
    setEditUserData(true);
    // const arr=userInfo.filter(i=>i._id=props.setUserId.userId._id)
    // setInputValue(arr)
    handleUpdate(user)
    setAnchorElUser(null);
  };
  const userModalClose=()=>{
    setEditUserData(false);
  }
  
    // const [userId,setUserId]=useState("")
    // const pages = ["Dyanamicform","FormData"];
    // const userInfo=[props.setUserId.userId.firstName,props.setUserId.userId.role ]
// const settings = ['Edit Profile', 'Logout'];
console.log(props.setEdit,"hello siva")
const onChange = (e) => {
  const { name, value } = e.target;
  setInputValue((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleUpdate = (t) => {
  setInputValue({
    firstName: t.firstName,
    lastName: t.lastName,
    age: t.age,
    gender: t.gender,
    email: t.email,
    active: t.active,
    role: t.role,
  });
};
const checkData = () => {
  console.log(user,"token")
  const id = props?.setUserId?.userId?._id;
  console.log(props?.setUserId?.userId?._id,"qqqqqqqq")
  console.log(inputValue,"input")
  axios
    .patch(`http://localhost:5000/update-userData/${id}`, { ...inputValue },{headers:{Authorization:`Bearer ${token}`}})
    .then((response) => {
      console.log(response,"tttttttttt")
      const a=response?.data?.data.filter(i=>i._id===id)
      const b= localStorage.getItem('myData');
     
      console.log(a,'aaaaaaaaa')
      localStorage.setItem('myData',JSON.stringify(a? a[0]:b));
      const c=JSON.parse(localStorage.getItem('myData'))
      // console.log(c?.a[0],"abina")
      setUser(c)
      
    })
    .catch(err=>{
      console.log("error",err)
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

  
};

const navigate=useNavigate();
  return (
    <div>
      {console.log(user,"use")}
      <Modal
      open={editUserData}
      onCancel={userModalClose}
      onOk={()=>{
        userModalClose()
      }}
      footer={[
        <Button key="back" onClick={()=>{userModalClose()}}>
          cancel
        </Button>,
       <Button  className="p-1 m-2 border border-black"
       onClick={() => {
          checkData() ;
         userModalClose()
       }}
       type="primary"
      //  disabled={
      //    // !productDetail.id ||
      //    !inputValue.firstName ||
      //    !inputValue.email ||
      //    !inputValue.lastName ||
      //    !inputValue.age ||
      //    !inputValue.gender ||
      //    inputValue.active.length===0 ||
      //    !inputValue.role
      //  }
     >
      Edit 
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
      </div>
      </Modal>
      
      <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          // </Typography> */} 
          {/* xs:none */}
          <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}> 
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{navigate("/dyanamicform")}}
                sx={{ my: 2, color: 'white'}}//display block
              >
                {page}
              </Button>
            ))} */}
            <Button
                onClick={()=>{navigate("/dyanamicform")}}
                sx={{ my: 2, color: 'white'}}//display block
              >
                Dyanamicform
                
              </Button>
              <Button
                onClick={()=>{navigate("/formDataDisplay")}}
                sx={{ my: 2, color: 'white'}}//display block
              >
                UserForm
                
              </Button>
              <Button
                onClick={()=>{navigate("/userData")}}
                sx={{ my: 2, color: 'white'}}//display block
              >
                UserPage
                
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0, display: {  md: 'flex' } }}>
          {/* {userInfo.map((page) => (
            // <span sx={{ my: 2, color: 'white',m:2 }}>{page}</span>
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white' }}
              >
                {page}
              </Button>
            ))} */}
            {/* {props.setUserId.userId.firstName} */}
            <span className='m-2'>{props?.setUserId?.userId?.firstName}</span>
            <span className='m-2'>{props?.setUserId?.userId?.role}</span>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={props?.setUserId?.userId?.firstName} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px', display:'block' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Button
             onClick={()=>handleCloseUserMenu()}>
              Edit Profile
             </Button>
             <Button
             onClick={()=>{navigate("/");localStorage.removeItem("myData");localStorage.removeItem("token");localStorage.removeItem("role");localStorage.removeItem("id")}}>
              LogOut
             </Button>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
     
      
      {/* <div>
        <ul class="flex">
            
            <li class="p-3">
              <Link to="/dyanamicform">Dyanamicform</Link>
            </li>
            <li class="p-3 items-center">
            <Link to="/formDataDisplay">FormData</Link>
            </li>
            <li class="p-3">
              <Link to="/interndeatil">InternDetail</Link>
            </li>
            <li class="p-3">
              <Link to="/Main">Educational Detail</Link>
            </li>
          </ul>
          </div> */}
          {/* <div class="flex">
            <ul class="flex">
              <li class="p-3"> {props.setUserId.firstName}</li>
              <li class="p-3">{props.setUserId.role}</li>
            </ul>
            <div class="p-3">
              fghjk
            </div>
          </div> */}
        </div>
        
    
  )
}

export default Navbarroutes