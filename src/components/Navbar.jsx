import { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
   return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-5'>
         <NavLink className='navbar-brand' to='/'>
            Vidly
         </NavLink>
         <div className='collapse navbar-collapse'>
            <div className='navbar-nav'>
               <NavLink className='nav-item nav-link' to='/movies'>
                  Movies
               </NavLink>
               <NavLink className='nav-item nav-link' to='/customers'>
                  Customers
               </NavLink>
               <NavLink className='nav-item nav-link' to='/rentals'>
                  Rentals
               </NavLink>
               {!user && (
                  <Fragment>
                     <NavLink className='nav-item nav-link' to='/login'>
                        Login
                     </NavLink>
                     <NavLink className='nav-item nav-link' to='/register'>
                        Register
                     </NavLink>
                  </Fragment>
               )}
               {user && (
                  <Fragment>
                     <NavLink className='nav-item nav-link' to='/profile'>
                        {user.name}
                     </NavLink>
                     <NavLink className='nav-item nav-link' to='/logout'>
                        Logout
                     </NavLink>
                  </Fragment>
               )}
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
