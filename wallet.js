const bitcoin = window.bitcoinjslib;

const ztc = {
  messagePrefix: '\x18Zuttocoin Signed Message:\n',
  bech32: 'ztc',
  bip32: { public: 0x0488b21e, private: 0x0488ade4 },
  pubKeyHash: 0x42,
  scriptHash: 0x05,
  wif: 0x80
};

function generateWallet() {
  const keyPair = bitcoin.ECPair.makeRandom({ network: ztc });
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: ztc });
  const wif = keyPair.toWIF();
  const pin = prompt("Masukkan PIN Anda");
  const encrypted = CryptoJS.AES.encrypt(wif, pin).toString();

  document.getElementById("ztcAddress").textContent = address;
  document.getElementById("ztcPrivate").textContent = wif;
  localStorage.setItem("ztc_addr", address);
  localStorage.setItem("ztc_priv", encrypted);
  QRCode.toCanvas(document.getElementById('qrcode'), address);
}
