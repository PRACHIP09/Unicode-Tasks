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
    taskincn:[],taskincamnt:[],taskinctype:[], taskincqu:[],taskincid:[],taskinctotal:[],
    tasksavn:[],tasksavamnt:[],tasksavtype:[], tasksavqu:[],tasksavid:[],tasksavtotal:[],
    taskexpn:[],taskexpamnt:[],taskexptype:[], taskexpqu:[],taskexpid:[],taskexptotal:[],
    copyn:[],copyamnt:[],copytype:[],copyqu:[], copyid:[],copytotal:[],
    filtern:[],filteramnt:[],filtertype:[],filterqu:[],filterid:[],filtertotal:[],
    

}
var balanceEl = document.querySelector('#balance');
var paymentel = document.querySelector('#payments')
var incomeEl = document.querySelector('#income_add');
var expenseEl = document.querySelector('#expenses_sub');
var savingsEl = document.querySelector('#savings');
var transactionsEl = document.querySelector('#transaction');
var transactionsSortEl = document.querySelector('#transactionsort')
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
    var deletesort;
    var id = parseInt(event.target.getAttribute('data-id'));
    for(var i = 0 ; i < state.transactions.length ; i++)
    {
        if (state.transactions[i].id === id && state.transactions[i].type != 'expense' && state.transactions[i].type != 'payments'){
            temp = state.transactions[i].type;
            state.transactions[i].type = 'payments';
            state.transactions[i].tempor = temp; 
        }
        if(state.filterid[i] === id && state.filtertype[i] != 'expense' && state.transactions[i].type != 'payments'){
            deletesort=i;
        }
        state.filteramnt.splice(deletesort, 1);
        state.filtern.splice(deletesort, 1);
        state.filterqu.splice(deletesort, 1);
        state.filtertype.splice(deletesort, 1);
        state.filterid.splice(deletesort, 1);
        state.filtertotal.splice(deletesort, 1);
    }
    display();
    calculate();
}

