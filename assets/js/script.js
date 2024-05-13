// async function pour récupérer une citation
async function fetchQuote() {
  try {
    // Afficher le loader
    document.getElementById("loader").style.display = "block";
    const response = await fetch("https://thatsthespir.it/api");
    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }
    const data = await response.json();
    // Masquer le loader une fois que la citation est chargée
    document.getElementById("loader").style.display = "none";
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// fonction pour afficher une citation
function renderQuote(quote) {
  const quoteContainer = document.getElementById("quoteContainer");
  quoteContainer.innerHTML = `
        <div class="quote">
        <img src="${quote.photo == '' || quote.photo.includes('capture') ? './assets/images/anonymous_emblem.png' : quote.photo}" alt="${quote.author}">
        <div class="quoteBlock">
            <blockquote>${quote.quote}</blockquote>
            <p>- ${quote.author}</p></div>
        </div>
    `;
  document.getElementById("randomBtn").addEventListener("click", generateQuote);
}

// fonction pour générer une citation
async function generateQuote() {
  try {
    const quoteData = await fetchQuote();
    renderQuote(quoteData);
  } catch (error) {
    alert("Failed to fetch quote. Please try again later.");
  }
}

// Appel à la fonction generateQuote() dès que la page est chargée
window.addEventListener("load", generateQuote);
