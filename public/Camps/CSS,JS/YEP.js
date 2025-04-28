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
            {name: "Hitesh Kumar Sharma",batch: "2017 - 2020",rank: "SUO",image: "Achive_images/SUO Hitesh Kumar Sharma YEP.jpg"},
            {name: "Navaneet Singh",batch: "2022-2025",rank: "SUO",image: "Achive_images/Navaneet Singh.jpg"}
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