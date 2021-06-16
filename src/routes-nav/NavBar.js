import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { NavbarBrand, Navbar, Nav, NavItem} from 'reactstrap';
import UserContext from "../UserContext";

function NavBar({logoutUser}){
    const user = useContext(UserContext);
    return(
    <div>
      <Navbar color="white" expand="md" >
          <Nav navbar>
          <NavbarBrand style={{"marginLeft": "10px"}} href="/">Book Wishlists</NavbarBrand>
          {user ? 
            <>
              <NavItem>
                <NavLink className="nav-link" to="/">My Lists</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/">Search Books</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/" onClick={logoutUser}>Logout {user.username}</NavLink>
              </NavItem>
            </>
            :
            <>
              {/* <NavItem>
                <NavLink className="nav-link" to="/">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/">Sign Up</NavLink>
              </NavItem> */}
            </>
          }
          </Nav>
      </Navbar>
    </div>
    )
}

export default NavBar;

