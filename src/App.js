import { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import MovieForm from "./components/MovieForm";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/common/NotFound";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/common/Logout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
   state = {};

   componentDidMount() {
      const user = auth.getCurrentUser();
      this.setState({ user });
   }

   render() {
      const { user } = this.state;
      return (
         <Fragment>
            <ToastContainer />
            <Navbar user={user} />
            <main className='container'>
               <Switch>
                  <Route path='/Register' component={RegisterForm} />
                  <Route path='/login' component={LoginForm} />
                  <Route path='/logout' component={Logout} />
                  <ProtectedRoute path='/movies/:id' component={MovieForm} />
                  <Route path='/movies' render={props => <Movies {...props} user={this.state.user} />} />
                  <Route path='/customers' component={Customers} />
                  <Route path='/rentals' component={Rentals} />
                  <Route path='/not-found' component={NotFound} />
                  <Redirect from='/' exact to='/movies' />
                  <Redirect to='/not-found' />
               </Switch>
            </main>
         </Fragment>
      );
   }
}

export default App;
