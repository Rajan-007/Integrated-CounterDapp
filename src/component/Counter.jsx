import React, { useState } from 'react';
import { increment, decrement , getCount } from '../config/integration';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { polygonAmoy } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [polygonAmoy],
  ssr: true,
});

function App() {
  const [counter, setCounter] = useState(0); // Initialize counter state with 0
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const queryClient = new QueryClient();

  const handleIncrement = async () => {
    setIsLoading(true); // Set loading state while waiting for response
    try {
      const txn = await increment();
      setCounter((prevCounter) => prevCounter + 1); // Increment counter on success
    } catch (error) {
      console.error('Error incrementing counter:', error);
    } finally {
      setIsLoading(false); // Reset loading state
      console.log(counter);
      
    }
  };

  const handleDecrement = async () => {
    setIsLoading(true); // Set loading state while waiting for response
    try {
      const txn = await decrement();
      setCounter((prevCounter) => prevCounter - 1); // Decrement counter on success
    } catch (error) {
      console.error('Error decrementing counter:', error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  const handleGetCount = async () => {
    setIsLoading(true); // Set loading state while waiting for response
    try {
      const count = await getCount(); // Assume getCount is a function that fetches the current count from the contract
      setCounter(count); // Update the counter state with the retrieved value
    } catch (error) {
      console.error('Error fetching counter:', error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
};


  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="App">
            <h1>Simple Counter</h1>
            <p>Current Counter Value: {counter}</p>
            <button onClick={handleIncrement} disabled={isLoading}>
              {isLoading ? 'Incrementing...' : 'Increment Counter'}
            </button>
            <button onClick={handleDecrement} disabled={isLoading}>
              {isLoading ? 'Decrementing...' : 'Decrement Counter'}
            </button>
            <button onClick={handleGetCount} disabled={isLoading}>
              {isLoading ? 'waiting...' : ' Get value'}
            </button>
            <ConnectButton />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
