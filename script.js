/* =========================================================
   DATA
========================================================= */
localStorage.removeItem("dateData");
localStorage.removeItem("selectedFoods");
localStorage.removeItem("selectedPlaces");
const images = [
    "images/01.jpg",
    "images/02.jpg",
    "images/03.jpg",
    "images/04.jpg",
    "images/05.jpg",
    "images/06.jpg",
    "images/07.jpg",
    "images/08.jpg",
    "images/09.jpg",
    "images/10.jpg"
];

const captions = [
    "Khoảnh khắc đầu tiên...",
    "Một ngày rất bình thường, nhưng có em.",
    "Có những nụ cười chẳng thể quên.",
    "Thời gian bên nhau trôi nhanh thật đó.",
    "Nếu ký ức có hình dạng, chắc là hình bóng em.",
    "Cảm ơn vì đã bước vào cuộc đời anh.",
    "Những điều nhỏ bé lại trở thành điều quý giá nhất.",
    "Anh thích cách chúng ta ở bên nhau.",
    "10 khoảnh khắc, nhưng hàng ngàn cảm xúc.",
    "Và anh vẫn muốn có thêm thật nhiều ngày như thế."
];


/* =========================================================
   DATE DATA
========================================================= */

let dateData = {
    date: "",
    time: ""
};

let selectedFoods = [];

let selectedPlaces = [];


/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveData() {

    localStorage.setItem(
        "loveDateData",
        JSON.stringify({
            dateData,
            selectedFoods,
            selectedPlaces
        })
    );
}

function loadData() {

    const saved =
        localStorage.getItem("loveDateData");

    if (!saved) return;

    try {

        const data =
            JSON.parse(saved);

        dateData =
            data.dateData || dateData;

        selectedFoods =
            data.selectedFoods || [];

        selectedPlaces =
            data.selectedPlaces || [];

    } catch (error) {

        console.log(
            "Không thể load dữ liệu."
        );
    }
}

// loadData();


/* =========================================================
   PAGE NAVIGATION
========================================================= */

const pages = {
    intro: document.getElementById("introPage"),
    gallery: document.getElementById("galleryPage"),
    date: document.getElementById("datePage"),
    food: document.getElementById("foodPage"),
    places: document.getElementById("placesPage"),
    confirm: document.getElementById("confirmPage"),
    envelope: document.getElementById("envelopePage"),
    letter: document.getElementById("letterPage")
};


function showPage(page) {

    Object.values(pages).forEach(
        currentPage => {

            currentPage.classList.remove(
                "active-page"
            );

        }
    );

    setTimeout(() => {

        page.classList.add(
            "active-page"
        );

    }, 50);
}


/* =========================================================
   MUSIC
========================================================= */

const music =
    document.getElementById("music");

const musicBtn =
    document.getElementById("musicBtn");


function startMusic() {

    music.play()
        .then(() => {

            musicBtn.classList.add(
                "playing"
            );

        })
        .catch(() => {});
}


musicBtn.addEventListener(
    "click",
    () => {

        if (music.paused) {

            music.play();

            musicBtn.classList.add(
                "playing"
            );

        } else {

            music.pause();

            musicBtn.classList.remove(
                "playing"
            );

        }

    }
);


/* =========================================================
   INTRO
========================================================= */

document
    .getElementById("startBtn")
    .addEventListener(
        "click",
        () => {

            startMusic();

            showPage(
                pages.gallery
            );

        }
    );


/* =========================================================
   GALLERY
========================================================= */

let currentImage = 0;

const mainPhoto =
    document.getElementById(
        "mainPhoto"
    );

const photoWrapper =
    document.getElementById(
        "photoWrapper"
    );

const backPhoto1 =
    document.getElementById(
        "backPhoto1"
    );

const backPhoto2 =
    document.getElementById(
        "backPhoto2"
    );

const currentNumber =
    document.getElementById(
        "currentNumber"
    );

const captionText =
    document.getElementById(
        "captionText"
    );

