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

function getBMIState(value) {
    switch (true) {
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

function getBMIValue(height, weight) {
    return weight / ((height / 100) * (height / 100));
}



let record_list = document.querySelector('.records');
let calculate_btn = document.getElementById('btn-calculate');
calculate_btn.addEventListener('click', onCalculateClick);
let resultIndicator = document.querySelector('.result');
resultIndicator.addEventListener('click', onCalculateClick);

function onCalculateClick(e) {
    let inputHeight = parseInt(document.getElementById('height').value);
    let inputWeight = parseInt(document.getElementById('weight').value);
    addRecords(inputHeight, inputWeight);
    updateCalcuateButton(inputHeight, inputWeight);
    updateList();
}

function addRecords(height, weight) {
    let currentDate = new Date();
    let month = (currentDate.getMonth() + 1) + '';
    month = month.padStart(2, '0');
    let date = (currentDate.getDate() + '').padStart(2, '0');
    let formattedDateStr = `${month}-${date}-${currentDate.getFullYear()}`;
    let newRecord = { height: height, weight: weight, date: formattedDateStr }
    records.push(newRecord);
}


updateList();

function updateCalcuateButton(height, weight) {
    const bmiValue = getBMIValue(height, weight);
    const [bmiState, bmiDescription] = getBMIState(bmiValue);
    calculate_btn.classList.add('display-none');

    let resultContainer = document.querySelector('.result');
    resultContainer.classList.remove('display-none');
    
    let colorContainer = document.getElementById('colorContainer');
    colorContainer.className = '';
    colorContainer.classList.add(bmiState);

    let description = document.querySelector('.result-description');
    description.textContent = bmiDescription;

    let bmi_number = document.querySelector('.result-bmi-number');
    bmi_number.textContent = bmiValue.toFixed(2);
}
function updateList() {
    record_list.innerHTML = '';
    records.forEach(record => {
        const bmiValue = getBMIValue(record.height, record.weight);
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