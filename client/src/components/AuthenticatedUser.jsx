import React, { useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import LogoutIcon from '../assets/logout.svg';
import TerminalTitleBar from './TerminalTitleBar';
import ExternalSite from './ExternalSite';
import { StyledTerminal } from './style';
import SalesforceIcon from '../assets/salesforce.svg';
import EverythingDataIcon from '../assets/everythingdata.svg';
// import logOut from '../utils/logOut';

const StyledAuthenticatedUser = styled.div`
  width: 100%;
  .content-wrapper {
  }
  .terminalTitle {
    font-size: 16px;
    font-weight: bold;
  }
  .external-site-container {
  }
  .hero-section {
    width: 80%;
    margin: auto;
  }
  .token-information {
    padding: 20px 0px;
    text-align: left;
    width: 80%;
    margin: auto;
  }
`;

const AuthenticatedUser = ({
  user,
  signout,
  dispatch,
  saveSalesforceAccessToken,
}) => {
  const [accessToken, setAccessToken] = useState({});
  const getSalesforceToken = (token) => {
    if (token) {
      dispatch(saveSalesforceAccessToken(user, token));
      setAccessToken((prev) => ({ ...prev, salesforce: token }));
    }
  };
  const getEverythingData = (token) => {
    if (token) {
      setAccessToken((prev) => ({ ...prev, everythingData: token }));
    }
  };
  const getCamelcase = (string) => {
    return string.length > 0
      ? string.charAt(0).toUpperCase() + string.slice(1, string.length)
      : '';
  };
  return (
    <StyledAuthenticatedUser>
      <p className="pageTitle"> Welcome {user.name}</p>
      <div className="content-wrapper">
        <StyledTerminal>
          <TerminalTitleBar />
          <div className="content">
            <pre className="terminalTitle">
              Personal{' '}
              {/* {user.provider[0].toUpperCase() + user.provider.substring(1)}{' '} */}
              Account Information
            </pre>
            {Object.keys(user).map((key, idx) => {
              return (
                <pre key={idx}>
                  <b>{key}</b>: {user[key]}
                </pre>
              );
            })}
            <pre></pre>
          </div>
        </StyledTerminal>
        <section className="hero-section">
          <ExternalSite
            img={SalesforceIcon}
            href="salesforce"
            authorizationUrl="https://login.salesforce.com/services/oauth2/authorize"
            responseType="token"
            clientId="3MVG9LBJLApeX_PDSp._r0NQL0TH9VM4sZw2QN0NfqwJSuOBVbOvDukH6FQ6vUFKqfsH7BXeGFopzYEQncYyt"
            redirectUri=""
            getToken={(token) => getSalesforceToken(token)}
          />
          <ExternalSite
            img={EverythingDataIcon}
            href="everythingdata"
            authorizationUrl=""
            responseType=""
            clientId=""
            redirectUri=""
            getToken={(token) => getEverythingData(token)}
          />
        </section>
        <div className="token-information">
          <div>User Access Token:</div>
          {Object.keys(accessToken).map((item, idx) => (
            <div key={idx}>
              <label>{getCamelcase(item) + ': '}</label>
              <label style={{ wordBreak: 'break-all' }}>
                {accessToken[item]}
              </label>
            </div>
          ))}
        </div>
        <Card
          img={LogoutIcon}
          txt={'Logout'}
          color={'white'}
          onClick={signout}
        />
      </div>
    </StyledAuthenticatedUser>
  );
};

export default AuthenticatedUser;
