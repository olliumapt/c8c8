import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCufJnLmO2biBaDoSvtCAu8WGzRX-cEPgE",
  authDomain: "ollium-a6e5d.firebaseapp.com",
  projectId: "ollium-a6e5d",
  storageBucket: "ollium-a6e5d.appspot.com",
  messagingSenderId: "706733940523",
  appId: "1:706733940523:web:568a71971524e8c3cfaf6e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("saveBtn").addEventListener("click", async () => {
  const workDate = document.getElementById("workDate").value;
  const address = document.getElementById("address").value;
  const complaint = document.getElementById("complaint").value;
  const result = document.getElementById("result").value;
  const worker = document.getElementById("worker").value;
  const satisfaction = document.getElementById("satisfaction").value;

  const beforeFile = document.getElementById("beforeUpload").files[0];
  const afterFile = document.getElementById("afterUpload").files[0];
  const signatureDataUrl = document.getElementById("signatureImage").src;

  const beforeImage = await toDataUrl(beforeFile);
  const afterImage = await toDataUrl(afterFile);

  const data = {
    workDate,
    address,
    complaint,
    result,
    worker,
    satisfaction,
    beforeImage,
    afterImage,
    signature: signatureDataUrl
  };

  try {
    await addDoc(collection(db, "reports"), data);
    alert("보고서가 저장되었습니다.");
    window.location.href = "board.html";
  } catch (e) {
    console.error("저장 실패:", e);
    alert("저장 중 오류가 발생했습니다.");
  }
});

function toDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

document.getElementById("resetSignatureBtn").addEventListener("click", () => {
  const canvas = document.getElementById("signaturePad");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("signatureImage").src = "";
});

document.getElementById("captureSignatureBtn").addEventListener("click", () => {
  const canvas = document.getElementById("signaturePad");
  const dataUrl = canvas.toDataURL("image/png");
  document.getElementById("signatureImage").src = dataUrl;
});

document.getElementById("beforeUpload").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      document.getElementById("beforePreview").src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("afterUpload").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      document.getElementById("afterPreview").src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});
