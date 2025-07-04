const bitcoin = require("bitcoinjs-lib");
const axios = require("axios");

const ZTC_RPC = "http://127.0.0.1:8332"; // Ganti dengan node ZTC yang aktif
const ZTC_AUTH = {
  username: "rpcuser",
  password: "rpcpassword"
};

// SIMULASI — gunakan file atau DB untuk produksi
let keypair = null;

function generateAddress() {
  keypair = bitcoin.ECPair.makeRandom();
  const { address } = bitcoin.payments.p2pkh({ pubkey: keypair.publicKey });
  return {
    address,
    wif: keypair.toWIF()
  };
}

async function getBalance(address) {
  const result = await callZTC("getreceivedbyaddress", [address]);
  return { balance: result };
}

async function sendToAddress(to, amount) {
  const result = await callZTC("sendtoaddress", [to, amount]);
  return { txid: result };
}

async function callZTC(method, params) {
  const res = await axios.post(ZTC_RPC, {
    jsonrpc: "1.0",
    id: "ztc",
    method,
    params
  }, {
    auth: ZTC_AUTH
  });
  return res.data.result;
}

module.exports = {
  generateAddress,
  getBalance,
  sendToAddress
};
