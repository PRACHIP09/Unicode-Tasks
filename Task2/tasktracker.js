var state = {
    time: 200,
    compulsory: 150,
    notcompulsory: 50,
    completetime: 20,
    routines:[
        //{id: uniqueid() ,name: 'walking' , time: 100 ,date: '29/10/201',type:'compulsory'},
        //{id: uniqueid() ,name: 'planting', time: 70, date: '29/10/201',type:'compulsory'},
        //{id: uniqueid() ,name: 'reading', time: 50 , date: '29/10/201',type:'notcompulsory'},

    
    ]
}
var timetrackEl = document.querySelector('#timetrack');
var completeEl = document.querySelector('#completet');
var timeyaddEl = document.querySelector('#time_yadd');
var timenaddEl = document.querySelector('#time_nadd');
var RoutinesEl = document.querySelector('#Routine');
var ytimebtnEl = document.querySelector('#time_ytakenbtn');
var ntimebtnEl = document.querySelector('#time_ntakenbtn');
var nameEl = document.querySelector('#name');
var timeElInput = document.querySelector('#time');
var dateElInput = document.getElementById('date');


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
    ytimebtnEl.addEventListener('click',onYestimeClick);
    ntimebtnEl.addEventListener('click',onNotimeClick);
}


function addRoutines(name, time , date ,type)
{
    if(name !== '' && time !== '' && date !== '')
    {
    var routines={
        id: uniqueid(),
        name: name,
        time: parseInt(time),
        date: date,
        type: type 
     };
    state.routines.push(routines);
    
    calculate();
    }
    else{alert('Please enter data')}
}

function onYestimeClick()
{
    addRoutines(nameEl.value, timeElInput.value, dateElInput.value,  'compulsory')
}
function onNotimeClick()
{
    addRoutines(nameEl.value, timeElInput.value,dateElInput.value,  'notcompulsory')
}
function oncompleteclick(event)
{

    var id = parseInt(event.target.getAttribute('data-id'));
    for(var i = 0 ; i < state.routines.length ; i++)
    {
        if (state.routines[i].id === id){
            state.routines[i].tempor = state.routines[i].type;
            state.routines[i].type = 'complete';
        }

    }
    display();
    calculate();
}     
function onDeleteClick(event)
{
    var id = parseInt(event.target.getAttribute('data-id'));
    var deleteIndex;
    for(var i = 0 ; i < state.routines.length ; i++)
    {
        if (state.routines[i].id === id){
            deleteIndex = i;
            break;
        }
    }
    
    state.routines.splice(deleteIndex, 1);
    
    calculate();
}
function oneditClick(event)
{
    var id = parseInt(event.target.getAttribute('data-id'));
    for(var i = 0 ; i < state.routines.length ; i++)
    {

        if (state.routines[i].id === id){

            state.routines[i].name =prompt("enetr name :",state.routines[i].name)
            state.routines[i].time =parseInt(prompt("enter time :",state.routines[i].time))
            state.routines[i].date =prompt("enter the date :",state.routines[i].date)
        } 
         display();
         calculate();  //addRoutines(nameEl.value, timeElInput.value, dateElInput.value,  'compulsory')
    }

}
function calculate()
{
    var timet = 0,
        completet=0,
        compulsoryt = 0,
        notcompulsoryt = 0,
        item;
    
    for(var i=0; i < state.routines.length; i++)
    {
        item=state.routines[i];

        if(item.type === 'compulsory')
        {
            compulsoryt += item.time;
        }
        else if(item.type === 'notcompulsory')
        {
            notcompulsoryt += item.time;
                
        }
        else if(item.type === 'complete' && item.tempor === 'compulsory')
        {
            completet += item.time;
            compulsoryt += item.time;
        }
        else if(item.type === 'complete' && item.tempor === 'notcompulsory')
        {
            completet += item.time;
            notcompulsoryt += item.time;
                
        }

    
    }
    timet = compulsoryt + notcompulsoryt;

    state.time = timet;
    state.compulsory = compulsoryt;
    state.notcompulsory = notcompulsoryt;
    state.completetime = completet;

    display();
    
}


function display()
{
    timetrackEl.innerHTML = `${state.time} mins`;
    completeEl.innerHTML = `${state.completetime} mins`
    timeyaddEl.innerHTML = `${state.compulsory} mins`;
    timenaddEl.innerHTML = `${state.notcompulsory} mins`;

    var RoutineEl, containerEl, timeEl,dateEl,  btnEl ,editEl,compel;
    RoutinesEl.innerHTML = '';
    
    for(var i=0; i < state.routines.length; i++)
    {
        item = state.routines[i];
        RoutineEl = document.createElement('li');
        RoutineEl.append(item.name);
        RoutinesEl.appendChild(RoutineEl);

        containerEl = document.createElement('div');
        dateEl=document.createElement('span');
        timeEl =document.createElement('span');
        
        if(item.type === 'compulsory')
        {
            timeEl.classList.add('time_taken_y');
            dateEl.classList.add('date');
        }
        else if(item.type === 'notcompulsory')
        {
            timeEl.classList.add('time_taken_n');
           dateEl.classList.add('date');
        }
        else if(item.type = 'complete')
        {
            timeEl.classList.add('completeall');
            dateEl.classList.add('completeall');
        }
        timeEl.innerHTML = `${item.time} mins`;
       dateEl.innerHTML = `${item.date}` ;
        
        containerEl.appendChild(timeEl);
        containerEl.appendChild(dateEl);

        btnEl=document.createElement('button');
        btnEl.setAttribute('data-id', item.id);
        btnEl.innerHTML='X';
        btnEl.addEventListener('click', onDeleteClick);

        editEl=document.createElement('button');
        editEl.setAttribute('data-id', item.id);
        editEl.innerHTML='edit';
        editEl.addEventListener('click', oneditClick);

        compel=document.createElement('button');
        compel.setAttribute('data-id',item.id);
        compel.innerHTML = 'Complete';
        compel.addEventListener('click', oncompleteclick);
        
        containerEl.appendChild(compel);
        containerEl.appendChild(editEl);
        containerEl.appendChild(btnEl);
        RoutineEl.appendChild(containerEl);      
           
    }
}

init();