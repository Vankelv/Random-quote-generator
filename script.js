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
  if (author) {
    authorElement.textContent = `— ${author}`;
  } else {
    authorElement.textContent = "— Unknown Author";
  }
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
  const copy = document.querySelector(".copy");

  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = `${quoteText} — ${authorText}`;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);

  const copyQuoteElement = document.querySelector(".copy-quote");
  copyQuoteElement.classList.add("copied");
  copyQuoteElement.innerHTML = '<i class="fas fa-clipboard"></i><span></span>';
  setTimeout(() => {
    copyQuoteElement.classList.remove("copied");
    copyQuoteElement.innerHTML = '<i class="fas fa-clipboard"></i>';
  }, 2000);
}

const copyQuoteButton = document.querySelector(".copy-quote");
copyQuoteButton.addEventListener("click", CopyToClipBoard);

//Export quote as image

function exportAsImage() {
  const container = document.querySelector(".quote");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  // Create a new HTML5 canvas
  const canvas = document.createElement("canvas");
  canvas.width = containerWidth;
  canvas.height = containerHeight;

  // Get the canvas context
  const context = canvas.getContext("2d");

  // Create an image element with the quote container content
  const quoteImage = new Image();
  quoteImage.onload = () => {
    // Draw the quote container image onto the canvas
    context.drawImage(quoteImage, 0, 0, containerWidth, containerHeight);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "quote.png";

    // Programmatically click the link to trigger the download
    link.click();
  };

  // Render the quote container content onto the image element
  html2canvas(container)
    .then((canvas) => {
      quoteImage.src = canvas.toDataURL("image/png");
    })
    .catch((error) => {
      console.error("Failed to export quote as image:", error);
    });
}

const exportButton = document.querySelector("#export-button");
exportButton.addEventListener("click", exportAsImage);
