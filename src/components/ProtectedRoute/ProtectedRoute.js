import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ children, loggedIn }) {
  return (
    <Route
      loggedIn={loggedIn}
      render={() => {
        return localStorage.getItem('token') ? children : <Redirect to='/' />;
      }}
    />
  );
}

export default ProtectedRoute;