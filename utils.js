async function fetchContentDescriptionMap(sheetUrl) {
    const response = await fetch(sheetUrl);
    const data = await response.text();

    const rows = data.split('\n').slice(1); // Skip header row
    const contentDescriptionMap = {};

    rows.forEach(row => {
        const [name, content] = row.split(',');
        if (name && content) {
            contentDescriptionMap[removeQuote(name.trim())] = removeQuote(content.trim());
        }
    });

    return contentDescriptionMap;
}

function removeQuote(stringValue) {
    return stringValue.replace(/"/g, '');
}



