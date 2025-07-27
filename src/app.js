function checkLink() {
  const input = document.getElementById("urlInput").value;
  const resultBox = document.getElementById("resultBox");

  if (!input) {
    resultBox.textContent = "Please enter a link.";
    resultBox.style.color = "red";
    return;
  }

  // Placeholder logic for now
  if (input.includes("example")) {
    resultBox.textContent = "⚠️ This site might be unsafe!";
    resultBox.style.color = "red";
  } else {
    resultBox.textContent = "✅ This site appears safe.";
    resultBox.style.color = "green";
  }
}
