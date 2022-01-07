import React from 'react';

import { Container, Content } from './styles';

interface ICardCarrossel {
  title: string;
  subTitle: string;
  img: {
    src: string;
    alt: string;
  };
}
export function CardCarrossel({ title, subTitle, img }: ICardCarrossel) {
  return (
    <Container>
      <Content>
        <h1>{title}</h1>
        <img src={img.src} alt={img.alt} />
        <p>{subTitle}</p>
      </Content>
    </Container>
  );
}
