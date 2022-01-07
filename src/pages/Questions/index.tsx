import React, { useCallback, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Radio } from '../../components/Forms/Radio';
import { Carrossel, ItemCarrossel } from '../../components/Carrossel';
import { Summary } from './components/Summary';

import QUIZ from '../../questions.json';

import {
  Container,
  Item,
  ItemImageContainer,
  QuestionContainer,
} from './styles';

interface IOption {
  label: string;
  value: string;
}
interface Question {
  id: string;
  question: string;
  image: string;
  lifetimeSeconds: number;
  options: IOption[];
}
interface IQuiz {
  title: string;
  image: string;
  questions: Question[];
}
interface IAnswers {
  question: string;
  answer: string;
}

export function Questions() {
  const [quiz, setQuiz] = useState<IQuiz>({} as IQuiz);
  const [answers, setAnswers] = useState<IAnswers[]>([]);
  const [finished, setfinished] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback((data: { [key: string]: string }) => {
    const newData = Object.keys(data).map(d => ({
      question: d,
      answer: data[d],
    }));

    setAnswers(newData);
  }, []);
  useEffect(() => {
    const questions = QUIZ.questions.map(q => {
      const options = q.options.map(opt => ({
        label: opt.text,
        value: opt.text,
      }));
      return {
        id: v4(),
        question: q.text,
        image: q.image,
        lifetimeSeconds: q.lifetimeSeconds,
        options,
      };
    });

    setQuiz({
      title: QUIZ.title,
      image: QUIZ.image,
      questions,
    });
  }, []);
  const teste = useCallback(() => {
    formRef.current?.submitForm();
    setfinished(true);
  }, []);
  return (
    <Container>
      {finished ? (
        <Summary questions={answers} />
      ) : (
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Carrossel onFinish={teste}>
            {quiz.questions?.map(q => (
              <ItemCarrossel lifetimeSeconds={q.lifetimeSeconds} key={q.id}>
                <Item key={q.id}>
                  <ItemImageContainer>
                    <img src={q.image} alt={q.question} />
                  </ItemImageContainer>
                  <QuestionContainer>
                    <h1>{q.question}</h1>
                    <Radio name={q.question} title="" items={q.options} />
                  </QuestionContainer>
                </Item>
              </ItemCarrossel>
            ))}
          </Carrossel>
        </Form>
      )}
    </Container>
  );
}
