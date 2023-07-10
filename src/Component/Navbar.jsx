import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Acontext } from "../App";
import { BsPersonFill, BsCartFill, BsGearFill, BsBoxArrowRight } from 'react-icons/bs';



import profileIcon from '../Images/account_thin.svg'; 

const Navbar = () => {
  const {isLogin,setisLogin, user}=useContext(Acontext)
  const {isadminloggedin, setisadminloggedin} = useContext(Acontext)
  const { search, setSearch } = useContext(Acontext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handlelogot=()=>{
    setIsDropdownOpen(!isDropdownOpen);
    setisLogin(false);
    setisadminloggedin(false);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ms-auto mb-2 mb-lg-0">
      <div className="container-fluid">
      
        <Link className="navbar-brand mx-4" to={isadminloggedin?'/kpi':'/product'}>
          Drink Kings
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          
            {isadminloggedin &&  (<li className="nav-item mx-2">
              <NavLink className="nav-link" aria-current="page" to="/kpi">
                Home
              </NavLink>
              </li>
            )
              }
              
          <li className="nav-item mx-2">
              <NavLink className="nav-link" aria-current="page" to="/product">
                Product
              </NavLink>
            </li>
          <li className="nav-item mx-2">
              <NavLink className="nav-link" aria-current="page" to="/alldata">
                Order
              </NavLink>
            </li>
{isadminloggedin && <>
  <li className="nav-item mx-2">
                <NavLink className="nav-link" aria-current="page" to="/Users">
                  Users
                </NavLink>
              </li>
  
              <li className="nav-item mx-2">
                <NavLink className="nav-link" aria-current="page" to="/Products">
                  Add Product
                </NavLink>
              </li></>
               
}


          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
                className="form-control"
              />
            </li>
            <li className="nav-item mx-2">
              <button
                className="btn btn-link nav-link"
                onClick={toggleDropdown}
              >{isLogin && <> <strong >{user.name} </strong> </>}
                <img src={profileIcon} alt="Profile" className="profile-icon" /> 
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-menu dropdown-menu-start show">
                  <li>
                    <Link className="dropdown-item" to="/profile" onClick={toggleDropdown}>
                      <BsPersonFill className="me-2" /> Profile
                    </Link>
                  </li>
                  {isadminloggedin?null:<li>
                    <Link className="dropdown-item" to="/cart" onClick={toggleDropdown}>
                      <BsCartFill className="me-2" /> Cart 
                    </Link>
                  </li>}
                  
                  
                  {isLogin && (
                    <>
                    <li>
                    <Link className="dropdown-item" to="/" onClick={toggleDropdown}>
                      <BsGearFill className="me-2" /> Settings
                    </Link>
                  </li>
                    <li>
                    <Link className="dropdown-item" to="/" onClick={handlelogot} >
                      <BsBoxArrowRight className="me-2" /> Logout
                    </Link>
                  </li>
                  </>
                  )}
                  {!isLogin && (
                    <li>
                    <Link className="dropdown-item" to="/" onClick={handlelogot} >
                      <BsBoxArrowRight className="me-2" /> Login
                    </Link>
                  </li>
                  )}
                  
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
