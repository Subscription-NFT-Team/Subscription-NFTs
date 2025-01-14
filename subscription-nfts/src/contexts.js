
import { createContext, useContext } from 'react';

export const AccountContext = createContext("");
export const ContractsContext = createContext({
    nftSubContract: null
})

export function useAccount() {
    return useContext(AccountContext);
}
export function useContracts() {
    return useContext(ContractsContext);
}

