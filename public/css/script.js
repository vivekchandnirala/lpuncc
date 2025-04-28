// 1st Division
let fontSize = 17; // Default font size in pixels

function increaseFontSize() {
    fontSize += 2;
    document.body.style.fontSize = fontSize + 'px';
}

function decreaseFontSize() {
    if (fontSize > 10) {
        fontSize -= 2;
        document.body.style.fontSize = fontSize + 'px';
    }
}

function resetFontSize() {
    fontSize = 16;
    document.body.style.fontSize = fontSize + 'px';
}


// 2nd and 3rd Division
var navToggle = document.getElementById('nav-toggle');
var division3 = document.getElementById('division3');

navToggle.addEventListener('click', function () {
    division3.classList.toggle('active');
});

window.addEventListener('resize', function () {
    if (window.innerWidth > 600) {
        division3.classList.remove('active');
    }
});


// 4th Division
let currentIndex = 0;
const slides = document.querySelector('.slides');
const totalImages = document.querySelectorAll('.slides img').length;
let autoSlide;

function updateCarousel() {
    slides.style.transform = `translateX(${-currentIndex * 100}vw)`;
}

function nextSlide() {
    currentIndex++;
    updateCarousel();
    if (currentIndex === totalImages - 1) {
        setTimeout(() => {
            slides.style.transition = 'none';
            currentIndex = 0;
            updateCarousel();
            setTimeout(() => {
                slides.style.transition = 'transform 0.6s ease-in-out';
            }, 50);
        }, 600);
    }
}

function prevSlide() {
    if (currentIndex === 0) {
        slides.style.transition = 'none';
        currentIndex = totalImages - 2;
        updateCarousel();
        setTimeout(() => {
            slides.style.transition = 'transform 0.6s ease-in-out';
        }, 50);
    } else {
        currentIndex--;
        updateCarousel();
    }
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
}

document.querySelector('.next').addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

autoSlide = setInterval(nextSlide, 5000);



//5th devision
// === News Scroll Integration ===
const container = document.getElementById("newsContainer");
let sortedNews = [];
let newsIndex = 0;

fetch('http://localhost:5000/api/news') // Backend URL
    .then(response => response.json())
    .then(newsItems => {
        const now = new Date();

        sortedNews = newsItems
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(news => {
                const created = new Date(news.date);
                const diffDays = (now - created) / (1000 * 60 * 60 * 24);
                const isNew = diffDays <= 14;
                return {
                    text: news.text,
                    url: news.url,
                    isNew
                };
            });

        showNextNews(); // Start rotation
        setInterval(showNextNews, 12000); // Every 12s
    })
    .catch(err => console.error('Error fetching news:', err));

function showNextNews() {
    if (!sortedNews.length) return;

    container.innerHTML = '';

    const news = sortedNews[newsIndex];
    const update = document.createElement("div");
    update.className = "update" + (news.isNew ? " new-update" : "");
    update.innerHTML = `
        <span>${news.text}</span>
        <a class="read-more-button" href="${news.url}" target="_blank">Click Here</a>
    `;

    container.appendChild(update);

    newsIndex = (newsIndex + 1) % sortedNews.length;
}






// 9th Division
const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
    box.addEventListener('click', () => {
        window.location.href = box.dataset.link;
    });
});


// Contact Modal
function showContact() {
    let modal = document.getElementById("modalOverlay");
    modal.style.display = "flex";
    setTimeout(() => {
        modal.classList.add("active");
    }, 10);
}

function closeContact(event) {
    let modal = document.getElementById("modalOverlay");
    if (event.target === modal || event.target.classList.contains("close-btn")) {
        modal.classList.remove("active");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
}