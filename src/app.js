const apiKey = 'AIzaSyC-4rdAxGbMzbyOY795nIQ2LiVKEpTupf0'; // 👈 your real key goes here

async function checkLink() {
  const input = document.getElementById("urlInput").value;
  const resultBox = document.getElementById("resultBox");

  if (!input) {
    setResult("❌ Please enter a URL. / कृपया एक लिंक दर्ज करें ❌", "neutral");

    return;
  }

  resultBox.textContent = "🔍 Validating link...";
  resultBox.style.color = "black";

  // Step 1: Check if URL exists
  try {
    const response = await fetch(input, { method: 'HEAD', mode: 'no-cors' });
    // if no error, continue to next step
  } catch (error) {
    setResult("❌ This URL is invalid or unreachable. / यह लिंक अमान्य है ❌", "neutral");

    return;
  }

  // Step 2: Scan for threats using Safe Browsing
  resultBox.textContent = "🔒 Scanning for threats...";

  const url = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=" + apiKey;

  const body = {
    client: {
      clientId: "hacktantrashield",
      clientVersion: "1.0"
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url: input }]
    }
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (Object.keys(data).length === 0) {
      setResult("✅ This site appears safe. / यह साइट सुरक्षित है ✅", "success");

    } else {
      setResult("⚠️ Warning! This site is unsafe! / ⚠️ यह साइट असुरक्षित है ❌", "warning");

    }
  } catch (error) {
    setResult("❌ Error during safety scan. / स्कैन के दौरान त्रुटि आई ❌", "neutral");

    console.error(error);
  }
}
function setResult(message, type) {
  const resultBox = document.getElementById("resultBox");
  resultBox.className = ""; // Remove any previous style
  resultBox.textContent = message;

  if (type === "success") {
    resultBox.classList.add("result-success");
  } else if (type === "warning") {
    resultBox.classList.add("result-warning");
  } else {
    resultBox.classList.add("result-neutral");
  }
}


