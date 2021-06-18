import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem} from 'reactstrap';
import UserContext from "../UserContext";

function NavBar({logoutUser}){
    const user = useContext(UserContext);
    return(
    <div>
      <Navbar color="white" expand="md" >
          <Nav navbar>
          <NavItem>
              <NavLink className="nav-link" to="/">Book Wishlists</NavLink>
          </NavItem>
          {user ? 
            <>
              <NavItem>
                <NavLink className="nav-link" to="/booklists">My Lists</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/" onClick={logoutUser}>Logout {user.firstName}</NavLink>
              </NavItem>
            </>
            :
            <>
            </>
          }
          </Nav>
      </Navbar>
    </div>
    )
}

export default NavBar;

