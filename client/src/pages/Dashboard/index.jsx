import React, { useEffect } from 'react';
import styled from 'styled-components';
// import { useAuth } from '../../components/actions/apis';
import { useHistory } from 'react-router-dom';
import AuthenticatedUser from '../../components/AuthenticatedUser';
import UnauthenticatedUser from '../../components/UnauthenticatedUser';
import { useSelector, useDispatch } from 'react-redux';
import { signout, saveSalesforceAccessToken } from '../../redux';
const StyledDashboard = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;

  .pageTitle {
    font-weight: 400;
    font-size: 35px;
  }
`;

const Dashboard = () => {
  // const { user, signout } = useAuth();
  const history = useHistory();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authenticated) {
      history.push('/');
    }
  }, [authenticated, history]);
  const logout = () => {
    dispatch(signout());
  };
  return (
    <StyledDashboard>
      {user ? (
        <AuthenticatedUser
          user={user}
          signout={logout}
          dispatch={dispatch}
          saveSalesforceAccessToken={saveSalesforceAccessToken}
        />
      ) : (
        <UnauthenticatedUser />
      )}
    </StyledDashboard>
  );
};

export default Dashboard;
