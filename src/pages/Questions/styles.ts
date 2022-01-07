import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 50rem;

  form {
    display: flex;
    justify-content: center;
  }
  @media only screen and (max-width: 768px) and (min-width: 320px) {
    width: 100%;

    form {
      > div {
        width: 100vw;
        padding: 1rem;
      }
    }
  }
`;
export const Item = styled.div`
  background: #fff;
  border-radius: 0.6rem;

  & + & {
    margin-top: 1rem;
  }
`;
export const QuestionContainer = styled.div`
  padding: 1rem;
`;
export const ItemImageContainer = styled.div`
  width: 100%;
  height: 13rem;

  img {
    border-radius: 0.6rem 0.6rem 0 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
