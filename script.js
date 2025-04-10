function saveReport() {
  const report = {
    workDate: document.getElementById("workDate").value,
    address: document.getElementById("address").value,
    complaint: document.getElementById("complaint").value,
    result: document.getElementById("result").value,
    worker: document.getElementById("worker").value,
    satisfaction: document.getElementById("satisfaction").value,
    beforeImage: document.getElementById("beforeImage").src,
    afterImage: document.getElementById("afterImage").src,
    signature: canvas.toDataURL()
  };

  const savedReports = JSON.parse(localStorage.getItem("reports") || "[]");
  savedReports.push(report);
  localStorage.setItem("reports", JSON.stringify(savedReports));

  alert("보고서가 저장되었습니다! 게시판에서 확인하세요.");
}
