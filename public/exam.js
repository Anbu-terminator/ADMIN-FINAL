document.getElementById('examForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const registrationNumber = document.getElementById('registrationNumber').value;
    const courseName = document.getElementById('courseName').value;

    const response = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, dob, registrationNumber, courseName }),
    });

    const messageDiv = document.getElementById('message');
    if (response.ok) {
        messageDiv.innerHTML = '<div class="alert alert-success">Exam details added successfully!</div>';
    } else {
        messageDiv.innerHTML = '<div class="alert alert-danger">Error adding exam details.</div>';
    }

    document.getElementById('examForm').reset();
});
