import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import HomeIcon from '../assets/home.svg';
import TerminalTitleBar from './TerminalTitleBar';
import { StyledTerminal } from './style';
import { useHistory } from 'react-router-dom';

const StyledUnauthenticatedUser = styled.div``;

const UnauthenticatedUser = () => {
  let history = useHistory();
  const logout = () => {
    history.push('/');
  };
  return (
    <StyledUnauthenticatedUser>
      <p className="pageTitle"> Error 403: Forbidden</p>
      <StyledTerminal>
        <TerminalTitleBar />
        <div className="content">
          <pre>
            You tried to access a page you did not have prior authorization for.
            Please try again.
          </pre>
        </div>
      </StyledTerminal>
      <Card
        img={HomeIcon}
        txt={'Return Home'}
        color={'white'}
        href={'/'}
        fcn={logout}
      />
    </StyledUnauthenticatedUser>
  );
};

export default UnauthenticatedUser;
