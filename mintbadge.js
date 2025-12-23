// 1. Import the necessary library
const { ethers } = require("ethers");

// 2. Configuration - Replace these with your actual deployment details
const CONTRACT_ADDRESS = "0xYOUR_CONTRACT_ADDRESS_HERE";
const PRIVATE_KEY = "YOUR_SERVER_WALLET_PRIVATE_KEY"; // Keep this secret!
const PROVIDER_URL = "https://polygon-rpc.com"; // Polygon Network URL

// The "ABI" is the list of functions the contract has. 
// We only need the 'awardBadge' function for this script.
const CONTRACT_ABI = [
  "function awardBadge(address student, uint256 courseId) public"
];

async function mintStudentBadge(studentWalletAddress, courseId) {
  try {
    // 3. Connect to the Blockchain
    const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    
    // 4. Create a "Signer" (Your website's wallet that pays the tiny gas fee)
    const adminWallet = new ethers.Wallet(PRIVATE_KEY, provider);
    
    // 5. Connect to the Contract
    const badgeContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, adminWallet);

    console.log(`🚀 Minting badge ${courseId} for student: ${studentWalletAddress}...`);

    // 6. Execute the Minting transaction
    const tx = await badgeContract.awardBadge(studentWalletAddress, courseId);
    
    // 7. Wait for the transaction to be confirmed on the blockchain
    const receipt = await tx.wait();
    
    console.log(`✅ Success! Badge minted. Transaction Hash: ${receipt.transactionHash}`);
    return receipt.transactionHash;

  } catch (error) {
    console.error("❌ Minting failed:", error);
  }
}

// Example usage:
// mintStudentBadge("0xStudentWalletAddress", 0); // 0 is Astronomy 101
