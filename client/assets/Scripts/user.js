// Replace 'YOUR_API_URL' with the actual API endpoint you want to fetch data from.
const apiUrl = 'http://localhost:5000/api/v1/';

const tableBody = document.getElementById('data-body');

// Function to create a table row from data
function createTableRow(data) {
  const row = document.createElement('tr');
  row.innerHTML = `
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td>${data?.location?.lat}, ${data?.location?.lng}</td>
        <td>
            <button class="approve-btn">Approve</button>
            <button class="disapprove-btn">Disapprove</button>
        </td>
    `;

  // Add click event listeners for approve/disapprove buttons
  const approveBtn = row.querySelector('.approve-btn');
  const disapproveBtn = row.querySelector('.disapprove-btn');

  approveBtn.addEventListener('click', async () => {
    // Add your approval logic here
    const userId = data._id; // Assuming user ID is in a property called 'id'
    const response = await axios.patch(`${apiUrl}approve-user/${userId}`);
    fetchData();
    alert(`Approved user with ID: ${userId}`);
  });

  disapproveBtn.addEventListener('click', async () => {
    // Add your disapproval logic here
    const userId = data._id; // Assuming user ID is in a property called 'id'
    const response = await axios.delete(`${apiUrl}delete-user/${userId}`);
    fetchData();
    alert(`Disapproved user with ID: ${userId}`);
  });

  return row;
}

// Function to fetch data from the API and populate the table
async function fetchData() {
  try {
    const response = await axios.get(`${apiUrl}users`);
    const data = response.data;

    // Clear existing table data
    tableBody.innerHTML = '';

    // Iterate through the data and create table rows
    data.forEach((item) => {
      const row = createTableRow(item);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Fetch and populate data when the page loads
fetchData();