const dotsContainer =
    document.getElementById("dots");


/* CREATE DOTS */

images.forEach(
    (_, index) => {

        const dot =
            document.createElement(
                "div"
            );

        dot.className = "dot";

        if (index === 0) {
            dot.classList.add(
                "active"
            );
        }

        dot.addEventListener(
            "click",
            () => {

                goToImage(index);

            }
        );

        dotsContainer.appendChild(
            dot
        );

    }
);


function updateGallery() {

    photoWrapper.classList.add(
        "changing"
    );

    setTimeout(() => {

        mainPhoto.src =
            images[currentImage];

        captionText.textContent =
            captions[currentImage];

        currentNumber.textContent =
            String(
                currentImage + 1
            ).padStart(2, "0");


        backPhoto1.style.backgroundImage =
            `url(${images[
                (currentImage + 9) % 10
            ]})`;

        backPhoto2.style.backgroundImage =
            `url(${images[
                (currentImage + 1) % 10
            ]})`;


        document
            .querySelectorAll(".dot")
            .forEach(
                (dot, index) => {

                    dot.classList.toggle(
                        "active",
                        index === currentImage
                    );

                }
            );

    }, 250);


    setTimeout(() => {

        photoWrapper.classList.remove(
            "changing"
        );

    }, 800);

}


function goToImage(index) {

    currentImage = index;

    updateGallery();

    createHeartBurst();

}


function nextImage() {

    if (
        currentImage ===
        images.length - 1
    ) {

        return;

    }

    currentImage++;

    updateGallery();

    createHeartBurst();

}


function previousImage() {

    if (currentImage === 0) {
        return;
    }

    currentImage--;

    updateGallery();

    createHeartBurst();

}


document
    .getElementById("nextBtn")
    .addEventListener(
        "click",
        nextImage
    );


document
    .getElementById("prevBtn")
    .addEventListener(
        "click",
        previousImage
    );


document
    .getElementById("continueGallery")
    .addEventListener(
        "click",
        () => {

            showPage(
                pages.date
            );

        }
    );


/* KEYBOARD */

document.addEventListener(
    "keydown",
    event => {

        if (
            pages.gallery.classList.contains(
                "active-page"
            )
        ) {

            if (
                event.key === "ArrowRight"
            ) {
                nextImage();
            }

            if (
                event.key === "ArrowLeft"
            ) {
                previousImage();
            }

        }

    }
);


/* TOUCH SWIPE */

let touchStartX = 0;

document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.touches[0].clientX;

    }
);

document.addEventListener(
    "touchend",
    event => {

        const touchEndX =
            event.changedTouches[0].clientX;

        const difference =
            touchEndX - touchStartX;

        if (
            Math.abs(difference) < 50
        ) {
            return;
        }

        if (difference < 0) {
            nextImage();
        } else {
            previousImage();
        }

    }
);


/* 3D PHOTO */

photoWrapper.addEventListener(
    "mousemove",
    event => {

        const rect =
            photoWrapper.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left;

        const y =
            event.clientY -
            rect.top;

        const rotateY =
            ((x / rect.width) - .5)
            * 10;

        const rotateX =
            ((y / rect.height) - .5)
            * -10;

        photoWrapper.style.transform =
            `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.02)
            `;

    }
);

photoWrapper.addEventListener(
    "mouseleave",
    () => {

        photoWrapper.style.transform = "";

    }
);


/* =========================================================
   DATE PAGE
========================================================= */

const dateInput =
    document.getElementById(
        "dateInput"
    );

const timeInput =
    document.getElementById(
        "timeInput"
    );

if (dateData.date) {

    dateInput.value =
        dateData.date;

}

if (dateData.time) {

    timeInput.value =
        dateData.time;

}


dateInput.addEventListener(
    "change",
    () => {

        dateData.date =
            dateInput.value;

        saveData();

    }
);


timeInput.addEventListener(
    "change",
    () => {

        dateData.time =
            timeInput.value;

        saveData();

    }
);


