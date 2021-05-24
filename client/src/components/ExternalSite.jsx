import React from 'react';
import OAuth2Login from 'react-simple-oauth2-login';

const ExternalSite = ({
  img,
  href,
  authorizationUrl,
  responseType,
  clientId,
  getToken,
}) => {
  const onSuccess = (response) => {
    // let result = { ...user, accessToken: response.access_token };
    // console.log(response);
    // saveUserToDB(result);
    // setAccessToken(response.access_token);
    getToken(response.access_token);
  };
  const onFailure = (response) => {
    console.log(response);
    // setAccessToken("Failed to get token");
  };

  return (
    <div>
      <OAuth2Login
        authorizationUrl={authorizationUrl}
        responseType={responseType}
        clientId={clientId}
        redirectUri={`${window.location.href.slice(
          0,
          window.location.href.indexOf(window.location.pathname),
        )}/auth/oauth2/callback`}
        onSuccess={onSuccess}
        onFailure={onFailure}
        className={'site__card_wrapper'}
      >
        <div className="site__card" href="#">
          <div
            className="site__card__background"
            style={{
              backgroundImage: `url(${img})`,
            }}
          ></div>
          <div className="site__card__content"></div>
          {href}
        </div>
      </OAuth2Login>
    </div>
  );
};

export default ExternalSite;
