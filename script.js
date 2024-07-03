const sheetId = '1jq6AWJZ5AJ1EihVkIbtx0r1ZrmV9nuZPNjwBLQMsnNs';

const sheetName = encodeURIComponent("Sheet1");
const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

// const sheetUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
const sheetUrlSource = `https://docs.google.com/spreadsheets/d/${sheetId}/edit?usp=sharing`;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const contentDescriptionMap = await fetchContentDescriptionMap(sheetUrl);
        console.log('Fetched Map:', contentDescriptionMap);
        populateTable(contentDescriptionMap);
        const sheetUrlElement = document.getElementById('sheetUrl');
        sheetUrlElement.href = sheetUrlSource;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

function populateTable(contentDescriptionMap) {
    const snippetTable = document.getElementById('snippetTable');
    snippetTable.innerHTML = ''; // Clear any existing rows

    Object.keys(contentDescriptionMap).forEach(name => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = name;

        const actionCell = document.createElement('td');
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<i class="fa fa-copy"></i> Copy';
        copyButton.onclick = () => {
            copyToClipboard(contentDescriptionMap[name]);
            showToast(`The content of ${name} : ${contentDescriptionMap[name]} is copied successfully`);
        };

        actionCell.appendChild(copyButton);
        row.appendChild(nameCell);
        row.appendChild(actionCell);
        snippetTable.appendChild(row);
    });
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade');
    }, 100); // Show the toast quickly after creation

    setTimeout(() => {
        toast.classList.remove('fade');
        setTimeout(() => document.body.removeChild(toast), 500);
    }, 3000); // Keep the toast visible for 3 seconds
}
