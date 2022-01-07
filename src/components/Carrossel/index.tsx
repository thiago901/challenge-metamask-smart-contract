import { Button } from '@mui/material';
import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  ReactNode,
} from 'react';
import { Countdown } from '../Countdown';
import {
  Container,
  Items,
  ItemCarrousselContainer,
  ContainerCountdown,
} from './styles';

interface IProps {
  children: ReactNode;
}

interface IItemCarrossel extends IProps {
  // eslint-disable-next-line react/no-unused-prop-types
  lifetimeSeconds: number;
}

interface IControls {
  id: string;
  lifetimeSeconds: number;
}

interface ICarrossel extends IProps {
  onFinish: () => void;
}

export function ItemCarrossel({ children }: IItemCarrossel) {
  return <ItemCarrousselContainer>{children}</ItemCarrousselContainer>;
}

export function Carrossel({ children, onFinish }: ICarrossel) {
  const [controls, setControls] = useState<IControls[]>([]);
  const [itemSelected, setItemSelected] = useState(0);
  const [timer, setTimer] = useState(0);

  const itemsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number>();

  const handleMoveScroll = useCallback(
    (position = 0) => {
      if (itemsRef.current) {
        const width = itemsRef.current.offsetWidth;
        itemsRef.current.scroll(width * position, 0);
      }
    },
    [itemsRef],
  );

  const handleAutoSlideShow = useCallback(
    newControls => {
      let select = itemSelected;

      if (select + 1 >= newControls.length) {
        clearInterval(intervalRef.current);
        onFinish();
      } else {
        select += 1;
        setItemSelected(select);
      }

      handleMoveScroll(select);
    },
    [handleMoveScroll, itemSelected, onFinish],
  );

  const handleScroll = useCallback(
    (position = 0) => {
      let internalPosition = position;
      if (position > controls.length - 1) {
        clearInterval(intervalRef.current);
        onFinish();
      }
      if (position < 0) {
        internalPosition = controls.length - 1;
      }

      setItemSelected(internalPosition);
      handleMoveScroll(internalPosition);
    },
    [controls, handleMoveScroll, onFinish],
  );
  const handleArrowNext = useCallback(() => {
    handleScroll(itemSelected + 1);
  }, [itemSelected, handleScroll]);

  useEffect(() => {
    if (Array.isArray(children)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newControls = children.map((c: any, index) => ({
        id: index.toString(),
        lifetimeSeconds: Number(c.props.lifetimeSeconds),
      }));
      setControls(newControls);
    }
  }, [children]);

  useEffect(() => {
    if (controls.length) {
      if (controls.length) {
        const funcSetIntervalIntern = setInterval(
          () => handleAutoSlideShow(controls),
          controls[itemSelected].lifetimeSeconds * 1000,
        );
        clearInterval(intervalRef.current);
        intervalRef.current = Number(funcSetIntervalIntern);
      }
      const internalTimer = () => {
        if (itemSelected > 0) {
          const a = controls[itemSelected - 1].lifetimeSeconds;
          const b = controls[itemSelected].lifetimeSeconds;
          return a === b ? a + 0.01 : b;
        }
        return controls[itemSelected].lifetimeSeconds;
      };
      setTimer(internalTimer);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [handleAutoSlideShow, controls, itemSelected]);

  return (
    <Container>
      <Items ref={itemsRef}>{children}</Items>
      <Button variant="contained" onClick={handleArrowNext}>
        {itemSelected + 1 >= controls.length ? 'Finalizar' : 'Proximo'}
      </Button>
      <ContainerCountdown>
        <Countdown leftTime={timer} />
      </ContainerCountdown>
    </Container>
  );
}
