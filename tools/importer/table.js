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

        tDatas.forEach((data) => {
            const newData = document.createElement('td');
            //const newDivData = document.createElement('div');
            newData.textContent = data.textContent;
            // newData.append(newDivData);
            row.append(newData);
        });
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
        th.textContent = `table-row-col-${colSpan}`;
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