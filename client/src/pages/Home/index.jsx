import React, { useEffect } from 'react';
// import CardList from '../../components/CardList';
import Card from '../../components/Card';
import styled from 'styled-components';
import Terminal from '../../components/Terminal';
import { data } from '../../data';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signinWithGoogle } from '../../redux';
const StyledHome = styled.div`
  width: 50%;
  margin: 0 auto;
  text-align: center;

  .pageTitle {
    font-weight: 400;
    font-size: 35px;
  }
`;

const Home = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    await dispatch(signinWithGoogle());
    history.push('/dashboard');
  };

  return (
    <StyledHome>
      <p className="pageTitle">OAuth 2.0 Boilerplate</p>
      <Terminal />
      <Card key={data[0].name} {...data[0]} onClick={handleLogin} />
    </StyledHome>
  );
};
export default Home;
