async function chart() {
    const data = await getAll(URL_BILL)
    const array = [];
    data.forEach(element => {
        const a = array.find(e => e.idTable == element.idTable);
        if (a) {
            a.total += element.total
        } else {
            array.push({ idTable: element.idTable, total: element.total })
        }
    });
    chartbar(array);
    line_chart(array);


    



}
chart();

function chartbar(array) {
    const ctx = document.createElement("canvas");
    document.getElementById("barChart").appendChild(ctx);

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: array.sort((a, b) => a.idTable - b.idTable).map(e => `Table ${e.idTable}`),
            datasets: [
                {
                    label: "REVENUE TOTAL ($)",
                    data: array.map(e => e.total),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
}

function line_chart(array) {
    const ctx = document.createElement("canvas");
    document.getElementById("lineChart").appendChild(ctx);
    new Chart(ctx, {
        type: "line",
        data: {
            labels: array.sort((a, b) => a.idTable - b.idTable).map(e => `Table ${e.idTable}`),
            datasets: [
                {
                    label: "REVENUE TOTAL ($)",
                    data: array.map(e => e.total),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
}

