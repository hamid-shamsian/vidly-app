import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({
   path,
   component: Component,
   render,
   location,
   ...rest
}) => {
   return (
      <Route
         path={path}
         {...rest}
         render={props => {
            if (!auth.getCurrentUser())
               return (
                  <Redirect
                     to={{
                        pathname: "/login",
                        state: { from: location }
                     }}
                  />
               );
            return Component ? <Component {...props} /> : render(props);
         }}
      />
   );
};

export default ProtectedRoute;
