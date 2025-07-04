const ztc = {
  messagePrefix: '\x18Zuttocoin Signed Message:\n',
  bech32: 'ztc',
  bip32: { public: 0x0488b21e, private: 0x0488ade4 },
  pubKeyHash: 0x42,
  scriptHash: 0x05,
  wif: 0x80
};

function generateWallet() {
  const keyPair = bitcoinjslib.ECPair.makeRandom({ network: ztc });
  const { address } = bitcoinjslib.payments.p2pkh({ pubkey: keyPair.publicKey, network: ztc });
  const wif = keyPair.toWIF();
  const pin = prompt("Masukkan PIN Anda");
  const encrypted = CryptoJS.AES.encrypt(wif, pin).toString();

  document.getElementById("ztcAddress").textContent = address;
  document.getElementById("ztcPrivate").textContent = wif;
  localStorage.setItem("ztc_addr", address);
  localStorage.setItem("ztc_priv", encrypted);
  QRCode.toCanvas(document.getElementById('qrcode'), address);
}

function importPrivateKey() {
  const wif = document.getElementById("importKey").value;
  try {
    const keyPair = bitcoinjslib.ECPair.fromWIF(wif, ztc);
    const { address } = bitcoinjslib.payments.p2pkh({ pubkey: keyPair.publicKey, network: ztc });
    const pin = prompt("Masukkan PIN Anda");
    const encrypted = CryptoJS.AES.encrypt(wif, pin).toString();

    document.getElementById("ztcAddress").textContent = address;
    document.getElementById("ztcPrivate").textContent = wif;
    localStorage.setItem("ztc_addr", address);
    localStorage.setItem("ztc_priv", encrypted);
    QRCode.toCanvas(document.getElementById('qrcode'), address);
  } catch (e) {
    alert("Invalid WIF format!");
  }
}

function sendZTC() {
  alert("Fitur kirim akan dihubungkan ke RPC node ZTC.");
}

function exportWallet() {
  const address = localStorage.getItem("ztc_addr");
  const encryptedPriv = localStorage.getItem("ztc_priv");
  const blob = new Blob([`Address: ${address}\nEncrypted WIF: ${encryptedPriv}`], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "ztc_wallet_backup.txt";
  link.click();
}

function startQRScan() {
  const video = document.getElementById("qr-video");
  video.style.display = "block";
  const scanner = new Html5Qrcode("qr-video");
  scanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      document.getElementById("toAddress").value = decodedText;
      scanner.stop();
      video.style.display = "none";
    },
    (errorMsg) => {}
  );
}
