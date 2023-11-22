let LIMIT = 0;
const CURRENCY = ' руб';
const STATUS_IN_LIMIT = 'Все хорошо';
const STATUS_OUT_OF_LIMIT = 'Все плохо';
const STATUS_LIMIT = 'Ровно';
const STATUS_OUT_OF_LIMIT_ClASSNAME = 'status_red';
const STATUS_IN_LIMIT_ClASSNAME = 'status_green';
const STATUS_EXACTLY_CLASSNAME = 'status_black';

const inputNode = document.querySelector('.js-input');
const buttonNode = document.querySelector('.js-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const statusNum = document.querySelector('.js-status-num');
const buttonReset = document.querySelector('.js-button-reset');

const buttonLimit = document.querySelector('.js-limit-new');

const categorySelectNode = document.querySelector('.categorySelect');




let expenses = []; // массив создания обьекта (категория - сумма);
let numSum = []; // массив трат (для подсчета общей суммы трат и минуса от лимита)

statusNode.innerText = 'Ожидание статуса'; 

// sumNode.innerText = localStorage.getItem('allSum');



// function initLimit() {
//     const limitFromStorage = parseInt(localStorage.getItem('limit'));
//     if(!limitFromStorage) {
//         return;
//     }
//     limitNode.innerText = limitFromStorage;
// }

// initLimit()



//кнопка добавить
buttonNode.addEventListener('click', function () { 
    const currentNum = getSelectionNum();
 
    const currentCategory = getSelectionCategory();
    if(currentCategory === 'Категория') {
        // тогда выйти из функции, т. к. это значение говорит нам о том
        // что пользователь не выбрал категорию
        alert('Не задана категория!!!')
        return;
    };

    //из полученных переменных собираем обьект newExpense(новыйРасход)
    // которая состоит из двух полей - amount, в которое записано значение expense
    // и category, в которое записано значение currentCategory
    const newExpense = {amount: currentNum, category: currentCategory};
    // console.log(newExpense);


    //добавляем информацию в массив элементов через push
    numSum.push(currentNum);
    // console.log(numSum);
    expenses.push(newExpense);
    // console.log(expenses);

    init(); // используем функцию для сокращение, добавляя в нее все функции вызова.
   
});

//ввод значение "числа"
function getSelectionNum() {
    const expenseNum = parseInt(inputNode.value);    
         if(expenseNum < 0) {
            alert('задана отрицательная сумма!!!')
            return null;
        } else if(!expenseNum) {
            alert('Не задана сумма!!!')
            return null;
        }
    

    clearInput();

    return expenseNum;

};

// функция используется как сборщит функций для вызова
function init() {
    calculateLimit(limitHistory)
    renderHistory(); // вызов функции отображения категории и суммы траты
    renderStatus()
}


//считаем общую сумму трат
function calculateExpanses(numSum) {
    let sum = 0;

    //пробигаемся по элементам массива numSum
    numSum.forEach(element => {
    sum += element;
    });

    //выводим в html
    return sum;

};


// обнуляет значения после ввода используется в функция getSelectionNum(). Сброс происходит после нажатия кнопки "Добавить"
const clearInput = (input) => {
    inputNode.value = ''; //обнулить значение
    popupLimit.value = '';
}



limitHistory = [];

//отображения выбранной категории
function getSelectionCategory() {
    return categorySelectNode.value;
};

//кнопка лимита
//вводим доступный лимит
const popupLimit = document.querySelector('.popup__input')
const popupLimitButton = document.querySelector('.js-popup__btn')

function getLimitNum() {
    const LimitNum = parseInt(popupLimit.value);
    if(!popupLimit.value) {
        return null;
    }
    clearInput();
    return LimitNum;

};

// вызов popup (указываем лимит)
popupLimitButton.addEventListener('click', function () { 
    
    LIMIT = getLimitNum();
    // limitNode.innerText = LIMIT;
    // return limitNode.innerText;
    limitHistory.push(LIMIT);
    // console.log(limitHistory);

    calculateLimit(limitHistory)
    
});



//считаем общую сумму трат
function calculateLimit(limitHistory) {
    let sum = 0;

    //пробигаемся по элементам массива numSum
    limitHistory.forEach(element => {
    sum += element;
    });

    //выводим в html
    limitNode.innerText = sum;
    return limitNode.innerText;
   
};


//Отрисовывает / обновляет блок
function renderHistory() {

    
    historyNode.innerHTML = "";
    // сокращенная запись:
    // expenses.forEach(expense) => {


    //цикл по массиву expenses, где каждый элемент - запись о расходе (сумма и категория)
    expenses.forEach(function(expense) {
        //cоздание элемента li (он пока создан только в памяти)
        const historyItem = document.createElement("li");

        //через свойство className также можно прописывать классы
        historyItem.className = "rub";

        //снова создаем шаблонную строчку
        //формата "категория" - "сумма" (а не наоборот, чтобы не усложнять html)
        historyItem.innerText = `${expense.category} - ${expense.amount}`;

        //берем наш li из памяти и вставляем в документ, в конец historyList
        historyNode.appendChild(historyItem);
    });   

};


function render() {
    //вызываем функцию обновления статуса и "всего"
    

    //вызваем функцию обновления истории
    
}

// считаем минусовой лимит
function calcResultStatus(numSum) {
    let sumLimit = calculateLimit(limitHistory)

    numSum.forEach(element => {
        sumLimit -= element;
    });
    return sumLimit;
}



// Отображения статуса, сравнение с лимитом
function renderStatus() {

// const STATUS_IN_LIMIT = 'Все хорошо';
// const STATUS_OUT_OF_LIMIT = 'Все плохо';
// const STATUS_OUT_OF_LIMIT_ClASSNAME = 'status_red';
// const STATUS_IN_LIMIT_ClASSNAME = 'status_green';
// const STATUS_EXACTLY_CLASSNAME = 'status_black';
   

  
    const allSum = calculateExpanses(numSum); // вызов функции посчета общей суммы трат
    sumNode.innerText = allSum;  // сумма трат
    // localStorage.setItem('allSum', allSum);
    // console.log(allSum);
    const allLimit = calculateLimit(limitHistory); //сумма лимитов
    // localStorage.setItem('limit', allLimit);
    // console.log(allLimit)
   

       // 5 cравнение с лимитом и вывод статуса
       statusNode.classList.remove(STATUS_IN_LIMIT_ClASSNAME, STATUS_OUT_OF_LIMIT_ClASSNAME, STATUS_EXACTLY_CLASSNAME);
       
           
    if (allSum <= allLimit) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.classList.add(STATUS_IN_LIMIT_ClASSNAME)
        statusNum.innerText =  ` `;

    } 
    else if(allSum > allLimit){
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_ClASSNAME)
            //  добавляем отображение минусового лимита
        statusNum.innerText =  `(${calcResultStatus(numSum)} руб)`;
        statusNum.classList.add(STATUS_OUT_OF_LIMIT_ClASSNAME)
    } 

    
}

// кнопка сброса (лимит, сумма, статус)
buttonReset.addEventListener('click', function() {
    historyNode.innerHTML = "";
    numSum = [];
    expenses = [];
    LIMIT = 0;
    limitNode.innerText = LIMIT;
    sumNode.innerText = LIMIT;
    statusNode.innerText = 'Ожидание статуса'; 
    statusNode.classList.add(STATUS_EXACTLY_CLASSNAME);
    statusNum.innerText =  ` `;
    limitHistory = [];
});




