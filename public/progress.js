document.getElementById('progressForm').addEventListener('input', calculateGrade);
document.getElementById('progressForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        email: document.getElementById('email').value,
        weeklyAssessment: Number(document.getElementById('weeklyAssessment').value),
        monthlyAssessment: Number(document.getElementById('monthlyAssessment').value),
        practicalExam: Number(document.getElementById('practicalExam').value),
        finalExam: Number(document.getElementById('finalExam').value),
        totalMarks: Number(document.getElementById('totalMarks').value),
        grade: document.getElementById('grade').value
    };

    try {
        const response = await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        document.getElementById('message').textContent = result.message || 'Progress saved successfully!';
    } catch (error) {
        console.error(error);
        document.getElementById('message').textContent = 'An error occurred.';
    }
});

function calculateGrade() {
    const weekly = Number(document.getElementById('weeklyAssessment').value) || 0;
    const monthly = Number(document.getElementById('monthlyAssessment').value) || 0;
    const practical = Number(document.getElementById('practicalExam').value) || 0;
    const finalExam = Number(document.getElementById('finalExam').value) || 0;

    const total = weekly + monthly + practical + finalExam;
    document.getElementById('totalMarks').value = total;

    let grade = 'FAIL';
    if (total > 95) grade = 'S';
    else if (total >= 85) grade = 'A+';
    else if (total >= 75) grade = 'A';
    else if (total >= 65) grade = 'B+';
    else if (total >= 55) grade = 'B';
    document.getElementById('grade').value = grade;
}
