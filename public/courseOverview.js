document.getElementById('courseOverviewForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        email: document.getElementById('email').value,
        dob: document.getElementById('dob').value,
        name: document.getElementById('name').value,
        courseName: document.getElementById('courseName').value,
        courseName: document.getElementById('courseName1').value,
        courseName: document.getElementById('courseName2').value,
        courseName: document.getElementById('courseName3').value,
        courseName: document.getElementById('courseName4').value,
        courseDescription: document.getElementById('courseDescription').value,
    };

    try {
        const response = await fetch('/api/course-overview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        document.getElementById('message').textContent = result.message || 'Error uploading course overview.';
    } catch (error) {
        console.error(error);
        document.getElementById('message').textContent = 'An error occurred.';
    }
});
