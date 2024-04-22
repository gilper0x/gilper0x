document.addEventListener('DOMContentLoaded', function () {
    const connectWalletButton = document.getElementById('connect-wallet');
    const stakeBnbButton = document.getElementById('stake-bnb');
    const withdrawBnbButton = document.getElementById('withdraw-bnb');
    const walletStatus = document.getElementById('wallet-status');
    const stakingStatus = document.getElementById('staking-status');
    const contractInfo = document.getElementById('contract-info');

    let provider;
    let signer;
    let contract;

    // Smart contract address and ABI
    const contractAddress = '0xYourContractAddress'; // Replace with the deployed contract address
    const contractABI = [
        {
            "constant": true,
            "inputs": [{"name": "_owner", "type": "address"}],
            "name": "stakes",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "stakes",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{"name": "_owner", "type": "address"}],
            "name": "stakeTimestamps",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
  // Connecting to MetaMask
    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await ethereum.request({ method: 'eth_requestAccounts' });
                providers = new ethers.providers.Web3Provider(window.ethereum);
                signer = provider.getSigner();
                walletStatus.innerText = 'Connected wallet';
                contract = new ethers.Contract(contractAddress, contractABI, signer);

                contractInfo.innerText = 'Smart contract connected';
            } catch (err) {
                walletStatus.innerText = 'Failed to connect';
                console.error(err);
            }
        } else {
            walletStatus.innerText = 'MetaMask not found';
        }
    }

    connectWalletButton.addEventListener('click', connectWallet);

    // Start staking
    async function stakeBnb() {
        if (contract) {
            try {
                await contract.stake({ value: ethers.utils.parseEther('0.1') }); // Staking 0.1 BNB
                stakingStatus.innerText = 'Staking started';
            } catch (err) {
                stakingStatus.innerText = 'Failed to start staking';
                console.error(err);
            }
        }
    }

    stakeBnbButton.addEventListener('click', stakeBnb);

    // Withdraw staking
    async function withdrawBnb() {
        if (contract) {
            try {
                await contract.withdraw();
                stakingStatus.innerText = 'Staking withdrawn';
            } catch (err) {
                stakingStatus.innerText = 'Failed to withdraw staking';
                console.error(err);
            }
        }
    }

    withdrawBnbButton.addEventListener('click', withdrawBnb);
});
