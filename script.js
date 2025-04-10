// Firebase 연결
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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

// 저장 버튼 이벤트
document.getElementById("saveBtn").addEventListener("click", async () => {
  const date = document.getElementById("date").value;
  const address = document.getElementById("address").value;
  const content = document.getElementById("content").value;
  const result = document.getElementById("result").value;
  const worker = document.getElementById("worker").value;
  const satisfaction = document.getElementById("satisfaction").value;

  // 서명 이미지 데이터
  const signaturePad = document.getElementById("signature");
  const signatureData = signaturePad.toDataURL();

  // 이미지 파일은 이름만 저장 (업로드는 추후 작업)
  const beforeFile = document.getElementById("beforeUpload").files[0];
  const afterFile = document.getElementById("afterUpload").files[0];
  const beforeFileName = beforeFile ? beforeFile.name : "";
  const afterFileName = afterFile ? afterFile.name : "";

  try {
    await addDoc(collection(db, "reports"), {
      date,
      address,
      content,
      result,
      worker,
      satisfaction,
      signature: signatureData,
      beforeImage: beforeFileName,
      afterImage: afterFileName,
      timestamp: new Date()
    });

    alert("보고서가 저장되었습니다.");
    window.location.href = "board.html"; // 게시판 페이지로 이동
  } catch (e) {
    console.error("저장 중 오류 발생: ", e);
    alert("저장에 실패했습니다.");
  }
});
