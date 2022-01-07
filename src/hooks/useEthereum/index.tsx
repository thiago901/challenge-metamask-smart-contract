/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-constructed-context-values */
import { ethers } from 'ethers';
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

import contractABI from '../../survey-ABI.json';
import AlertDialog from '../../components/AlertDialog';

interface EthereumState {
  wallet: string[];
  isConnected: boolean;
}

interface EthereumContextData {
  wallet: string[];
  isConnected: boolean;
  balance: string;
  isConnectedNetworkTest: boolean;
  connect(): Promise<void>;
  connectTestNetwork(): Promise<void>;
  submitAnswers(answers: number[]): Promise<any>;
}
interface IEthereumProvider {
  children: ReactNode;
}
const EthereumContext = createContext<EthereumContextData>(
  {} as EthereumContextData,
);

function EthereumProvider({ children }: IEthereumProvider) {
  const COD_CONTRACT = '0x74F0B668Ea3053052DEAa5Eedd1815f579f0Ee03';
  const ABI_CONTRACT = contractABI;
  const titleRef = useRef<string>('');
  const [data, setData] = useState<EthereumState>({} as EthereumState);
  const [isConnectedNetworkTest, setIsConnectedTest] = useState(false);

  const [balance, setBalance] = useState('');

  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const getBalance = useCallback(
    async (address: string) => {
      const { ethereum } = window as any;
      if (ethereum && ethereum.isConnected() && isConnectedNetworkTest) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          COD_CONTRACT,
          ABI_CONTRACT,
          signer,
        );
        const internalBalance = await contract.balanceOf(address);

        const value = ethers.utils.formatEther(internalBalance.toString());

        setBalance(value);
      }
    },
    [ABI_CONTRACT, COD_CONTRACT, isConnectedNetworkTest],
  );
  const connect = useCallback(async () => {
    if ((window as any).ethereum) {
      try {
        const address = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        });

        await getBalance(address[0]);

        setData({
          isConnected: true,
          wallet: address,
        });
        return;
      } catch (error: any) {
        console.log(error);
        titleRef.current =
          error.message || 'An error occurred, try again later';
        setIsOpenAlert(true);
      }
    } else {
      titleRef.current = 'Metamask not installed';
      setIsOpenAlert(true);
    }
  }, [getBalance]);

  const handleIsTestNetworkActived = useCallback(() => {
    const { ethereum } = window as any;

    return ethereum?.chainId === '0x3';
  }, []);

  const connectTestNetwork = useCallback(async () => {
    if (isConnectedNetworkTest) return;
    const { ethereum } = window as any;
    if (ethereum) {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x3' }],
      });
      setIsConnectedTest(true);
    }
  }, [isConnectedNetworkTest]);

  async function submitAnswers(answers: number[]) {
    const { ethereum } = window as any;
    if (ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          COD_CONTRACT,
          ABI_CONTRACT,
          signer,
        );
        await contract.submit(0, answers);

        const internalBalance = await contract.balanceOf(data.wallet[0]);

        const value = ethers.utils.formatEther(internalBalance.toString());
        console.log('value', value);

        setBalance(value);
      } catch (error: any) {
        titleRef.current =
          error.message || 'An error occurred, try again later';
        setIsOpenAlert(true);
      }
    }
  }
  useEffect(() => {
    setIsConnectedTest(handleIsTestNetworkActived);
  }, [handleIsTestNetworkActived]);

  useEffect(() => {
    const { ethereum } = window as any;
    if (ethereum) {
      const isConnected = ethereum.isConnected();
      if (isConnected) {
        connect();
      }
    }
  }, [connect]);

  return (
    <EthereumContext.Provider
      value={{
        connect,
        balance,
        wallet: data.wallet,
        isConnected: data.isConnected,

        connectTestNetwork,
        isConnectedNetworkTest,
        submitAnswers,
      }}
    >
      {children}
      {isOpenAlert && (
        <AlertDialog
          isOpen={isOpenAlert}
          title={titleRef.current}
          setIsOpen={setIsOpenAlert}
        />
      )}
    </EthereumContext.Provider>
  );
}

function useEthereum(): EthereumContextData {
  const context = useContext(EthereumContext);

  return context;
}

export { EthereumProvider, useEthereum };
