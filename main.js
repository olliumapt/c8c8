function saveComplaint() {
  const date = document.getElementById("workDate").value;
  const address = document.getElementById("address").value;
  const content = document.getElementById("complaint").value;
  const result = document.getElementById("result").value;
  const worker = document.getElementById("worker").value;
  const satisfaction = document.getElementById("satisfaction").value;

  const beforeImage = document.getElementById("beforeImage").src;
  const afterImage = document.getElementById("afterImage").src;

  const signature = document.getElementById("signatureImage").src;

  if (!date || !address || !content || !result || !worker || !satisfaction) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  const complaint = {
    date,
    address,
    content,
    result,
    worker,
    satisfaction,
    beforeImage,
    afterImage,
    signature,
    createdAt: new Date().toISOString()
  };

  let complaints = JSON.parse(localStorage.getItem("complaints") || "[]");
  complaints.push(complaint);
  localStorage.setItem("complaints", JSON.stringify(complaints));

  alert("민원이 저장되었습니다.");
}
