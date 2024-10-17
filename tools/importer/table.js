const mapTable = (table, document) => {
    const tRows = table.querySelectorAll('tr');
    const colSpan = tRows[0].querySelectorAll('td').length;    
    table.innerHTML = '';
    const newRow = document.createElement('tr');
    const newData = document.createElement('td');
    newData.setAttribute('colspan', colSpan);
    const tableName = `table-${colSpan}-columns`;
    newData.textContent = tableName;
    newRow.append(newData);
    table.append(newRow);

    tRows.forEach((row, index) => {
        const tDatas = row.querySelectorAll('td');
        row.innerHTML = '';
        const newData = document.createElement('td');
        const newDiv = document.createElement('div');
        tDatas.forEach((data) => {
            const newDivData = document.createElement('div');
            newDivData.textContent = data.textContent;
            newDiv.append(newDivData);
        });
        newData.append(newDiv);
        row.append(newData);
        table.append(row);

    });
    let tHead = table.querySelector('thead');
    if (!tHead) {
        tHead = table.createTHead();
    }
    if (tHead) {
        const row = tHead.insertRow(0);
        const th = document.createElement('th');
        th.setAttribute('colspan', colSpan);
        th.textContent = tableName;
        row.appendChild(th);
    }
};

const createTable = (main, document, html, params, urlStr) => {
    const allTables = main.querySelectorAll('table');
    allTables.forEach((table) => {
        mapTable(table, document);
    });
}

export default createTable;