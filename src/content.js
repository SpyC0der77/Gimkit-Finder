let newButton;
let stopExecution = false; // Global flag to control execution

function find() {
  // Exit if stopExecution is set to true
  if (stopExecution) {
    console.log("Script execution stopped.");
    return;
  }

  let div = document.querySelector(".sc-csuSiG");

  if (div) {
    clearInterval(interval);
    div.style.flexDirection = "column";
    div.style.justifyContent = "space-evenly";

    let elementToDuplicate = div.firstElementChild;
    elementToDuplicate = elementToDuplicate.firstElementChild;
    elementToDuplicate = elementToDuplicate.children[2];

    if (elementToDuplicate) {
      let clonedElement = elementToDuplicate.cloneNode(true);
      clonedElement.style.marginTop = "15px";
      console.log(clonedElement);

      clonedElement.firstElementChild.firstElementChild.innerHTML =
        "Find active game";

      newButton = clonedElement.firstElementChild.firstElementChild;

      clonedElement.addEventListener("click", async function () {
        if (stopExecution) {
          console.log("Execution has been stopped, no further actions.");
          return;
        }
        console.log("Starting search for active game codes...");
        await findActiveGameCodesInParallel(25);
      });

      div.firstElementChild.firstElementChild.appendChild(clonedElement);

      console.log("Element duplicated successfully!");
    } else {
      console.log("No child element found to duplicate.");
    }
  } else {
    console.log("Element not found.");
  }

  async function findActiveGameCode() {
    const pin = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
    const url = "https://www.gimkit.com/api/matchmaker/find-info-from-code";

    const data = {
      code: pin.toString()
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.status === 429) {
        console.warn("Received 429 Too Many Requests. Stopping execution.");
        stopExecution = true;
        newButton.innerText = "Too Many Requests - Stopped";
        return null;
      }

      const result = await response.json();

      if (result && !result.message) {
        console.log(`Active game found! Code: ${pin}`);
        newButton.parentElement.parentElement.remove();
        await storeGameCode(pin); // Store the found code
        return pin;
      } else {
        console.log(`No active game found for code: ${pin}`);
        document.querySelector("input").value = pin;
        return null;
      }
    } catch (error) {
      console.error("Error fetching game code:", error);
      return null;
    }
  }

  async function storeGameCode(pin) {
    chrome.storage.sync.get({ foundCodes: [] }, function (result) {
      const foundCodes = result.foundCodes;
      foundCodes.push(pin);

      chrome.storage.sync.set({ foundCodes }, function () {
        console.log("Code saved to storage:", pin);
      });
    });
  }

  async function findActiveGameCodesInParallel(requestsPerBatch) {
    let activeGameCode = null;

    newButton.innerText = "Searching...";

    while (!activeGameCode && !stopExecution) {
      const promises = [];

      for (let i = 0; i < requestsPerBatch; i++) {
        promises.push(findActiveGameCode());
      }

      try {
        const results = await Promise.all(promises);

        activeGameCode = results.find((result) => result !== null);

        if (activeGameCode) {
          console.log(`Found active game code: ${activeGameCode}`);
          let input = document.querySelector("input");

          input.value = activeGameCode;

          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));

          console.log("Input events dispatched to trigger validation.");
        } else {
          console.log(
            "No valid game code found in this batch, trying again..."
          );
        }
      } catch (error) {
        if (error.message.includes("Too many requests")) {
          stopExecution = true;
          newButton.innerText = "Too Many Requests - Stopped";
          return;
        }
      }
    }

    if (stopExecution) {
      newButton.innerText = "Too Many Requests - Stopped";
    } else {
      newButton.innerText = "Find active game";
    }

    return activeGameCode;
  }
}

let interval = setInterval(() => {
  find();
}, 100);
