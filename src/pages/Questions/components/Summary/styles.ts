import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  max-width: 800px;
  margin: 0 auto;
  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      padding: 1rem 2rem;
      font-weight: 400;
      line-height: 1.5rem;
      text-align: left;
      color: var(--text-body);
    }

    td {
      padding: 1rem 2rem;
      color: var(--text-body);
      background: var(--shape);
      border: 0;

      &:first-child {
        color: var(--text-title);
        border-radius: 0.25rem 0 0 0.25rem;
      }

      &:last-child {
        border-radius: 0 0.25rem 0.25rem 0;
      }
      img {
        width: 40px;
      }
    }
  }

  button {
    margin: 0 0 0 auto;
  }

  @media only screen and (max-width: 768px) and (min-width: 320px) {
    padding: 1rem;
    button {
      width: 100%;
    }
  }
`;
