import { useAccount, useContractRead } from 'wagmi';
import { useState, useEffect } from 'react';

// The address of the Smart Contract we created in the previous step
const CONTRACT_ADDRESS = "0xYOUR_CONTRACT_ADDRESS";

// We only need to check the "balanceOf" function to see if they own the badge
const CONTRACT_ABI = [
  "function balanceOf(address account, uint256 id) view returns (uint256)"
];

export function StoreAccessGate({ courseId, children }) {
  const { address, isConnected } = useAccount();
  const [hasAccess, setHasAccess] = useState(false);

  // Read the blockchain: "Does this address own this Course ID badge?"
  const { data: balance, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'balanceOf',
    args: [address, courseId],
    watch: true, // Automatically updates if they just finished a class!
  });

  useEffect(() => {
    if (balance > 0) {
      setHasAccess(true);
    }
  }, [balance]);

  if (!isConnected) return <p>Please connect your wallet to view earned rewards.</p>;
  if (isLoading) return <p>Checking your Interstellar credentials...</p>;

  return (
    <div>
      {hasAccess ? (
        <div className="unlocked-store">
          <h3>🚀 Congratulations, Wizard!</h3>
          <p>You've unlocked the exclusive merch for this tier.</p>
          {children} {/* This is where your Shopify/Printful products go */}
        </div>
      ) : (
        <div className="locked-store">
          <p>⚠️ This gear is only for graduates of Course #{courseId}.</p>
          <button onClick={() => window.location.href='/courses'}>Go to Class</button>
        </div>
      )}
    </div>
  );
}
