// JavaScript code for dynamic functionality

// Font size functionality
let fontSize = 16; // Initial font size in pixels

// Increase font size
document.getElementById('increase-font').addEventListener('click', function() {
    fontSize += 2; // Increase font size by 2 pixels
    document.body.style.fontSize = fontSize + 'px';
});

// Decrease font size
document.getElementById('decrease-font').addEventListener('click', function() {
    if (fontSize > 10) { // Ensure font size doesn't go below 10 pixels
        fontSize -= 2; // Decrease font size by 2 pixels
        document.body.style.fontSize = fontSize + 'px';
    }
});

// Reset font size to default
document.getElementById('reset-font').addEventListener('click', function() {
    fontSize = 16; // Reset font size to default (16 pixels)
    document.body.style.fontSize = '16px';
});





// 2nd and 3rd Division
 // Get the hamburger icon
 var navToggle = document.getElementById('nav-toggle');

 // Get the third division
 var division3 = document.getElementById('division3');

 // Add click event listener to the hamburger icon
 navToggle.addEventListener('click', function() {
     // Toggle the visibility of the third division
     division3.classList.toggle('active');
 });

 // Add resize event listener to the window object
 window.addEventListener('resize', function() {
     // If the viewport width is more than 600px
     if (window.innerWidth > 600) {
         // Remove the active class from the third division
         division3.classList.remove('active');
     }
 });


 const people = [
    {name: "Pratik Vijay Kukudhkar",batch: "2016 - 2019",rank: "SUO",image: "Achive_Images/SUO Pratik Vijay Kukudhkar.png"},
    {name: "Tasbir Singh",batch: "2016 - 2019",rank: "UO",image: "Achive_Images/UO Tasbir Singh.png"},
    {name: "Nandeep Singh Hada",batch: "2017 - 2020",rank: "CDT",image: "Achive_Images/Cadet Nandeep Singh Hada.png"},
    {name: "Lalit Gautam",batch: "2017 - 2020",rank: "CDT",image: "Achive_Images/Cadet Lalit Gautam.png"},
    {name: "Shahnaz Banu",batch: "2017 - 2020",rank: "CDT",image: "Achive_Images/Cadet Shanaz bano.png"},
    //{name: "Neeraj Bhatt",batch: "2017 - 2020",rank: "CDT",image: "Achive_Images/"},
    {name: "Vaishli Yadav",batch: "2017 - 2020",rank: "SGT",image: "Achive_Images/SGT Vaishali Yadav.png"},
    {name: "Hitesh Kumar Sharma",batch: "2018 - 2021",rank: "CDT",image: "Achive_Images/SUO Hitesh Kumar Sharma RDC.jpg"},
    {name: "Sunaina Goswami",batch: "2018 - 2021",rank: "UO",image: "Achive_Images/UO Sunaina Goswami.png"},
    {name: "Abhishek Sharma",batch: "2019 - 2022",rank: "CDT",image: "Achive_Images/Cadet Abhishek Sharma(18-21).png"},
    {name: "Ashish Kumar",batch: "2019 - 2022",rank: "UO",image: "Achive_Images/UO Ashish.jpg"},
    {name: "Omkar Nath",batch: "2019 - 2022",rank: "CPL",image: "Achive_Images/CPL Omkar Nath.png"},
    {name: "Deeksha Gaur",batch: "2020 - 2023",rank: "CDT",image: "Achive_Images/Cadet Deeksha.png"},
    {name: "Sumit Jangra",batch: "2020 - 2023",rank: "UO",image: "Achive_Images/Sumit Jangra.jpg"},
    {name: "Tushar",batch: "2020 - 2023",rank: "UO",image: "Achive_Images/Tushar.jpg"},
    {name: "Ishika Tripathi",batch: "2020 - 2023",rank: "SGT",image: "Achive_Images/Ishika Tripathi.jpg"},
    {name: "Karamjit Singh",batch: "2021 - 2024",rank: "L/CPL",image: "Achive_Images/UO Karamjit Singh.jpg"},
    {name: "Aman Sharma",batch: "2021 - 2024",rank: "SUO",image: "Achive_Images/Aman Sharma.jpg"},
    {name: "Abhishek Sharma",batch: "2021 - 2024",rank: "UO",image: "Achive_Images/Abhishek Sharma.jpg"},
    {name: "Navneet Singh",batch: "2022 - 2025",rank: "CPL",image: "Achive_Images/Navneet Singh.jpg"},
    {name: "Avinash Korrai",batch: "2022 - 2025",rank: "UO",image: "Achive_Images/UO AVINASH.jpeg"},
    {name: "Manas Kumar",batch: "2023 - 2026",rank: "L/CPL",image: "Achive_Images/MANAS.jpeg"},
    {name: "Malavika",batch: "2023 - 2026",rank: "L/CPL",image: "Achive_Images/Malavika.jpeg"}
];

function displayPersonDetails(person) {
    document.getElementById('personName').innerText = person.name;
    document.getElementById('personBatch').innerText = person.batch;
    document.getElementById('personRank').innerText = person.rank;
    document.getElementById('personImage').src = person.image;
    document.getElementById('personList').style.display = 'none';
    document.getElementById('personDetail').style.display = 'flex'; /* Make the details view visible */
    document.getElementById('personDetail').classList.add('fadeIn');
}

function backToList() {
    document.getElementById('personList').style.display = 'block';
    document.getElementById('personDetail').style.display = 'none'; /* Hide the details view */
    loadPeople();
}

function createPersonCard(person) {
    const card = document.createElement('div');
    card.className = 'col-12 col-sm-6 col-md-4 col-lg-2 mb-4 person-card shadow fadeIn'; // Added fade-in animation

    card.onclick = function () {
        displayPersonDetails(person)
    };

    const img = document.createElement('img');
    img.src = person.image;
    img.classList.add('img-fluid');
    card.appendChild(img);

    const name = document.createElement('h3');
    name.innerText = person.name;
    card.appendChild(name);

    const batch = document.createElement('p');
    batch.innerText = "Batch: " + person.batch;
    card.appendChild(batch);

    const rank = document.createElement('p');
    rank.innerText = "Rank: " + person.rank;
    card.appendChild(rank);

    return card;
}

function loadPeople() {
    const personListElement = document.getElementById('personCards');
    personListElement.innerHTML = ''; // Clear the list before reloading
    people.forEach(person => {
        const card = createPersonCard(person);
        personListElement.appendChild(card);
    });
}

// Initial load of people
loadPeople();




 //Contact Modal
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