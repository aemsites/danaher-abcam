const mapTable = (table, document) => {
    let colSpan;
    // const tableDiv = document.createElement('div');
    const tRows = table.querySelectorAll('tr');
    table.innerHTML = '';
    tRows.forEach((row, index) => {
        // const rowDiv = document.createElement('div');
        const tHead = row.querySelectorAll('th');
        const tDatas = row.querySelectorAll('td');
        colSpan = tDatas.length;
        row.innerHTML = '';
        tHead.forEach((head) => {
            // const dataDiv = document.createElement('div');
            // dataDiv.textContent = head.textContent;
            // rowDiv.appendChild(dataDiv);
            // head.removeAttribute('colspan');
            // head.removeAttribute('rowspan');
            const newData = document.createElement('td');
            newData.textContent = head.textContent;
            row.append(newData);
        });

        tDatas.forEach((data) => {
            // const dataDiv = document.createElement('div');
            // dataDiv.textContent = data.textContent;
            // rowDiv.appendChild(dataDiv);
            data.removeAttribute('colspan');
            data.removeAttribute('rowspan');
            const newData = document.createElement('td');
            newData.textContent = data.textContent;
            row.append(newData);
        });
        table.append(row);
        // tableDiv.appendChild(rowDiv);
    });
    let tHead = table.querySelector('thead');
    if (!tHead) {
        tHead = table.createTHead();
    }
    if (tHead) {
        const row = tHead.insertRow(0);
        const th = document.createElement('th');
        th.setAttribute('colspan', colSpan);
        th.textContent = 'Table';
        row.appendChild(th);
    }
    // const cells = [['table']];
    // cells.push([tableDiv]);
    // if (cells.length > 1) {
    //     table.innerHTML = '';
    //     const block = WebImporter.DOMUtils.createTable(cells, document);
    //     table.append(block, document.createElement('hr'));
    // }
};

const createTable = (main, document, html, params, urlStr) => {
    const allTables = main.querySelectorAll('table');
    allTables.forEach((table) => {
        mapTable(table, document);
    });
}

export default createTable;