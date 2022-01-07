import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  background: linear-gradient(160.26deg, #012365 0%, #0061af 100%);
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  h1 {
    color: '#fff';
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.6rem;
    max-width: 34.4rem;
    margin-bottom: 3.2rem;
    text-align: center;
  }
  p {
    color: '#fff';
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.4rem;
    text-align: center;
    margin-bottom: 1.6rem;
    max-width: 30.6rem;
  }

  img {
    max-height: 24.8rem;
    max-width: 44.7rem;
    margin-bottom: 3.2rem;
  }

  button {
    max-width: 32rem;
  }
`;
