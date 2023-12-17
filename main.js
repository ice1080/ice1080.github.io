/* TODO
   - add quantity specifier
   - refresh button?
 */

const apiKey = '982d766304c44b02abc23ffb1472af56'

const gridQuantity = document.querySelector('#ag-grid-quantity').value;
// TODO on grid quantity change

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const startDate = new Date(2010, 0, 1);
const endDate = new Date();

async function generateGrid() {

    let response = await fetch('https://randommer.io/api/Name?nameType=fullName&quantity=' + gridQuantity, {
        headers: {
            'X-Api-Key': apiKey,
        }
    });
    let namesJson = await response.json();

    const rowData = [];
    for (let i = 0; i < gridQuantity; i++) {
        rowData.push({
            id: i+1,
            name: namesJson[i],
            /* managerId: '', */
            startDate: randomDate(startDate, endDate),
        });
    }

    const gridOptions = {
        // Row Data: The data to be displayed.
        rowData: rowData,
        columnDefs: [
            { field: "id" },
            { field: "name" },
            /* { field: "managerId" }, */
            { field: "startDate" },
        ]
    };

    const myGridElement = document.querySelector('#myGrid');
    agGrid.createGrid(myGridElement, gridOptions);
}

generateGrid();
