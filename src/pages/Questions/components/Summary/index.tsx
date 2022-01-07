import { Button } from '@mui/material';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useEthereum } from '../../../../hooks/useEthereum';

import { Container } from './styles';

interface ISummary {
  questions: {
    question: string;
    answer: string;
  }[];
}

export function Summary({ questions }: ISummary) {
  const history = useHistory();
  const { submitAnswers } = useEthereum();
  const handleFinishQuiz = useCallback(async () => {
    await submitAnswers([0, 1, 2, 3]);

    history.push('/');
  }, [submitAnswers, history]);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Ansewer</th>
          </tr>
        </thead>

        <tbody>
          {questions.map(a => (
            <tr key={a.question}>
              <td>{a.question}</td>
              <td>{a.answer || 'Unanswered question'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="contained" onClick={handleFinishQuiz}>
        Send
      </Button>
    </Container>
  );
}
