document.getElementById('attendanceForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        email: document.getElementById('email').value,
        dob: document.getElementById('dob').value,
        name: document.getElementById('name').value,
        attendanceDetails: document.getElementById('attendanceDetails').value,
    };

    try {
        const response = await fetch('/api/attendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        document.getElementById('message').textContent = result.message || 'Error uploading attendance.';
    } catch (error) {
        console.error(error);
        document.getElementById('message').textContent = 'An error occurred.';
    }
});
