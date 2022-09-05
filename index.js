const Web3 = require('web3');
const web3 = new Web3('input rpc adress');

const contractAddress = "0xa1B941c10c24338B5cAAFd90D083bF679c453218"; // Don't use

//sendTrx(privateKey);

const abi = require("./abi.json");
const contract = new web3.eth.Contract(abi, contractAddress)
const payableAmount = 0.27;
const referral = "0xa1B941c10c24338B5cAAFd90D083bF679c453218" // your referral address.
const hexDataToPass = contract.methods.buy(payableAmount*1000, referral).encodeABI();

(async function main() {
    const privateKeys = ['']; // should be imported;
    for (const privateKey of privateKeys) {
        // Send trxn right after the program launch, no delays is implemented.
        // Sending several times to increase chances is also not implemented.
        joinScam(privateKey);
    }

})();

async function joinScam(privateKey) {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const nonceNumber = await web3.eth.getTransactionCount(account.address);

    const trx = {
        from: account.address,
        gasPrice: web3.utils.toWei("12", 'Gwei'),
        gas: 354853,
        to: contractAddress,
        value: web3.utils.toWei(`${payableAmount}`, 'ether'),
        nonce: nonceNumber,
        data : hexDataToPass
    }

    const signedTRX = await web3.eth.accounts.signTransaction(trx, privateKey);
    web3.eth.sendSignedTransaction(signedTRX.rawTransaction)
        .on("error", (obj)=>(console.log("error,",obj)))
        .on("transactionHash", (obj)=>(console.log("transactionHash,",obj)))
        .on("receipt", (obj)=>(console.log("Transaction Confirmed,")))
}

