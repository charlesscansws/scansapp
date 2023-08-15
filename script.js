// Constants
const apiKey = 'YOUR_GOOGLE_SHEETS_API_KEY';
const spreadsheetId = 'YOUR_SPREADSHEET_ID';
const sheetName = 'Sheet1';

// Function to fetch data from Google Sheets and populate the table
function fetchData() {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const rows = data.values.slice(1); // Exclude header row
            const tableBody = document.getElementById('dataBody');
            tableBody.innerHTML = ''; // Clear existing rows
            rows.forEach(row => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${row[0]}</td>
                    <td>${row[1]}</td>
                    <td>${row[2]}</td>
                    <td><button class="btn btn-warning" onclick="editEntry('${row[0]}')">Edit</button></td>
                    <td><button class="btn btn-danger" onclick="deleteEntry('${row[0]}')">Delete</button></td>
                `;
                tableBody.appendChild(newRow);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to save a new entry
function saveNewEntry() {
    const inputA = document.getElementById('inputA').value;
    const inputB = document.getElementById('inputB').value;
    const inputC = document.getElementById('inputC').value;

    const newEntry = [inputA, inputB, inputC];
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            values: [newEntry]
        })
    })
    .then(response => {
        if (response.status === 200) {
            // Clear inputs and refresh table
            document.getElementById('inputA').value = '';
            document.getElementById('inputB').value = '';
            document.getElementById('inputC').value = '';
            $('#newEntryModal').modal('hide'); // Close modal
            fetchData(); // Refresh table
        } else {
            console.error('Error saving data:', response);
        }
    })
    .catch(error => console.error('Error saving data:', error));
}

// Function to edit an entry (placeholder)
function editEntry(entryId) {
    // Implement editing functionality here
}

// Function to delete an entry (placeholder)
function deleteEntry(entryId) {
    // Implement deletion functionality here
}

// Fetch initial data
fetchData();