function sortall()
{    
    var i;
    var num=state.transactions.length;
    for(i=0;i<num;i++)
    {

        if(state.transactions[i].type == 'income')
        {
             
                state.taskincn[i] = state.transactions[i].name;
                state.taskincamnt[i] = state.transactions[i].amount;
                state.taskincqu[i] = state.transactions[i].quantity;
                state.taskinctype[i] = state.transactions[i].type;
                state.taskincid[i] = state.transactions[i].id;
                state.taskinctotal[i] = (state.transactions[i].amount * state.transactions[i].quantity);
        }
        else if(state.transactions[i].type == 'expense')
        {
             
                state.taskexpn[i] = state.transactions[i].name;
                state.taskexpamnt[i] = state.transactions[i].amount;
                state.taskexpqu[i] = state.transactions[i].quantity;
                state.taskexptype[i] = state.transactions[i].type;
                state.taskexpid[i] = state.transactions[i].id;
                state.taskexptotal[i] = (state.transactions[i].amount * state.transactions[i].quantity);
        }
        else if(state.transactions[i].type == 'savings')
        {
             
                state.tasksavn[i] = state.transactions[i].name;
                state.tasksavamnt[i] = state.transactions[i].amount;
                state.tasksavqu[i] = state.transactions[i].quantity;
                state.tasksavtype[i] = state.transactions[i].type;
                state.tasksavid[i] = state.transactions[i].id;
                state.tasksavtotal[i] = (state.transactions[i].amount * state.transactions[i].quantity);
        }
        console.log(state.tasksavn,state.taskexpn,state.taskincn)
        copyn= state.taskincn.concat(state.tasksavn,state.taskexpn)
        copyqu= state.taskincqu.concat(state.tasksavqu,state.taskexpqu)
        copyamnt= state.taskincamnt.concat(state.tasksavamnt,state.taskexpamnt)
        copytype= state.taskinctype.concat(state.tasksavtype,state.taskexptype)
        copyid= state.taskincid.concat(state.tasksavid,state.taskexpid)
        copytotal= state.taskinctotal.concat(state.tasksavtotal,state.taskexptotal)
        

        state.filtern = copyn.filter(el => {
            return el != null && el != '';
        });
        state.filterqu = copyqu.filter(el => {
            return el != null && el != '';
        });
        state.filteramnt = copyamnt.filter(el => {
            return el != null && el != '';
        });
        state.filtertype = copytype.filter(el => {
            return el != null && el != '';
        });
        state.filterid = copyid.filter(el => {
            return el != null && el != '';
        });
        state.filtertotal = copytotal.filter(el => {
            return el != null && el != '';
        });

       // console.log(state.routines)
    }
    console.log(state.filtern,state.filtertype,state.filteramnt,state.filtertotal,state.filterid,state.filterqu)
    
}   
function onDeleteClick(event)
{
    
    
    var id = parseInt(event.target.getAttribute('data-id'));
    var deleteIndex,deletesort;
    for(var i = 0 ; i < state.transactions.length ; i++)
    {
        if (state.transactions[i].id === id ){
            deleteIndex = i;
            break;
        }
        if(state.filterid[i] === id)
        {
            deletesort = i;
        }
    }
    
    
    state.transactions.splice(deleteIndex, 1);
    state.taskexpamnt.splice(deleteIndex, 1);
    state.taskincamnt.splice(deleteIndex, 1);
    state.tasksavamnt.splice(deleteIndex, 1);
    state.taskexpqu.splice(deleteIndex, 1);
    state.tasksavqu.splice(deleteIndex, 1);
    state.taskincqu.splice(deleteIndex, 1);
    state.taskexpn.splice(deleteIndex, 1);
    state.taskincn.splice(deleteIndex, 1);
    state.tasksavn.splice(deleteIndex, 1);
    state.taskexptotal.splice(deleteIndex, 1);
    state.taskinctotal.splice(deleteIndex, 1);
    state.tasksavtotal.splice(deleteIndex, 1);
    state.taskexptype.splice(deleteIndex, 1);
    state.taskinctype.splice(deleteIndex, 1);
    state.tasksavtype.splice(deleteIndex, 1);
    state.taskexpid.splice(deleteIndex, 1);
    state.tasksavid.splice(deleteIndex, 1);
    state.taskincid.splice(deleteIndex, 1);
    state.filteramnt.splice(deletesort, 1);
    state.filtern.splice(deletesort, 1);
    state.filterqu.splice(deletesort, 1);
    state.filtertype.splice(deletesort, 1);
    state.filterid.splice(deletesort, 1);
    state.filtertotal.splice(deletesort, 1);
    calculate();

}
function oneditClick(event)
{
    var id = parseInt(event.target.getAttribute('data-id'));
    for(var i = 0 ; i < state.transactions.length ; i++)
    {

        if (state.transactions[i].id === id && state.transactions[i].type != 'payments'){

            state.transactions[i].name =prompt("enetr name :",state.transactions[i].name)
            state.transactions[i].amount = parseInt(prompt("enter amount :",state.transactions[i].amount))
            state.transactions[i].quantity = parseInt(prompt("enter the quantity :",state.transactions[i].quantity))
        } 
         display();
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
    balance = income + savings+ payment;
    

    state.balance = balance;
    state.income = income;
    state.expense = expense;
    state.savings = savings;
    state.payments = payment;
    display();
    
}
function display()
{
    balanceEl.innerHTML = `Rs.${state.balance}`;
    paymentel.innerHTML = `RS.${state.payments}`;
    incomeEl.innerHTML = `Rs.${state.income}`;
    expenseEl.innerHTML = `Rs.${state.expense}`;
    savingsEl.innerHTML = `Rs.${state.savings}`;

    var transactionEl, containerEl , amountEl,qutyEl , item ,btnEL,payel ,totalamnt,transactionsort;
    transactionsEl.innerHTML = '';
    transactionsSortEl.innerHTML ='';
     for(var i=0; i < state.transactions.length; i++)
    {
        item = state.transactions[i];
        transactionEl = document.createElement('li');
        transactionEl.append(item.name);
        transactionEl.style.alignContent="center";
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
        qutyEl.innerHTML = `x${item.quantity}`;
        totalamnt.innerHTML = `Rs.${item.amount*item.quantity}`;

        
        containerEl.appendChild(amountEl);
        containerEl.appendChild(qutyEl);
        containerEl.appendChild(totalamnt);
        
        payel=document.createElement('button');
        payel.setAttribute('data-id',item.id);
        payel.innerHTML = 'PAY';
        payel.style.color="red";
        payel.style.backgroundColor="#131419";
        payel.style.border="none";
        payel.style.marginRight="2px";
        payel.style.marginLeft="5px";
        payel.style.fontFamily="Maven pro";
        payel.addEventListener('click', onpayclick);
        containerEl.appendChild(payel);
       
            btnEL=document.createElement('button');
            btnEL.setAttribute('data-id', item.id);
            btnEL.innerHTML= 'X';
            btnEL.style.backgroundColor="#131419";
            btnEL.style.color="red";
            btnEL.style.border="none"
            btnEL.style.margin="2px";
            btnEL.style.fontFamily="Maven pro";
            btnEL.addEventListener('click', onDeleteClick);  
        
            editEl=document.createElement('button');
            editEl.setAttribute('data-id', item.id);
            editEl.innerHTML='EDIT';
            editEl.style.color="#c7c7c7";
            editEl.style.backgroundColor="#131419";
            editEl.style.border="none"
            editEl.style.margin="2px";
            editEl.style.fontFamily="Maven pro";
            editEl.addEventListener('click', oneditClick);
    
        
            containerEl.appendChild(editEl);

            containerEl.appendChild(btnEL);
            transactionEl.appendChild(containerEl);
    }
    sortall();
    for(var i=0; i < state.transactions.length; i++)
    {
        transactionsort = document.createElement('li');
        transactionsort.append(state.filtern[i]);
        transactionsort.style.alignContent="center";
        transactionsSortEl.appendChild(transactionsort);

        containerEl = document.createElement('div');
        amountEl = document.createElement('span');
        qutyEl = document.createElement('span');
        totalamnt =document.createElement('span');

        if(state.filtertype[i] == 'income')
        {
            amountEl.style.color= "rgb(27, 216, 27)";
            totalamnt.style.color = "rgb(27, 216, 27)";
        }
        else if(state.filtertype[i] == 'expense')
        {
            amountEl.style.color="red";
            totalamnt.style.color="red";
        }
        else if(state.filtertype[i] == 'savings')
        {
            amountEl.style.color="#1F51FF";
            totalamnt.style.color="#1F51FF";

        }
        else if(state.filtertype[i] == 'payments')
        {
            amountEl.style.color="red";
        }
        amountEl.style.margin= "25px";
        qutyEl.style.margin="25px";
        totalamnt.style.margin="25px";
        amountEl.innerHTML = `Rs.${state.filteramnt[i]}`;
        qutyEl.innerHTML = `x ${state.filterqu[i]}`;
        totalamnt.innerHTML = `Rs.${state.filtertotal[i]}`;

        
        containerEl.appendChild(amountEl);
        containerEl.appendChild(qutyEl);
        containerEl.appendChild(totalamnt);
        
        editEl=document.createElement('button');
        editEl.setAttribute('data-id', item.id);
        editEl.innerHTML='EDIT';
        editEl.style.color="#c7c7c7";
        editEl.style.backgroundColor="#131419";
        editEl.style.border="none"
        editEl.style.margin="2px";
        editEl.style.fontFamily="Maven pro";
        editEl.addEventListener('click', oneditClick);
    
        
            containerEl.appendChild(editEl);

            //containerEl.appendChild(btnEL);
            
            transactionsort.appendChild(containerEl);
    }
}


init();