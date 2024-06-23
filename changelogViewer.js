document.addEventListener("DOMContentLoaded", () => {
  const contentElement = document.getElementById("content");
  const paginationElement = document.getElementById("pagination");

  const itemsPerPage = 1;
  let currentPage = 1;
  let totalPages;
  let changelogItems = [];

  fetch(
    "https://raw.githubusercontent.com/Jalenzzz/restful_logs_test/main/changelogs/21-6-24.txt",
    {
      mode: "cors",
    }
  )
    .then((response) => response.text())
    .then((data) => {
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
      renderChangelogs();
      renderPagination();
    })
    .catch((error) => {
      console.error("Error fetching the changelog:", error);
      contentElement.innerHTML =
        "<p>Error loading changelog. Please try again later.</p>";
    });

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

  function renderPagination() {
    let paginationHtml = "";

    if (currentPage > 1) {
      paginationHtml += `<button onclick="goToPage(${
        currentPage - 1
      })">Previous</button>`;
    }

    const maxPages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    // Add "First Page" button
    if (startPage > 1) {
      paginationHtml += `<button onclick="goToPage(1)">First</button>`;
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationHtml += `<button onclick="goToPage(${i})" ${
        i === currentPage ? 'class="active"' : ""
      }>${i}</button>`;
    }

    if (currentPage < totalPages) {
      paginationHtml += `<button onclick="goToPage(${
        currentPage + 1
      })">Next</button>`;
      paginationHtml += `<button onclick="goToPage(${totalPages})">>></button>`;
    }

    paginationElement.innerHTML = paginationHtml;
  }

  function updateSidebarImage(pageNumber) {
    const sidebarImage = document.querySelector(".sidebar-image");
    sidebarImage.src = pageImages[pageNumber - 1]; // Subtract 1 to match array index
  }
  const pageImages = [
    "https://i.ibb.co/khp1j9X/image.png", // Image for Page 1
    "https://i.ibb.co/0rp83KV/image.png",
    "https://i.ibb.co/G93HtCY/image.png",
    "https://i.ibb.co/3z2StWY/image.png",
    "https://i.ibb.co/4VWCz2Z/image.png",
    "https://i.ibb.co/f2jXXvb/image.png",
    "https://i.ibb.co/PwSh701/image.png",
    "https://i.ibb.co/rGVzk0T/image.png",
    "https://i.ibb.co/gJF95yJ/image.png",
    "https://i.ibb.co/kM78rHt/image.png",
    "https://i.ibb.co/qdpLvXZ/image.png",
    "https://i.ibb.co/gmmV4L2/image.png",
    "https://i.ibb.co/WFMVj8n/image.png",
    "https://i.ibb.co/MVhtsYM/image.png",
    "https://i.ibb.co/CPfcZ2G/image.png",
    "https://i.ibb.co/djgQK3h/image.png",
    "https://i.ibb.co/djgQK3h/image.png",
    "https://i.ibb.co/gRgxrtN/image.png",
    "https://i.ibb.co/QHfpQng/image.png",
    "https://i.ibb.co/TPMYpTY/image.png",
    "https://i.ibb.co/d7YzFzb/image.png",
    "https://i.ibb.co/wyRttVD/image.png",
    "https://i.ibb.co/bQNGJzH/image.png",
    "https://i.ibb.co/Kx9K4Zd/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/ZV5g892/image.png",
    "https://i.ibb.co/Jcb8jj7/image.png",
    "https://i.ibb.co/8KmmBYW/image.png",
    "https://i.ibb.co/FX1KCjh/image.png",
    "https://i.ibb.co/1758wyK/image.png",
    "https://i.ibb.co/5vdcVYL/image.png",
    "https://i.ibb.co/LrF5yXH/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/FJhr4my/image.png",
    "https://i.ibb.co/XWTT2QV/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/Xp4LDcv/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/dmt3mTT/OldShift.gif",
    "https://i.ibb.co/VQQrDC7/image.png",
    "https://i.ibb.co/wc2NDTb/image.png",
    "https://i.ibb.co/F3D39x9/image.png",
    "https://i.ibb.co/cFLNTKk/image.png",
    "https://i.ibb.co/2Z1N8yb/image.png",
    "https://i.ibb.co/VjCMfM8/image.png",
    "https://i.ibb.co/X8XNtR0/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/Z6SpHXd/image.png",
    "https://i.ibb.co/5GtFFgR/image.png",
    "https://i.ibb.co/B2bwsrz/image.png",
    "https://i.ibb.co/Th0CpgH/image.png",
    "https://i.ibb.co/LknPdxh/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/84Wd0sp/image.png",
    "https://i.ibb.co/L17PDmM/image.png",
    "https://i.ibb.co/VYVjJt1/image.png",
    "https://i.ibb.co/ZTF0jtB/image.png",
    "https://i.ibb.co/RBRP3TG/image.png",
    "https://i.ibb.co/dKKNVYP/image.png",
    "https://i.ibb.co/XLcKgPK/image.png",
    "https://i.ibb.co/N90CsZ4/image.png",
    "https://i.ibb.co/PTSDdMH/image.png",
    "https://i.ibb.co/Mk4yYMZ/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/qrHyvb6/image.png",
    "https://i.ibb.co/TrbFJXw/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/PrR1gHW/image.png",
    "https://i.ibb.co/gTRKJf4/image.png",
  ];
  window.goToPage = (pageNumber) => {
    currentPage = pageNumber;
    renderChangelogs();
    renderPagination();
    updateSidebarImage(pageNumber);
  };
  updateSidebarImage(1); // Set the image for the initial page
});
