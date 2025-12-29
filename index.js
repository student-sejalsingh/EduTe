const API_BASE_URL = "http://localhost:3000";

function flipCard(card) {
  if (card.classList.contains("answer")) {
    card.classList.remove("answer");
    card.innerText = "Q: What is Deadlock?";
  } else {
    card.classList.add("answer");
    card.innerText =
      "Deadlock occurs when processes wait indefinitely for resources.";
  }
}

function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

async function askGemini() {
  const input = document.getElementById("aiInput").value;
  const output = document.getElementById("aiOutput");

  if (!input) {
    output.innerText = "Please enter a question.";
    return;
  }

  output.innerText = "Thinking... 🤖";

  try {
    const response = await fetch(`${API_BASE_URL}/ask-gemini`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: `Explain in simple student-friendly way:\n${input}`
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Server error: ${response.status}`);
    }

    if (data.reply) {
      output.innerText = data.reply;
      document.getElementById("aiInput").value = "";
    } else if (data.error) {
      throw new Error(data.error);
    } else {
      output.innerText = "No response from AI.";
    }

  } catch (error) {
    output.innerText = "❌ Error: " + error.message;
    console.error("Full error:", error);
  }
}