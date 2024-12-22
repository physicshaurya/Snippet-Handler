async function fetchContentDescriptionMap(sheetUrl) {
    const contentDescriptionMap = {};
  
    // Wrap the AJAX call in a Promise to use async/await
    const data = await new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: sheetUrl,
        dataType: "text",
        success: function (response) {
          // Convert CSV to an array of objects
          const data = $.csv.toObjects(response);
          resolve(data);
        },
        error: function (error) {
          reject(error);
        }
      });
    });
  
    // Update the contentDescriptionMap with data from the CSV
    for (let i = 0; i < data.length; i++) {
      let key = data[i].Name;
      let value = data[i].Content;
      contentDescriptionMap[key] = value;
    }
  
    console.log(contentDescriptionMap);
    return contentDescriptionMap;
  }

// Get greeting based on current time of the day
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
}

  
// // Deprecated
// function removeQuote(stringValue) {
//   return stringValue.replace(/"/g, "");
// }

// // Deprecated
// function responseToObjects(res) {
//   if (typeof res !== "string") {
//     throw new TypeError("Expected a string input for 'res'");
//   }

//   // credit to Laurence Svekis https://www.udemy.com/course/sheet-data-ajax/
//   const jsData = JSON.parse(res.substring(47).slice(0, -2));
//   let data = [];
//   const columns = jsData.table.cols;
//   const rows = jsData.table.rows;
//   let rowObject;
//   let cellData;
//   let propName;
//   for (let r = 0, rowMax = rows.length; r < rowMax; r++) {
//     rowObject = {};
//     for (let c = 0, colMax = columns.length; c < colMax; c++) {
//       cellData = rows[r]["c"][c];
//       propName = columns[c].label;
//       if (cellData === null) {
//         rowObject[propName] = "";
//       } else if (
//         typeof cellData["v"] == "string" &&
//         cellData["v"].startsWith("Date")
//       ) {
//         rowObject[propName] = new Date(cellData["f"]);
//       } else {
//         rowObject[propName] = cellData["v"];
//       }
//     }
//     data.push(rowObject);
//   }
//   return data;
// }

// // Deprecated
// function responseToObjects2(res) {
//   console.log("Type of response", typeof res);
//   if (typeof res !== "string") {
//     throw new TypeError("Expected a string input for 'res'");
//   }
//   // Credit to Laurence Svekis https://www.udemy.com/course/sheet-data-ajax/
//   const jsData = JSON.parse(res.substring(47).slice(0, -2));
//   const columns = jsData.table.cols;
//   const rows = jsData.table.rows;
//   const data = [];

//   for (const row of rows) {
//     const rowObject = {};
//     for (let c = 0; c < columns.length; c++) {
//       const cellData = row.c[c];
//       const propName = columns[c].label;
//       if (cellData === null) {
//         rowObject[propName] = "";
//       } else if (
//         typeof cellData.v === "string" &&
//         cellData.v.startsWith("Date")
//       ) {
//         rowObject[propName] = new Date(cellData.f);
//       } else {
//         rowObject[propName] = cellData.v;
//       }
//     }
//     data.push(rowObject);
//   }

//   return data;
// }
