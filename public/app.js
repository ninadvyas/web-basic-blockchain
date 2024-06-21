const contractAddress = 'CONTRACT_ADDRESS';
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_value",
        "type": "string"
      }
    ],
    "name": "setValue",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getValue",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

let web3;
let contract;

async function init() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            contract = new web3.eth.Contract(contractABI, contractAddress);
            document.getElementById('setButton').addEventListener('click', setValue);
            document.getElementById('getButton').addEventListener('click', getValue);
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        console.log('Please install MetaMask!');
    }
}

async function setValue() {
  try {
      const value = document.getElementById('valueInput').value;
      console.log("Attempting to set value:", value);
      
      const accounts = await web3.eth.getAccounts();
      console.log("Current account:", accounts[0]);
      
      console.log("Calling contract method...");
      const result = await contract.methods.setValue(value).send({ from: accounts[0] });
      console.log("Transaction result:", result);
      
      alert("Value set successfully!");
  } catch (error) {
      console.error("Error setting value:", error);
      alert("Error setting value. Check console for details.");
  }
}

async function getValue() {
    const value = await contract.methods.getValue().call();
    document.getElementById('value').innerText = `Stored Value: ${value}`;
}

window.addEventListener('load', init);