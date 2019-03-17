let records = [
    {
        weight: 50,
        height: 180,
        date: '06-19-2017'
    },
    {
        weight: 70,
        height: 180,
        date: '06-19-2017'
    },
    {
        weight: 90,
        height: 180,
        date: '06-19-2017'
    },
    {
        weight: 110,
        height: 180,
        date: '06-19-2017'
    },
    {
        weight: 120,
        height: 180,
        date: '06-19-2017'
    },
    {
        weight: 130,
        height: 180,
        date: '06-19-2017'
    }
];

let record_list = document.querySelector('.records');

function getBMIValue(height, weight) {
    return weight / ((height/100) * (height/100));
}

function getBMIState(value) {
    switch(true) {
        case (value < 18.5):
            return ['underweight', '過輕'];
        case (value < 25):
            return ['healthy', '理想'];
        case (value < 30):
            return ['overweight', '過重'];
        case (value < 35):
            return ['overweight-1', '輕度肥胖'];
        case (value < 40):
            return ['overweight-2', '中度肥胖'];
        default:
            return ['overweight-3', '重度肥胖'];
    }
}

updateList();

function updateList() {
    record_list.innerHTML = '';
    records.forEach(record => {
        let bmiValue = getBMIValue(record.height, record.weight);
        const [bmiState, bmiDescription] = getBMIState(bmiValue);
        record_list.innerHTML += `
        <li data-level='normal' class="record-${bmiState}">
            <p>${bmiDescription}</p>
            <p>
                <span>BMI</span>
                ${bmiValue.toFixed(2)}
            </p>
            <p>
                <span>weight</span>
                ${record.weight}kg
            </p>
            <p>
                <span>height</span>
                ${record.height}cm
            </p>
            <p>
                <span>${record.date}</span>
            </p>
        </li>
        `;
    })
}