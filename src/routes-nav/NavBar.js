import React, {useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import { Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem} from 'reactstrap';
import UserContext from "../UserContext";

function NavBar({logoutUser}){
    const user = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink className="nav-link" to="/">Book Wishlists</NavLink>
        </NavItem>
      {user ? 
      <>
        <NavItem>
          <NavLink style={{ color:'black' }} className="nav-link" to="/booklists">My Lists</NavLink>
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
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
