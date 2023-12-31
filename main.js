const apiKey = '982d766304c44b02abc23ffb1472af56'

const quantityElement = document.querySelector('#ag-grid-quantity')
const gridQuantity = quantityElement.value;

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const startDate = new Date(2010, 0, 1);
const endDate = new Date();

const gridOptions = {
    rowData: [],
    columnDefs: [
        { field: "id" },
        { field: "name" },
        /* { field: "managerId" }, */
        { field: "startDate" },
    ]
};

const myGridElement = document.querySelector('#myGrid');
const gridApi = agGrid.createGrid(myGridElement, gridOptions);

let namesList = [];

function generateChart(namesList) {
    const namesString = namesList.join('');
    const charCount = {};

    for (let char of namesString) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const gridElement = document.querySelector('#myChart');

    new Chart(gridElement, {
        type: 'bar',
        data: {
            labels: letters,
      datasets: [{
                label: '# of letters in above random names',
                data: Object.values(charCount),
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}

async function getNewNames(quantityToRetrieve) {
    if (quantityToRetrieve > 0) {
        let response = await fetch('https://randommer.io/api/Name?nameType=fullName&quantity=' + quantityToRetrieve, {
            headers: {
                'X-Api-Key': apiKey,
            }
        });
        const namesJson = await response.json();

        namesList = namesList.concat(namesJson);
        generateChart(namesList)
    } else {
        return
    }
}

async function generateGrid(gridQuantity) {
    await getNewNames(gridQuantity - namesList.length);

    const rowData = [];
    for (let i = 0; i < gridQuantity; i++) {
        rowData.push({
            id: i + 1,
            name: namesList[i],
            /* managerId: '', */
            startDate: randomDate(startDate, endDate),
        });
    }

    gridApi.setGridOption('rowData', rowData)
}

generateGrid(gridQuantity);

quantityElement.addEventListener('change', function (e) {
    generateGrid(e.target.value);
});


// TODO remove this
/* generateChart(namesList); */
