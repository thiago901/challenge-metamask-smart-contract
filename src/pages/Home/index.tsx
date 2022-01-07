import React, { useCallback } from 'react';
import { Button } from '@mui/material';

import { useHistory } from 'react-router-dom';
import QUIZ from '../../questions.json';
import { Container, Balance, QuizContainer, Content } from './styles';
import { useEthereum } from '../../hooks/useEthereum';

export function Home() {
  const history = useHistory();
  const {
    isConnected,
    connect,
    balance,
    connectTestNetwork,
    isConnectedNetworkTest,
  } = useEthereum();
  const handleStartQuiz = useCallback(async () => {
    history.push('/quiz');
  }, [history]);

  return (
    <Container>
      <Content>
        {isConnected && (
          <Balance>
            <span>Seu Saldo: </span>
            <strong>{balance}</strong>
          </Balance>
        )}
        <Button variant="contained" onClick={connect}>
          {isConnected ? 'Connected' : 'Connect'}
        </Button>
        {isConnected && (
          <Button
            variant="contained"
            color={isConnectedNetworkTest ? 'success' : 'error'}
            onClick={connectTestNetwork}
          >
            {isConnectedNetworkTest
              ? 'Connected to ropsten'
              : 'Switch to ropsten'}
          </Button>
        )}
      </Content>

      <QuizContainer>
        <h1>{QUIZ.title}</h1>
        <img src={QUIZ.image} alt="img" />

        {isConnected && isConnectedNetworkTest ? (
          <Button variant="contained" onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        ) : (
          <span>
            {!isConnectedNetworkTest
              ? '**Switch to ropsten to start the search'
              : 'Log in to start the search'}
          </span>
        )}
      </QuizContainer>
    </Container>
  );
}
