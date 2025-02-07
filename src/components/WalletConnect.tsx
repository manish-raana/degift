import { 
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink, 
  WalletDropdownDisconnect,
  ConnectWalletText,
} from '@coinbase/onchainkit/wallet'; 
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';

export function WalletConnect() {
  return (
    <div className="flex justify-end">
      <Wallet>
        <ConnectWallet className='bg-white dark:bg-black border py-1 px-1'>
          <ConnectWalletText>Connect Wallet </ConnectWalletText>
          <Avatar className="h-6 w-6 border border-gray-400 bg-gray-400" />
          {/* <Name className='dark:text-white text-gray-400 font-thin' /> */}
        </ConnectWallet>
        
        <WalletDropdown>
         <Identity 
            className="px-4 pt-3 pb-2 hover:bg-gray-800"
            hasCopyAddressOnClick
          >
            {/* <Avatar /> */}
            {/* <Name /> */}
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownLink 
            className='hover:bg-gray-800'
            icon="wallet" 
            href="https://keys.coinbase.com"
          >
            Wallet
          </WalletDropdownLink>
          <WalletDropdownDisconnect className='hover:bg-gray-800' />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}