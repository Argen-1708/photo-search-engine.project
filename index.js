const form = document.getElementById("id");
const input = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");
let page = 1;

async function searchImages() {
  const inputData = input.value;
  if (!inputData) {
    return;
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=10&query=${inputData}&client_id=jPkrz-c5jLmTDe8fPsZnQcHsZ4bEFJBD0vh5F25aCbU`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const results = data.results;
    results.forEach((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");

      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResults.appendChild(imageWrapper);
    });

    page++;
    showMoreButton.style.display = "block";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchResults.innerHTML = "";
  searchImages();
});

showMoreButton.addEventListener("click", () => {
  searchImages();
});