document
    .getElementById("dateNextBtn")
    .addEventListener(
        "click",
        () => {

            dateData.date =
                dateInput.value;

            dateData.time =
                timeInput.value;


            if (!dateData.date) {

                shake(
                    dateInput
                );

                return;

            }

            if (!dateData.time) {

                shake(
                    timeInput
                );

                return;

            }


            saveData();

            showPage(
                pages.food
            );

        }
    );


/* =========================================================
   FOOD SELECTION
========================================================= */

const foodOptions =
    document.querySelectorAll(
        "#foodOptions .option-card"
    );

foodOptions.forEach(
    card => {

        const value =
            card.dataset.value;


        if (
            selectedFoods.includes(
                value
            )
        ) {

            card.classList.add(
                "selected"
            );

        }


        card.addEventListener(
            "click",
            () => {

                toggleSelection(
                    card,
                    selectedFoods,
                    value
                );

                updateFoodSummary();

                saveData();

            }
        );

    }
);


function toggleSelection(
    card,
    array,
    value
) {

    const index =
        array.indexOf(value);


    if (index === -1) {

        array.push(value);

        card.classList.add(
            "selected"
        );

        createMiniHeart(
            card
        );

    } else {

        array.splice(
            index,
            1
        );

        card.classList.remove(
            "selected"
        );

    }

}


function updateFoodSummary() {

    const summary =
        document.getElementById(
            "foodSummary"
        );

    summary.textContent =
        selectedFoods.length
            ? selectedFoods.join(" • ")
            : "Chưa chọn món nào";

}


updateFoodSummary();


document
    .getElementById("foodNextBtn")
    .addEventListener(
        "click",
        () => {

            if (
                selectedFoods.length === 0
            ) {

                shake(
                    document.getElementById(
                        "foodOptions"
                    )
                );

                return;

            }

            showPage(
                pages.places
            );

        }
    );


/* =========================================================
   PLACE SELECTION
========================================================= */

const placeOptions =
    document.querySelectorAll(
        "#placeOptions .option-card"
    );


placeOptions.forEach(
    card => {

        const value =
            card.dataset.value;


        if (
            selectedPlaces.includes(
                value
            )
        ) {

            card.classList.add(
                "selected"
            );

        }


        card.addEventListener(
            "click",
            () => {

                toggleSelection(
                    card,
                    selectedPlaces,
                    value
                );

                updatePlaceSummary();

                saveData();

            }
        );

    }
);


function updatePlaceSummary() {

    const summary =
        document.getElementById(
            "placeSummary"
        );

    summary.textContent =
        selectedPlaces.length
            ? selectedPlaces.join(" • ")
            : "Chưa chọn nơi nào";

}


updatePlaceSummary();


document
    .getElementById("placeNextBtn")
    .addEventListener(
        "click",
        () => {

            if (
                selectedPlaces.length === 0
            ) {

                shake(
                    document.getElementById(
                        "placeOptions"
                    )
                );

                return;

            }

            buildConfirmation();

            showPage(
                pages.confirm
            );

        }
    );


/* =========================================================
   CONFIRMATION
========================================================= */

