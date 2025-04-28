document.addEventListener("DOMContentLoaded", async function () {
    const toggleEnrollment = document.getElementById("toggleEnrollment");
    const viewRegistrations = document.getElementById("viewRegistrations");
    const downloadData = document.getElementById("downloadData");
    const registrationsTable = document.getElementById("registrationsTable");
    const registrationsBody = document.getElementById("registrationsBody");

    // Fetch and set the current enrollment status
    async function loadEnrollmentStatus() {
        try {
            const response = await fetch("http://localhost:3000/api/enrollment");
            const data = await response.json();
            toggleEnrollment.checked = data.enabled;
        } catch (error) {
            console.error("Error fetching enrollment status:", error);
        }
    }

    await loadEnrollmentStatus();

    // Toggle enrollment status
    toggleEnrollment.addEventListener("change", async function () {
        try {
            await fetch("http://localhost:3000/api/enrollment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ enabled: toggleEnrollment.checked }),
            });
        } catch (error) {
            console.error("Error updating enrollment status:", error);
        }
    });

    // Load and display registrations
    async function loadRegistrations() {
        try {
            const response = await fetch("http://localhost:3000/api/registrations");
            const data = await response.json();
            registrationsBody.innerHTML = "";

            if (data.length === 0) {
                alert("No registrations found.");
                registrationsTable.style.display = "none";
                return;
            }

            data.forEach((user) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.firstName} ${user.middleName ? user.middleName + " " : ""}${user.lastName}</td>
                    <td>${user.gender}</td>
                    <td>${user.regNumber}</td>
                    <td>${user.mobile}</td>
                    <td>${user.email}</td>
                    <td><button class="delete-btn" onclick="removeEntry('${user._id}')">Remove</button></td>
                `;
                registrationsBody.appendChild(row);
            });
            registrationsTable.style.display = "table";
        } catch (error) {
            console.error("Error fetching registrations:", error);
        }
    }

    viewRegistrations.addEventListener("click", loadRegistrations);

    // Delete a registration
    window.removeEntry = async function (id) {
        if (confirm("Are you sure you want to remove this entry?")) {
            try {
                const response = await fetch(`http://localhost:3000/api/registrations/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    loadRegistrations(); // Refresh the list after deletion
                } else {
                    console.error("Failed to delete registration.");
                }
            } catch (error) {
                console.error("Error deleting registration:", error);
            }
        }
    };

    // Download CSV
    downloadData.addEventListener("click", async function () {
        try {
            const response = await fetch("http://localhost:3000/api/registrations");
            const data = await response.json();

            if (data.length === 0) {
                alert("No registrations to download.");
                return;
            }

            let csvContent = "Register ID,First Name,Middle Name,Last Name,Gender,Registration No,Mobile,Email\n";
            data.forEach(user => {
                csvContent += Object.values(user).map(value => `"${value}"`).join(",") + "\n";
            });

            let blob = new Blob([csvContent], { type: "text/csv" });
            let link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "registrations.csv";
            link.click();
        } catch (error) {
            console.error("Error downloading CSV:", error);
        }
    });
});

function logout() {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "./login page/login.html";
  }
  











  //news code
  const newsTableBody = document.getElementById("newsTableBody");

  // Fetch and display news on load
  fetch('http://localhost:5000/api/news')
    .then(response => response.json())
    .then(newsItems => renderNews(newsItems))
    .catch(err => console.error('Error fetching news:', err));
  
  // Render the news items into the table
  function renderNews(newsItems) {
    newsTableBody.innerHTML = '';
    if (newsItems.length === 0) {
      newsTableBody.innerHTML = `<tr><td colspan="4" class="no-news">No news added yet.</td></tr>`;
      return;
    }
  
    newsItems.forEach(news => {
      const row = document.createElement("tr");
      const date = new Date(news.date).toLocaleDateString();
  
      const textCell = document.createElement("td");
      const urlCell = document.createElement("td");
      const dateCell = document.createElement("td");
      const actionCell = document.createElement("td");
  
      const textInput = document.createElement("input");
      textInput.value = news.text;
      textInput.type = "text";
      textInput.disabled = true;
  
      const urlInput = document.createElement("input");
      urlInput.value = news.url;
      urlInput.type = "text";
      urlInput.disabled = true;
  
      textCell.appendChild(textInput);
      urlCell.appendChild(urlInput);
      dateCell.textContent = date;
      actionCell.classList.add("actions");
  
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
  
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.style.display = "none";
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete");
  
      editBtn.addEventListener("click", () => {
        textInput.disabled = false;
        urlInput.disabled = false;
        textInput.focus();
        editBtn.style.display = "none";
        saveBtn.style.display = "inline-block";
      });
  
      saveBtn.addEventListener("click", () => {
        const updatedText = textInput.value.trim();
        const updatedURL = urlInput.value.trim();
  
        fetch(`http://localhost:5000/api/news/${news._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: updatedText, url: updatedURL })
        })
        .then(response => response.json())
        .then(() => {
          textInput.disabled = true;
          urlInput.disabled = true;
          editBtn.style.display = "inline-block";
          saveBtn.style.display = "none";
          console.log("News updated successfully");
        })
        .catch(err => console.error("Error updating news:", err));
      });
  
      deleteBtn.addEventListener("click", () => deleteNews(news._id));
  
      actionCell.appendChild(editBtn);
      actionCell.appendChild(saveBtn);
      actionCell.appendChild(deleteBtn);
  
      row.appendChild(textCell);
      row.appendChild(urlCell);
      row.appendChild(dateCell);
      row.appendChild(actionCell);
  
      newsTableBody.appendChild(row);
    });
  }
  
  // Add new news item
  function addNews() {
    const text = document.getElementById("newsText").value.trim();
    const url = document.getElementById("newsURL").value.trim();
  
    if (text && url) {
      fetch('http://localhost:5000/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, url })
      })
      .then(response => response.json())
      .then(() => {
        fetch('http://localhost:5000/api/news')
          .then(response => response.json())
          .then(newsItems => renderNews(newsItems));
        document.getElementById("newsText").value = '';
        document.getElementById("newsURL").value = '';
      })
      .catch(err => console.error('Error adding news:', err));
    }
  }
  
  // Delete news item
  function deleteNews(id) {
    if (confirm("Delete this news item?")) {
      fetch(`http://localhost:5000/api/news/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        fetch('http://localhost:5000/api/news')
          .then(response => response.json())
          .then(newsItems => renderNews(newsItems));
      })
      .catch(err => console.error('Error deleting news:', err));
    }
  }
  
  
  