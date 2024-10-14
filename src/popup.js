document.addEventListener("DOMContentLoaded", function () {
  const codeList = document.getElementById("code-list");
  const clearButton = document.getElementById("clear-codes");

  // Fetch and display the codes
  chrome.storage.sync.get({ foundCodes: [] }, function (result) {
    const foundCodes = result.foundCodes;

    if (foundCodes.length === 0) {
      codeList.innerHTML =
        '<div class="no-codes">No game codes found yet.</div>';
    } else {
      foundCodes.forEach((code) => {
        const li = document.createElement("li");
        li.className = "code-item";

        const codeText = document.createElement("span");
        codeText.className = "code-text";
        codeText.textContent = code;

        // Make the list item clickable and navigate to the join URL when clicked
        li.addEventListener("click", () => {
          const joinUrl = `https://www.gimkit.com/join?gc=${code}`;
          window.open(joinUrl, "_blank");
        });

        li.appendChild(codeText);
        codeList.appendChild(li);
      });
    }
  });

  // Clear codes when the button is clicked
  clearButton.addEventListener("click", function () {
    chrome.storage.sync.set({ foundCodes: [] }, function () {
      codeList.innerHTML =
        '<div class="no-codes">No game codes found yet.</div>';
      console.log("All codes cleared.");
    });
  });
});
