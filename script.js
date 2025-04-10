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
  const extra1File = document.getElementById("extra1Upload").files[0];
  const extra2File = document.getElementById("extra2Upload").files[0];
  const extra3File = document.getElementById("extra3Upload").files[0];
  const extra4File = document.getElementById("extra4Upload").files[0];

  const signatureDataUrl = document.getElementById("signatureImage").src;

  const beforeImage = await toDataUrl(beforeFile);
  const afterImage = await toDataUrl(afterFile);
  const extra1Image = await toDataUrl(extra1File);
  const extra2Image = await toDataUrl(extra2File);
  const extra3Image = await toDataUrl(extra3File);
  const extra4Image = await toDataUrl(extra4File);

  const data = {
    workDate,
    address,
    complaint,
    result,
    worker,
    satisfaction,
    beforeImage,
    afterImage,
    extra1Image,
    extra2Image,
    extra3Image,
    extra4Image,
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

// 서명 리셋 및 저장
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

// 이미지 미리보기 등록 함수
function handleImagePreview(inputId, previewId) {
  document.getElementById(inputId).addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        document.getElementById(previewId).src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

// 각 이미지 필드 연결
handleImagePreview("beforeUpload", "beforePreview");
handleImagePreview("afterUpload", "afterPreview");
handleImagePreview("extra1Upload", "extra1Preview");
handleImagePreview("extra2Upload", "extra2Preview");
handleImagePreview("extra3Upload", "extra3Preview");
handleImagePreview("extra4Upload", "extra4Preview");
