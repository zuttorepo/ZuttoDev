// Include bitcoinjs-lib from CDN
import initEcc from 'https://cdn.jsdelivr.net/npm/@bitcoin-js/tiny-secp256k1@2.1.3/esm/index.js';
import * as bitcoin from 'https://cdn.jsdelivr.net/npm/bitcoinjs-lib@6.1.0/esm/index.js';

window.generateWallet = async function () {
  await initEcc(); // init ECC if needed
  const keyPair = bitcoin.ECPair.makeRandom();
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  const wif = keyPair.toWIF();

  document.getElementById("ztcAddress").textContent = address;
  document.getElementById("ztcPrivate").textContent = wif;
  localStorage.setItem("ztc_addr", address);
  localStorage.setItem("ztc_priv", wif);
};
