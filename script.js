// Function to fetch a new quote from type.fit API
async function fetchQuote() {
  try {
    const response = await fetch("https://type.fit/api/quotes");
    if (!response.ok) {
      throw new Error("Failed to fetch a new quote");
    }
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  } catch (error) {
    console.error(error);
  }
}
const quoteElement = document.getElementById("quote");
const authorElement = document.querySelector(".author");
// Function to update the quote in the HTML
function updateQuote(quote, author) {
  quoteElement.innerHTML = `<i class="fa fa-quote-left"></i> ${quote}<i class="fa fa-quote-right"></i>`;
  authorElement.textContent = `— ${author}`;
}

// Get new quote button click event listener
const newQuoteButton = document.querySelector(".btn button");
newQuoteButton.addEventListener("click", async () => {
  const quoteData = await fetchQuote();
  updateQuote(quoteData.text, quoteData.author);
});

// Initial quote fetch when the page loads
window.addEventListener("DOMContentLoaded", async () => {
  const quoteData = await fetchQuote();
  updateQuote(quoteData.text, quoteData.author);
});

//Copy quote to clip board.

function CopyToClipBoard() {
  const quoteText = quoteElement.innerText;
  const authorText = authorElement.innerText;

  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = `${quoteText} — ${authorText}`;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);

  const copyQuoteElement = document.querySelector(".copy-quote");
  copyQuoteElement.classList.add("copied");
  copyQuoteElement.textContent = "Quote copied!";
  setTimeout(() => {
    copyQuoteElement.classList.remove("copied");
    copyQuoteElement.textContent = "Copy quote";
  }, 2000);
}

const copyQuoteButton = document.querySelector(".copy-quote");
copyQuoteButton.addEventListener("click", CopyToClipBoard);
