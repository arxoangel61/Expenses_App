let LIMIT = 0;
const CURRENCY = ' руб';
const STATUS_IN_LIMIT = 'Все хорошо';
const STATUS_OUT_OF_LIMIT = 'Все плохо';
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

let expenses = [];


init(expenses);


buttonNode.addEventListener('click', function () {



    const expense = getExpanseFromUser();

    if (!expense) {
        return;
    }

    trackExpans(expense);

   // 2. сохраняем трату в список

   render()

   //сохраняем в переменную currentCategory(текущаяКатегория) выбранную категорию
    const currentCategory = getSelectionCategory();
    // если текущаяКатегория равна значению Категория
    if(currentCategory === 'Категория') {
        // тогда выйти из функции, т. к. это значение говорит нам о том
        // что пользователь не выбрал категорию
        return
    }

    //из полученных переменных собираем обьект newExpense(новыйРасход)
    // которая состоит из двух полей - amount, в которое записано значение expense
    // и category, в которое записано значение currentCategory
    const newExpense = { amount: expense, category: currentCategory };
    console.log(newExpense);


    //добавляем новый расход в массив расходов
    expenses.push(newExpense);
    console.log(expenses);
});


buttonLimit.addEventListener('click', function() {
    let numLimit = prompt('Введите новый лимит: ')
    
    LIMIT += Number(numLimit);
    console.log(LIMIT);

    limitNode.innerText = LIMIT;
});


// кнопка сброса (лимит, сумма, статус)
buttonReset.addEventListener('click', function() {
    
    expenses = []
    render()
    

    statusNode.classList.remove(STATUS_IN_LIMIT_ClASSNAME, STATUS_OUT_OF_LIMIT_ClASSNAME);
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.classList.add(STATUS_EXACTLY_CLASSNAME);
    statusNum.innerText =  ` `;
});


// Очищаем список, удаляя все его элементы
buttonReset.addEventListener('click', function() {
   
    while (historyNode.hasChildNodes()) {
        historyNode.removeChild(historyNode.firstChild);
      }

  });




function init(expenses) {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    
}


function trackExpans(expense) {
    expenses.push(expense);
}


// Возращает введенную пользователем сумму
function getExpanseFromUser() {
    // 1. получаем знаничение из поля ввода

   const expense = parseInt(inputNode.value); // parseInt функция приобразования 
   if (!inputNode.value) {
    return null; //! обозначает если ничего нету, то завершит
   }

   clearInput()
   
   return expense;
}

const clearInput = (input) => {
    inputNode.value = ''; //обнулить значение
}

// суммируем траты
function calculateExpanses(expenses) {
    let sum = 0;

    expenses.forEach(element => {
    sum += element;
    });

    return sum;
}

// считаем минусовой лимит
function calcResultStatus(expenses) {
    let sumLimit = LIMIT;

    expenses.forEach(element => {
        sumLimit -= element;
    });
    return sumLimit;
}



// function renderHistory(expenses) {
//     //    цикл forEach

//    let expensesListHTML = '';

//    expenses.forEach(element => {
//     expensesListHTML += `<li>${element}${CURRENCY}.</li>`;
//    });

//    console.log(expensesListHTML)


//    // 3. сохраняем новый список трат
// //    const html = `<ol><li>${expense}</li></ol>`;


//    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
//    console.log(historyNode);
// }

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
}


//отрисовываем/обновляем весь интервейс (в нашем случае - историю, всего, статус)
function render() {
    //вызываем функцию обновления статуса и "всего"
    renderStatus();

    //вызваем функцию обновления истории
    renderHistory();
}


//возвращаем введенную пользователем сумму
function getExpanseFromUser() {
    return parseInt(inputNode.value);
}

//возвращаем выбранную пользователем категорию.
function getSelectionCategory() {
    return categorySelectNode.value;
}




function renderStatus() {
       // 5 cравнение с лимитом и вывод статуса


   statusNode.classList.remove(STATUS_IN_LIMIT_ClASSNAME, STATUS_OUT_OF_LIMIT_ClASSNAME, STATUS_EXACTLY_CLASSNAME)
       
   if (sum < LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.classList.add(STATUS_IN_LIMIT_ClASSNAME)

    statusNum.innerText =  ` `;
   } else if(sum > LIMIT) {
    statusNode.innerText = STATUS_OUT_OF_LIMIT;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_ClASSNAME)

    // добавляем отображение минусового лимита
    statusNum.innerText =  `(${calcResultStatus(expenses)} руб)`;
    statusNum.classList.add(STATUS_OUT_OF_LIMIT_ClASSNAME)
   } else if(sum == LIMIT){
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.classList.add(STATUS_EXACTLY_CLASSNAME);

    statusNum.innerText =  ` `;
   }
}