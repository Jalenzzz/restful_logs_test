document.addEventListener("DOMContentLoaded", () => {
  const contentElement = document.getElementById("content");
  const paginationElement = document.getElementById("pagination");

  // Set the number of items per page and the current page number
  const itemsPerPage = 1;
  let currentPage = 1;
  let totalPages;
  let changelogItems = [];

  // Get a reference to the sidebar image element
  const imageElement = document.querySelector(".sidebar-image");

  // Fetch the image URLs from a JSON file
  fetch("image_urls.json")
    .then((response) => response.json())
    .then((imageUrls) => {
      // Function to update the sidebar image based on the page number
      window.updateSidebarImage = (pageNumber) => {
        const imageUrl =
          imageUrls[pageNumber - 1] || "https://i.ibb.co/3dgp780/image.png";
        imageElement.src = imageUrl;
      };

      updateSidebarImage(1); // Set the image for the initial page
    })
    .catch((error) => {
      console.error(
        "Error fetching the image URLs for the sidebar image:",
        error
      );
    });

  fetch(
    "https://raw.githubusercontent.com/Jalenzzz/restful_logs_test/main/changelogs/23-7-24.txt",
    {
      mode: "cors",
    }
  )
    .then((response) => response.text())
    .then((data) => {
      // Process the text data into changelog items
      const lines = data.split("\n");
      let currentItem = "";

      lines.forEach((line) => {
        if (line.startsWith("# ")) {
          if (currentItem) {
            changelogItems.push(currentItem);
            currentItem = "";
          }
          currentItem = `<h1>${line.substring(2)}</h1>`;
        } else if (line.startsWith("- - ")) {
          currentItem += `<p><span class="bullet">•</span> <span class="sub-bullet">•</span> ${line.substring(
            4
          )}</p>`;
        } else if (line.startsWith("## ")) {
          currentItem += `<h2>${line.substring(3)}</h2>`;
        } else if (line.startsWith("- ")) {
          currentItem += `<p><span class="bullet">•</span> ${line.substring(
            2
          )}</p>`;
        } else if (line.startsWith("- - - ")) {
          currentItem += `<p><span class="bullet">•</span> <span class="sub-bullet">•</span>  ${line.substring(
            4
          )}</p>`;
        } else {
          currentItem += `<p>${line}</p>`;
        }
      });

      if (currentItem) {
        changelogItems.push(currentItem);
      }

      changelogItems = changelogItems.reverse();
      totalPages = Math.ceil(changelogItems.length / itemsPerPage) || 1;

      // Render initial content and pagination
      renderChangelogs();
      renderPagination();
    })
    .catch((error) => {
      console.error("Error fetching the changelog:", error);
      contentElement.innerHTML =
        "<p>Error loading changelog. Please try again later.</p>";
    });

  // Function to render changelog items based on current page
  function renderChangelogs() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = changelogItems.slice(startIndex, endIndex);

    let contentHtml = "";
    currentItems.forEach((item) => {
      contentHtml += item;
    });

    contentElement.innerHTML = contentHtml;
  }

  // Function to render pagination buttons
  function renderPagination() {
    let paginationHtml = "";

    // Previous page button
    if (currentPage > 1) {
      paginationHtml += `<button onclick="goToPage(${
        currentPage - 1
      })">Previous</button>`;
    }

    // Calculate visible page buttons range
    const maxPages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    // First page button
    if (startPage > 1) {
      paginationHtml += `<button onclick="goToPage(1)">First</button>`;
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      paginationHtml += `<button onclick="goToPage(${i})" ${
        i === currentPage ? 'class="active"' : ""
      }>${i}</button>`;
    }

    // Next and Last page buttons
    if (currentPage < totalPages) {
      paginationHtml += `<button onclick="goToPage(${
        currentPage + 1
      })">Next</button>`;
      paginationHtml += `<button onclick="goToPage(${totalPages})">Last</button>`;
    }

    paginationElement.innerHTML = paginationHtml;
  }

  // Function to navigate to a specific page
  window.goToPage = (pageNumber) => {
    currentPage = pageNumber;
    renderChangelogs();
    renderPagination();
    updateSidebarImage(pageNumber);
  };
});
