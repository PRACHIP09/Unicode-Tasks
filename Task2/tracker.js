var state = {
    balance: 4800,
    income: 500,
    expense: 100,
    savings: 100,
    payments: 200,
    transactions:[],
        //{id: uniqueid(),name : 'Grocery', amount: 1020 , type:'expense'},
        //{id: uniqueid(),name : 'Salary', amount: 5000 , type:'income'},
        //{id: uniqueid(),name : 'Savings', amount: 2000 , type:'savings'},
        //{id: uniqueid(),name : 'Bonus', amount: 1000 , type:'income'}
    

}
var balanceEl = document.querySelector('#balance');
var paymentel = document.querySelector('#payments')
var incomeEl = document.querySelector('#income_add');
var expenseEl = document.querySelector('#expenses_sub');
var savingsEl = document.querySelector('#savings');
var transactionsEl = document.querySelector('#transaction');
var paymentel = document.querySelector('#payments');
var incomebtnEl = document.querySelector('.incomebtn');
var expensebtnEl = document.querySelector('.expensebtn');
var savingsbtnEl = document.querySelector('.savingsbtn');
var nameEl = document.querySelector('#name');
var amntElInput = document.querySelector('#amount');
var quntyElInput = document.querySelector('#quantity');

function init()
{
    calculate();
    initialadd();
}
function uniqueid()
{
    return Math.round(Math.random() * 100000);
}
function initialadd()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
{
    incomebtnEl.addEventListener('click',onAddIncomeClick);
    expensebtnEl.addEventListener('click',onAddExpenseClick);
    savingsbtnEl.addEventListener('click',onAddSavingsClick);

}

function addTransaction(name, amount,quantity, type)
{
    if(name !== '' && amount !== '' && quantity !== '')
    {
    var transactions={
        id: uniqueid(),
        name: name,
        amount: parseInt(amount),
        quantity: parseInt(quantity), 
        type: type 
     };
    state.transactions.push(transactions);

    
    calculate();
    }
    else{alert('Please enter data')}
}
function onAddIncomeClick()
{
    addTransaction(nameEl.value, amntElInput.value,quntyElInput.value, 'income')
}
function onAddExpenseClick()
{
    addTransaction(nameEl.value, amntElInput.value,quntyElInput.value, 'expense')
}

function onAddSavingsClick()
{
    addTransaction(nameEl.value, amntElInput.value,quntyElInput.value, 'savings')
}

function onpayclick(event)
{
    var temp;
    var id = parseInt(event.target.getAttribute('data-id'));
    for(var i = 0 ; i < state.transactions.length ; i++)
    {
        if (state.transactions[i].id === id && state.transactions[i].type != 'expense'){
            temp = state.transactions[i].type;
            state.transactions[i].type = 'payments';
            state.transactions[i].tempor = temp; 
        }

    }
    render();
    calculate();
}
function onDeleteClick(event)
{
    
    
    var id = parseInt(event.target.getAttribute('data-id'));
    var deleteIndex;
    for(var i = 0 ; i < state.transactions.length ; i++)
    {
        if (state.transactions[i].id === id ){
            deleteIndex = i;
            break;
        }

    }
    
    state.transactions.splice(deleteIndex, 1);
    calculate();
    
}
function oneditClick(event)
{
    var id = parseInt(event.target.getAttribute('data-id'));
    for(var i = 0 ; i < state.transactions.length ; i++)
    {

        if (state.transactions[i].id === id){

            state.transactions[i].name =prompt("enetr name :",state.transactions[i].name)
            state.transactions[i].amount = parseInt(prompt("enter amount :",state.transactions[i].amount))
            state.transactions[i].quantity = parseInt(prompt("enter the quantity :",state.transactions[i].quantity))
        } 
         render();
         calculate();  
    }

}
function calculate()
{
    var balance = 0,
        income = 0,
        expense = 0,
        savings = 0,
        payment = 0,
        item; 
    for(var i=0; i < state.transactions.length; i++)
    {
        item=state.transactions[i];
        if(item.type === 'income')
        {
            income += item.amount*item.quantity;
        }
        else if (item.type === 'income' && (savings < 0))
        {
            income += item.amount*item.quantity;
            savings += item.amount*item.quantity;
        }
        else if ( item.type === 'expense' && (item.amount*item.quantity <= income))
        {
            expense += item.amount*item.quantity;
            income -= item.amount*item.quantity;
        }
        else if (item.type === 'expense' && (item.amount*item.quantity > income))
        {
            expense += item.amount*item.quantity;
            savings = savings - (item.amount*item.quantity - income);
            income=0;
        }
        else if (item.type === 'savings')
        {
            savings += item.amount*item.quantity;
        }
        else if(item.type === 'payments')
        {
            payment += item.amount*item.quantity;
        }


    }
    balance = income + savings-payment;
    

    state.balance = balance;
    state.income = income;
    state.expense = expense;
    state.savings = savings;
    state.payments = payment;
    render();
    
}

      
function render()
{
    balanceEl.innerHTML = `Rs.${state.balance}`;
    paymentel.innerHTML = `RS.${state.payments}`;
    incomeEl.innerHTML = `Rs.${state.income}`;
    expenseEl.innerHTML = `Rs.${state.expense}`;
    savingsEl.innerHTML = `Rs.${state.savings}`;

    var transactionEl, containerEl , amountEl,qutyEl , item ,btnEL,payel ,totalamnt;
    transactionsEl.innerHTML = '';
     for(var i=0; i < state.transactions.length; i++)
    {
        item = state.transactions[i];
        transactionEl = document.createElement('li');
        transactionEl.append(item.name);

        transactionsEl.appendChild(transactionEl);

        containerEl = document.createElement('div');
        amountEl = document.createElement('span');
        qutyEl = document.createElement('span');
        totalamnt =document.createElement('span');

        if(item.type === 'income')
        {
            amountEl.classList.add('income_amnt');
            qutyEl.classList.add('quantity');
            totalamnt.classList.add('income_amnt');
            
        }
        else if(item.type === 'expense')
        {
            amountEl.classList.add('expense_amnt');
            qutyEl.classList.add('quantity');
            totalamnt.classList.add('expense_amnt');
        }
        else if(item.type === 'savings')
        {
            amountEl.classList.add('savings_amnt');
            qutyEl.classList.add('quantity');
            totalamnt.classList.add('savings_amnt');
        }
        else if(item.type === 'payments')
        {
            amountEl.classList.add('payment_sub');
            qutyEl.classList.add('payment_sub');
            totalamnt.classList.add('payment_sub');

        }
        amountEl.innerHTML = `Rs.${item.amount}`;
        qutyEl.innerHTML = `${item.quantity}`;
        totalamnt.innerHTML = `Rs.${item.amount*item.quantity}`;

        
        containerEl.appendChild(amountEl);
        containerEl.appendChild(qutyEl);
        containerEl.appendChild(totalamnt);
        
        payel=document.createElement('button');
        payel.setAttribute('data-id',item.id);
        payel.innerHTML = 'PAY';
        payel.addEventListener('click', onpayclick);
        containerEl.appendChild(payel);
       
            btnEL=document.createElement('button');
            btnEL.setAttribute('data-id', item.id);
            btnEL.innerHTML= 'x'
            btnEL.addEventListener('click', onDeleteClick);  
        
            editEl=document.createElement('button');
            editEl.setAttribute('data-id', item.id);
            editEl.innerHTML='edit';
            editEl.addEventListener('click', oneditClick);
    
        
            containerEl.appendChild(editEl);

            containerEl.appendChild(btnEL);
            ;
            transactionEl.appendChild(containerEl);
    }
}

init();