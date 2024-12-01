// Student Form Submission
document.getElementById('studentForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        alert('Student added successfully');
        event.target.reset(); // Reset the form after successful submission
    } else {
        const errorData = await response.json(); // Get error message
        alert(`Failed to add student: ${errorData.error || 'Unknown error'}`);
    }
});

// Search student functionality
async function searchStudent() {
    const searchTerm = document.querySelector('#searchBar').value.trim();
    if (!searchTerm) {
        alert("Please enter a name or ID to search.");
        return;
    }

    const response = await fetch(`/api/students?search=${encodeURIComponent(searchTerm)}`);
    
    if (response.ok) {
        const students = await response.json();
        displayStudents(students);
    } else {
        alert('Failed to retrieve student data');
    }
}

// Display search results
function displayStudents(students) {
    const searchResults = document.querySelector('#searchResults');
    searchResults.innerHTML = ''; // Clear previous results

    if (students.length === 0) {
        searchResults.innerHTML = '<p>No students found.</p>';
        return;
    }

    students.forEach(student => {
        const studentCard = document.createElement('div');
        studentCard.classList.add('card', 'mb-3');

        studentCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${student.name}</h5>
                <p class="card-text"><strong>Date of Birth:</strong> ${student.DateofBirth}</p>
                <p class="card-text"><strong>VLGE Registration Number:</strong> ${student.regno}</p>
                <p class="card-text"><strong>Gender:</strong> ${student.gender}</p>
                <p class="card-text"><strong>Nationality
:</strong> ${student.nation}</p>
                <p class="card-text"><strong>Father's Name:</strong> ${student.fatherName}</p>
                <p class="card-text"><strong>Mother's Name:</strong> ${student.motherName}</p>
                <p class="card-text"><strong>Address:</strong> ${student.address}</p>
                 <p class="card-text"><strong>City:</strong> ${student.city}</p>
                   <p class="card-text"><strong>State:</strong> ${student.state}</p>
                    <p class="card-text"><strong>Country:</strong> ${student.country}</p>
                <p class="card-text"><strong>Aadhar Number:</strong> ${student.aadhar}</p>
                <p class="card-text"><strong>Email:</strong> ${student.email}</p>
                <p class="card-text"><strong>Phone Number:</strong> ${student.phone}</p>
                <p class="card-text"><strong>PIN Code:</strong> ${student.pin}</p>
                <p class="card-text"><strong>Highest Education Level:</strong> ${student.education}</p>
                <p class="card-text"><strong>Previous Institution/Organization:</strong> ${student.previous}</p>
                <p class="card-text"><strong>Skills:</strong> ${student.skills}</p>
                <p class="card-text"><strong>Course:</strong> ${student.course}</p>
                 <p class="card-text"><strong>Preferred Batch Timings:</strong> ${student.time}</p>
                  <p class="card-text"><strong>Preferred Learning Mode:</strong> ${student.mode}</p>
                  <p class="card-text"><strong>Course:</strong> ${student.course}</p>
                  <p class="card-text"><strong>Course 1:</strong> ${student.course1}</p>
                  <p class="card-text"><strong>Course 2:</strong> ${student.course2}</p>

                  <p class="card-text"><strong>Course 3:</strong> ${student.course3}</p>
                  <p class="card-text"><strong>Course 4:</strong> ${student.course4}</p>
                  <p class="card-text"><strong>Fees Payment:</strong> ${student.fees}</p>
                <p class="card-text"><strong>Special Offer/Discount:</strong> ${student.offer || 'None'}</p>
                <p class="card-text"><strong>Duration:</strong> ${student.duration}</p>
                <button class="btn btn-warning" onclick="populateUpdateForm('${student._id}')">Update</button>
            </div>
        `;
        
        searchResults.appendChild(studentCard);
    });
}

// Populate the update form with the selected student's data
function populateUpdateForm(studentId) {
    const studentDetails = document.querySelectorAll('.card-body');
    studentDetails.forEach(async (card) => {
        const name = card.querySelector('.card-title').textContent;
        const DateofBirth = card.querySelector('p:nth-child(2)').textContent.split(": ")[1];
        const gender = card.querySelector('p:nth-child(3)').textContent.split(": ")[1];
        const nation = card.querySelector('p:nth-child(4)').textContent.split(": ")[1];
        const fatherName = card.querySelector('p:nth-child(5)').textContent.split(": ")[1];
        const motherName = card.querySelector('p:nth-child(6)').textContent.split(": ")[1];
        const address = card.querySelector('p:nth-child(7)').textContent.split(": ")[1];
        const city = card.querySelector('p:nth-child(8)').textContent.split(": ")[1];
        const state = card.querySelector('p:nth-child(9)').textContent.split(": ")[1];
        const country = card.querySelector('p:nth-child(10)').textContent.split(": ")[1];
        const aadhar = card.querySelector('p:nth-child(11)').textContent.split(": ")[1];
        const email = card.querySelector('p:nth-child(12)').textContent.split(": ")[1];
        const phone = card.querySelector('p:nth-child(13)').textContent.split(": ")[1];
        const pin = card.querySelector('p:nth-child(14)').textContent.split(": ")[1];
        const education = card.querySelector('p:nth-child(15)').textContent.split(": ")[1];
        const previous = card.querySelector('p:nth-child(16)').textContent.split(": ")[1];
        const skills = card.querySelector('p:nth-child(17)').textContent.split(": ")[1];
        const course = card.querySelector('p:nth-child(18)').textContent.split(": ")[1];
        const time = card.querySelector('p:nth-child(19)').textContent.split(": ")[1];
        const mode = card.querySelector('p:nth-child(20)').textContent.split(": ")[1];
        const fees = card.querySelector('p:nth-child(21)').textContent.split(": ")[1];
        const offer = card.querySelector('p:nth-child(22)').textContent.split(": ")[1] || '';
        const duration = card.querySelector('p:nth-child(23)').textContent.split(": ")[1];

        // Populate the update form fields
        document.querySelector('#updateStudentForm input[name="studentId"]').value = studentId;
        document.querySelector('#updateStudentForm input[name="name"]').value = name;
        document.querySelector('#updateStudentForm input[name="DateofBirth"]').value = DateofBirth;
        document.querySelector('#updateStudentForm input[name="gender"]').value = gender;
        document.querySelector('#updateStudentForm input[name="nation"]').value = nation;
        document.querySelector('#updateStudentForm input[name="fatherName"]').value = fatherName;
        document.querySelector('#updateStudentForm input[name="motherName"]').value = motherName;
        document.querySelector('#updateStudentForm input[name="address"]').value = address;
        document.querySelector('#updateStudentForm input[name="city"]').value = city;
        document.querySelector('#updateStudentForm input[name="state"]').value = state;
        document.querySelector('#updateStudentForm input[name="country"]').value = country;
        document.querySelector('#updateStudentForm input[name="aadhar"]').value = aadhar;
        document.querySelector('#updateStudentForm input[name="email"]').value = email;
        document.querySelector('#updateStudentForm input[name="phone"]').value = phone;
        document.querySelector('#updateStudentForm input[name="pin"]').value = pin;
        document.querySelector('#updateStudentForm input[name="education"]').value = education;
        document.querySelector('#updateStudentForm input[name="previous"]').value = previous;
        document.querySelector('#updateStudentForm input[name="skills"]').value = skills;
        document.querySelector('#updateStudentForm input[name="course"]').value = course;
        document.querySelector('#updateStudentForm input[name="time"]').value = time;
        document.querySelector('#updateStudentForm input[name="mode"]').value = mode;
        document.querySelector('#updateStudentForm input[name="fees"]').value = fees;
        document.querySelector('#updateStudentForm input[name="offer"]').value = offer;
        document.querySelector('#updateStudentForm input[name="duration"]').value = duration;
    });
}

// Update student functionality
document.getElementById('updateStudentForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch(`/api/students/${data.studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        alert('Student updated successfully');
        // Clear the form after successful update
        event.target.reset();
    } else {
        alert('Failed to update student');
    }
});
