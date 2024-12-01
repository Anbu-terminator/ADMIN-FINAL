// Handle form submission to add a fee record
document.getElementById('addFeeForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const email = document.getElementById('email').value;
  const DateofBirth = document.getElementById('DateofBirth').value; // Corrected id reference
  const feesDue = document.getElementById('feesDue').value;
  const lastPaidDate = document.getElementById('lastPaidDate').value;

  try {
    // Send data to the server
    const response = await fetch('/addFee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, DateofBirth, feesDue, lastPaidDate }),
    });

    const result = await response.json();

    if (result.success) {
      alert('Fee record added successfully');
      loadFees(); // Reload the table
    } else {
      alert('Failed to add fee record');
    }
  } catch (error) {
    console.error('Error adding fee record:', error);
  }
});


// Function to fetch and display all fee records
async function loadFees() {
  try {
    const response = await fetch('/getFees');
    const data = await response.json();

    const feesTableBody = document.querySelector('#feesTable tbody');
    feesTableBody.innerHTML = ''; // Clear existing rows

    data.fees.forEach((fee) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${fee.email}</td>
        <td>${fee.DateofBirth}</td>
        <td>${fee.feesDue}</td>
        <td>${fee.lastPaidDate || 'N/A'}</td>
        <td>
          <button onclick="deleteFee('${fee._id}')">Delete</button>
        </td>
      `;

      feesTableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching fee records:', error);
  }
}

// Function to delete a fee record
async function deleteFee(id) {
  try {
    const response = await fetch(`/deleteFee/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (result.success) {
      alert('Fee record deleted successfully');
      loadFees(); // Reload the table
    } else {
      alert(result.message || 'Failed to delete fee record');
    }
  } catch (error) {
    console.error('Error deleting fee record:', error);
  }
}

// Load fees on page load
loadFees();
