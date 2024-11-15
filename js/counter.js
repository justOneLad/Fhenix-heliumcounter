fetch('../abi/contractABI.json')
    .then(response => response.json())
    .then(async (contractABI) => {
        // RPC URL for Fhenix Blockchain (replace with actual URL)
        const fhenixRpcUrl = "https://api.helium.fhenix.zone"; // Replace this with the actual Fhenix RPC URL

        // Ensure Web3 is loaded
        if (typeof window.ethereum !== 'undefined') {
            // If MetaMask is available, use it. Otherwise, fall back to the Fhenix RPC
            window.web3 = new Web3(window.ethereum);  // Use MetaMask as the Web3 provider
            await window.ethereum.enable();
        } else {
            // If MetaMask is not available, use the Fhenix RPC directly
            window.web3 = new Web3(new Web3.providers.HttpProvider(fhenixRpcUrl)); 
        }

        // Contract address (replace with your deployed contract address)
        const contractAddress = "0xA2395955B50bEA8709a1Be44198E4eFCb4a512B0"; 

        // Create the contract instance
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Get user account
        let accounts = await web3.eth.getAccounts();
        let userAccount = accounts[0];

        // Function to display the current count
        async function getCount() {
            const count = await contract.methods.getCount().call();
            document.getElementById("count").innerText = count;
        }

        // Initialize the count on load
        getCount();

        // Increment function
        window.increment = async function() {
            try {
                await contract.methods.increment().send({ from: userAccount });
                document.getElementById("status").innerText = "Count incremented!";
                getCount(); // Refresh count
            } catch (error) {
                document.getElementById("status").innerText = "Error: " + error.message;
            }
        };

        // Decrement function
        window.decrement = async function() {
            try {
                await contract.methods.decrement().send({ from: userAccount });
                document.getElementById("status").innerText = "Count decremented!";
                getCount(); // Refresh count
            } catch (error) {
                document.getElementById("status").innerText = "Error: " + error.message;
            }
        };
    });
