import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50vw;
  input {
    display: none;
  }

  img {
    width: 100%;
    height: 13rem;
    object-fit: cover;
  }

  button {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
`;

export const Items = styled.div`
  display: flex;
  flex: 1;
  scroll-snap-type: x mandatory;

  overflow-x: hidden;
  scroll-behavior: smooth;
`;
export const ItemCarrousselContainer = styled.div`
  transition: all 1s;
  flex: none;
  width: 100%;

  scroll-snap-align: start;
`;
export const ContainerCountdown = styled.div`
  position: absolute;
  background: #000;
  color: #fff;
  right: 0;
  padding: 8px;
`;
