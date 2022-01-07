import React, { ReactNode } from 'react';

import { EthereumProvider } from './useEthereum';

// import { Container } from './styles';
interface IHooks {
  children: ReactNode;
}
export function Hooks({ children }: IHooks) {
  return <EthereumProvider>{children}</EthereumProvider>;
}
