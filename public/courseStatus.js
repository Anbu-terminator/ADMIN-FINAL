document.getElementById('courseStatusForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', document.getElementById('email').value);
    formData.append('dob', document.getElementById('dob').value);
    formData.append('name', document.getElementById('name').value);
    formData.append('courseName', document.getElementById('courseName').value);



    try {
        const response = await fetch('/api/course-status', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        document.getElementById('message').textContent = result.message || 'Course status uploaded successfully.';
    } catch (error) {
        console.error('Error uploading course status:', error.message);
        document.getElementById('message').textContent = 'An error occurred while uploading.';
    }
});
