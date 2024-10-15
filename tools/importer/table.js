const mapTable = (table, document) => {
    let colSpan;
    const tRows = table.querySelectorAll('tr');
    tRows.forEach((row) => {
        const tDatas = row.querySelectorAll('td');
        colSpan = tDatas.length;
        tDatas.forEach((data) => {
            data.removeAttribute('colspan');
            data.removeAttribute('rowspan');
        });
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
};

const createTable = (main, document, html, params, urlStr) => {
    const allTables = main.querySelectorAll('table');
    allTables.forEach((table) => {
        mapTable(table, document);
    });
}

export default createTable;