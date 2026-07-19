

const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const imageTitle = document.getElementById("imageTitle");
const imageCategory = document.getElementById("imageCategory");
const imageCounter = document.getElementById("imageCounter");

const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");



const galleryData = [];

galleryItems.forEach((item) => {

    const img = item.querySelector("img");
    const title = item.querySelector("h3").textContent;
    const category = item.querySelector("p").textContent;

    galleryData.push({
        src: img.src,
        title,
        category
    });

});

// Current Image Index
let currentIndex = 0;



galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        currentIndex = index;

        openLightbox(currentIndex);

    });

});

function openLightbox(index) {

    lightbox.classList.add("show");

    updateLightbox(index);

}


// UPDATE LIGHTBOX


function updateLightbox(index) {

    lightboxImage.src = galleryData[index].src;

    imageTitle.textContent = galleryData[index].title;

    imageCategory.textContent = galleryData[index].category;

    imageCounter.textContent = `${index + 1} / ${galleryData.length}`;

}


// NEXT IMAGE


nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= galleryData.length) {

        currentIndex = 0;

    }

    updateLightbox(currentIndex);

});


// PREVIOUS IMAGE


prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = galleryData.length - 1;

    }

    updateLightbox(currentIndex);

});



closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("show");

});

// Close by clicking outside image

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("show");

    }

});



document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("show")) return;

    if (e.key === "ArrowRight") {

        nextBtn.click();

    }

    if (e.key === "ArrowLeft") {

        prevBtn.click();

    }

    if (e.key === "Escape") {

        lightbox.classList.remove("show");

    }

});



filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Active Button

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach((item) => {

            if (filter === "all") {

                item.classList.remove("hide");

            }

            else if (item.classList.contains(filter)) {

                item.classList.remove("hide");

            }

            else {

                item.classList.add("hide");

            }

        });

    });

});



galleryData.forEach(image => {

    const img = new Image();

    img.src = image.src;

});



let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].screenX;

});

lightbox.addEventListener("touchend", (e) => {

    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();

});

function handleSwipe() {

    if (touchEndX < touchStartX - 50) {

        nextBtn.click();

    }

    if (touchEndX > touchStartX + 50) {

        prevBtn.click();

    }

}