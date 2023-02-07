import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./header.css"
import { LoginContext } from '../ContextProvider/Context';
import { useNavigate ,NavLink} from 'react-router-dom';

const Header = () => {
 

  const { logindata, setLoginData } = useContext(LoginContext)
  // console.log(logindata)

  const history = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = async () => {

    let token = localStorage.getItem("userdatatoken");
    // console.log(token);
    const res = await fetch("https://password-reset-gi44.onrender.com/logout",{
        method:"GET",
        headers:{
            "content-Type":"application/json",
            "Authorization":token,
            Accept: "application/json"
        },
        credentials: "include"
    });

    const data = await res.json();
    console.log(data);

    if(data.status==201){
      console.log("use logout");
      localStorage.removeItem("userdatatoken");
      setLoginData(false)
      history("/");
    }else{
      console.log("error");
    }
  };

  const goDash = () => {
    history("/dashboard")
  }

  const goError = () => {
    history("*")
  }


  return (
    <>
      <header>
        <nav>
        <NavLink to="/"><h1>User Auth</h1></NavLink>
          <div className="avtar">
            {
              logindata.validUserOne ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick} >{logindata.validUserOne.name[0].toUpperCase()}</Avatar> :
                <Avatar style={{ background: "blue" }} onClick={handleClick} />
            }

          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {
              logindata.validUserOne ? (
                <>
                  <MenuItem onClick={() => {
                    goDash()
                    handleClose()
                  }}>Profile</MenuItem>

                  <MenuItem onClick={() => {
                    logoutuser()
                    handleClose()
                  }}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => {
                    goError()
                    handleClose()
                  }}>Profile</MenuItem>
                </>

              )
            }



          </Menu>
        </nav>
      </header>
    </>
  )
}

export default Header