function formatDate(
    dateString
) {

    if (!dateString) {
        return "--";
    }

    const date =
        new Date(
            dateString + "T00:00:00"
        );

    return date.toLocaleDateString(
        "vi-VN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


function buildConfirmation() {

    document.getElementById(
        "confirmDate"
    ).textContent =
        formatDate(
            dateData.date
        );


    document.getElementById(
        "confirmTime"
    ).textContent =
        dateData.time ||
        "--";


    const foodContainer =
        document.getElementById(
            "confirmFood"
        );

    const placeContainer =
        document.getElementById(
            "confirmPlaces"
        );


    foodContainer.innerHTML = "";

    placeContainer.innerHTML = "";


    selectedFoods.forEach(
        food => {

            const span =
                document.createElement(
                    "span"
                );

            span.textContent =
                food;

            foodContainer.appendChild(
                span
            );

        }
    );


    selectedPlaces.forEach(
        place => {

            const span =
                document.createElement(
                    "span"
                );

            span.textContent =
                place;

            placeContainer.appendChild(
                span
            );

        }
    );

}


document
    .getElementById("editBtn")
    .addEventListener(
        "click",
        () => {

            showPage(
                pages.food
            );

        }
    );


document
    .getElementById("confirmBtn")
    .addEventListener(
        "click",
        () => {

            createMassiveHeartBurst();

            setTimeout(
                () => {

                    showPage(
                        pages.envelope
                    );

                },
                1200
            );

        }
    );


/* =========================================================
   ENVELOPE
========================================================= */

const envelope =
    document.getElementById(
        "envelope"
    );

const openLetterBtn =
    document.getElementById(
        "openLetterBtn"
    );


openLetterBtn.addEventListener(
    "click",
    () => {

        envelope.classList.add(
            "opened"
        );


        openLetterBtn.style.opacity =
            "0";

        openLetterBtn.style.pointerEvents =
            "none";


        setTimeout(
            () => {

                showPage(
                    pages.letter
                );

                createLetterHearts();

            },
            1500
        );

    }
);


envelope.addEventListener(
    "click",
    () => {

        if (
            !envelope.classList.contains(
                "opened"
            )
        ) {

            envelope.classList.add(
                "opened"
            );

            openLetterBtn.style.opacity =
                "0";

            setTimeout(
                () => {

                    showPage(
                        pages.letter
                    );

                    createLetterHearts();

                },
                1500
            );

        }

    }
);


/* =========================================================
   LETTER DATA
========================================================= */

function updateLetter() {

    const letterDate =
        document.getElementById(
            "letterDate"
        );

    if (dateData.date) {

        letterDate.textContent =
            formatDate(
                dateData.date
            );

    }

}


updateLetter();


/* =========================================================
   PARTICLES
========================================================= */

function createParticles() {

    const container =
        document.getElementById(
            "particles"
        );

    for (
        let i = 0;
        i < 90;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );

        particle.className =
            "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            5 +
            Math.random() * 10 +
            "s";

        particle.style.animationDelay =
            Math.random() * 10 +
            "s";

        container.appendChild(
            particle
        );

    }

}

createParticles();


/* =========================================================
   PETALS
========================================================= */

function createPetals() {

    const container =
        document.getElementById(
            "petals"
        );

    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const petal =
            document.createElement(
                "div"
            );

        petal.className =
            "petal";

        petal.style.left =
            Math.random() * 100 +
            "%";

        petal.style.animationDuration =
            6 +
            Math.random() * 10 +
            "s";

        petal.style.animationDelay =
            Math.random() * 10 +
            "s";

        container.appendChild(
            petal
        );

    }

}

createPetals();


/* =========================================================
   HEART BURST
========================================================= */

function createHeartBurst() {

    const count = 14;

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );

        heart.className =
            "burst-heart";

        heart.textContent =
            Math.random() > .5
                ? "♥"
                : "♡";

        heart.style.fontSize =
            10 +
            Math.random() * 18 +
            "px";

        document.body.appendChild(
            heart
        );


        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            70 +
            Math.random() *
            150;

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;


        heart.animate(
            [
                {
                    transform:
                        "translate(-50%,-50%) scale(0)",

                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%,-50%) scale(1)",

                    opacity: 1
                },

                {
                    transform:
                        `
                        translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(.2)
                        `,

                    opacity: 0
                }
            ],
            {
                duration:
                    900 +
                    Math.random() * 700,

                easing:
                    "cubic-bezier(.16,1,.3,1)"
            }
        );


        setTimeout(
            () => heart.remove(),
            1800
        );

    }

}


/* =========================================================
   MASSIVE HEART BURST
========================================================= */

