import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 50rem;
  margin: 0 auto;

  padding: 5rem;

  @media only screen and (max-width: 768px) and (min-width: 320px) {
    padding: 1rem;
  }
`;
export const Balance = styled.div`
  margin-right: 1.5rem;
  color: #fff;
  span {
    font-size: 1rem;
    display: block;
  }
  strong {
    font-size: 2rem;
  }

  @media only screen and (max-width: 768px) and (min-width: 320px) {
    margin: 0;
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button + button {
    margin-left: 1rem;
  }
  @media only screen and (max-width: 768px) and (min-width: 320px) {
    flex-direction: column;

    button {
      width: 100%;
      & + button {
        margin: 0;
        margin-top: 1rem;
      }
    }
  }
`;
export const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  text-align: center;
  color: #fff;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  button {
    width: 100%;
  }
`;