function createMassiveHeartBurst() {

    for (
        let i = 0;
        i < 90;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );

        heart.className =
            "burst-heart";

        heart.textContent =
            Math.random() > .4
                ? "♥"
                : "✦";

        heart.style.fontSize =
            6 +
            Math.random() * 22 +
            "px";


        document.body.appendChild(
            heart
        );


        const angle =
            Math.random() *
            Math.PI *
            2;

        const radius =
            100 +
            Math.random() *
            450;

        const x =
            Math.cos(angle) *
            radius;

        const y =
            Math.sin(angle) *
            radius;


        heart.animate(
            [
                {
                    transform:
                        "translate(-50%,-50%) scale(0)",

                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%,-50%) scale(1)",

                    opacity: 1
                },

                {
                    transform:
                        `
                        translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(.2)
                        `,

                    opacity: 0
                }
            ],
            {
                duration:
                    1200 +
                    Math.random() * 1300,

                easing:
                    "cubic-bezier(.16,1,.3,1)"
            }
        );


        setTimeout(
            () => heart.remove(),
            3000
        );

    }

}


/* =========================================================
   LETTER HEARTS
========================================================= */

function createLetterHearts() {

    const container =
        document.querySelector(
            ".final-hearts"
        );

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );

        heart.textContent =
            Math.random() > .5
                ? "♥"
                : "♡";

        heart.style.position =
            "fixed";

        heart.style.left =
            Math.random() * 100 +
            "%";

        heart.style.bottom =
            "-30px";

        heart.style.color =
            "#ff7d9f";

        heart.style.fontSize =
            8 +
            Math.random() * 18 +
            "px";

        heart.style.pointerEvents =
            "none";

        container.appendChild(
            heart
        );


        heart.animate(
            [
                {
                    transform:
                        "translateY(0) scale(.5)",

                    opacity: 0
                },

                {
                    transform:
                        "translateY(-30vh) scale(1)",

                    opacity: .6
                },

                {
                    transform:
                        "translateY(-110vh) scale(.2)",

                    opacity: 0
                }
            ],
            {
                duration:
                    7000 +
                    Math.random() * 7000,

                delay:
                    Math.random() * 5000,

                iterations: Infinity
            }
        );

    }

}


/* =========================================================
   MINI HEART
========================================================= */

function createMiniHeart(
    element
) {

    const heart =
        document.createElement(
            "span"
        );

    heart.textContent =
        "♥";

    heart.style.position =
        "absolute";

    heart.style.left =
        "50%";

    heart.style.top =
        "50%";

    heart.style.color =
        "#ff7198";

    heart.style.fontSize =
        "25px";

    heart.style.pointerEvents =
        "none";

    element.appendChild(
        heart
    );


    heart.animate(
        [
            {
                transform:
                    "translate(-50%,-50%) scale(0)",

                opacity: 0
            },

            {
                transform:
                    "translate(-50%,-120px) scale(1.3)",

                opacity: 1
            },

            {
                transform:
                    "translate(-50%,-170px) scale(.2)",

                opacity: 0
            }
        ],
        {
            duration: 900,
            easing:
                "cubic-bezier(.16,1,.3,1)"
        }
    );


    setTimeout(
        () => heart.remove(),
        1000
    );

}


/* =========================================================
   SHAKE
========================================================= */

function shake(element) {

    element.animate(
        [
            {
                transform:
                    "translateX(0)"
            },

            {
                transform:
                    "translateX(-8px)"
            },

            {
                transform:
                    "translateX(8px)"
            },

            {
                transform:
                    "translateX(-5px)"
            },

            {
                transform:
                    "translateX(5px)"
            },

            {
                transform:
                    "translateX(0)"
            }
        ],
        {
            duration: 400
        }
    );

}


/* =========================================================
   PRELOAD IMAGES
========================================================= */

images.forEach(
    src => {

        const img =
            new Image();

        img.src = src;

    }
);


/* =========================================================
   INITIAL GALLERY
========================================================= */

backPhoto1.style.backgroundImage =
    `url(${images[9]})`;

backPhoto2.style.backgroundImage =
    `url(${images[1]})`;

updateGallery();