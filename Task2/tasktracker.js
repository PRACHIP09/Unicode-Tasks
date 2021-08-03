var state = {
    time: 200,
    compulsory: 150,
    notcompulsory: 50,
    completetime: 20,
    routines:[
        //{id: uniqueid() ,name: 'walking' , time: 100 ,date: '29/10/201',type:'compulsory',num:1},
        //{id: uniqueid() ,name: 'planting', time: 70, date: '29/10/201',type:'compulsory',num:2},
        //{id: uniqueid() ,name: 'reading', time: 50 , date: '29/10/201',type:'notcompulsory':num:3},
    ],

    taskcompn:[ ],taskcompd: [ ],taskcompti : [ ],taskcompty : [ ],taskcompid:[],
    tasknotcompn:[ ],tasknotcompd: [ ],tasknotcompti : [ ],tasknotcompty : [ ],tasknotcompid:[],
    copyn:[ ],copyd: [ ],copyti : [ ],copyty : [ ],copyid:[],
    filterd:[],filtern: [],filterti:[],filterty:[],filterid:[],
}
var timetrackEl = document.querySelector('#timetrack');
var completeEl = document.querySelector('#completet');
var timeyaddEl = document.querySelector('#time_yadd');
var timenaddEl = document.querySelector('#time_nadd');
var RoutinesEl = document.querySelector('#Routine');
var RoutinesSortEl = document.querySelector('#Routinesort')
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
        type: type,
     };
    state.routines.push(routines);
    
    calculate();
    }
    else{alert('Please enter data')}
}

function onYestimeClick()
{
    addRoutines(nameEl.value, timeElInput.value, dateElInput.value,  'compulsory');

}
function onNotimeClick()
{
    addRoutines(nameEl.value, timeElInput.value,dateElInput.value,  'notcompulsory')
}
function oncompleteclick(event)
{
    var deletesort;
    var id = parseInt(event.target.getAttribute('data-id'));
    for(var i = 0 ; i < state.routines.length ; i++)
    {
        if (state.routines[i].id === id && state.routines[i].type != 'complete'){

            temp = state.routines[i].type;
            state.routines[i].type = 'complete';
            state.routines[i].tempor = temp;
        }
        if(state.filterid[i] === id && state.routines[i].type != 'complete'){
            deletesort=i;
        }
        state.filterd.splice(deletesort, 1);
        state.filtern.splice(deletesort, 1);
        state.filterti.splice(deletesort, 1);
        state.filterty.splice(deletesort, 1);
        state.filterid.splice(deletesort, 1); 

    }
    display();
    calculate();
}  
function sortall()
{    
    var i;
    var num=state.routines.length;
    for(i=0;i<num;i++)
    {

        if(state.routines[i].type == 'compulsory')
        {
             
                state.taskcompn[i] = state.routines[i].name;
                state.taskcompd[i] = state.routines[i].date;
                state.taskcompti[i] = state.routines[i].time;
                state.taskcompty[i] = state.routines[i].type;
                state.taskcompid[i] = state.routines[i].id;
        }
        else if(state.routines[i].type == 'notcompulsory')
        {     
                state.tasknotcompn[i] = state.routines[i].name;
                state.tasknotcompd[i] = state.routines[i].date;
                state.tasknotcompti[i] = state.routines[i].time;
                state.tasknotcompty[i] = state.routines[i].type;
                state.tasknotcompid[i] = state.routines[i].id;
                
        }   
        console.log(state.taskcompn,state.tasknotcompn)
        copyn = state.taskcompn.concat(state.tasknotcompn)
        copyd = state.taskcompd.concat(state.tasknotcompd)
        copyti = state.taskcompti.concat(state.tasknotcompti)
        copyty = state.taskcompty.concat(state.tasknotcompty)
        copyid = state.taskcompid.concat(state.tasknotcompid);

        state.filtern = copyn.filter(el => {
            return el != null && el != '';
        });
        state.filterd = copyd.filter(el => {
            return el != null && el != '';
        });
        state.filterti = copyti.filter(el => {
            return el != null && el != '';
        });
        state.filterty = copyty.filter(el => {
            return el != null && el != '';
        });
        state.filterid = copyid.filter(el => {
            return el != null && el != '';
        });
    }
    console.log(state.filtern,state.filterd,state.filterti,state.filterty,state.filterid)
    
}   
function onDeleteClick(event)
{
    var id = parseInt(event.target.getAttribute('data-id'));
    var deleteIndex,deletesort;
    for(var i = 0 ; i < state.routines.length ; i++)
    {
        if (state.routines[i].id === id){
            deleteIndex = i;
        }
        if(state.filterid[i]=== id){
            deletesort = i;
        }
    }
    state.routines.splice(deleteIndex, 1);
    state.taskcompn.splice(deleteIndex, 1);
    state.taskcompd.splice(deleteIndex, 1);
    state.taskcompti.splice(deleteIndex, 1);
    state.taskcompty.splice(deleteIndex, 1);
    state.taskcompid.splice(deleteIndex, 1);
    state.tasknotcompn.splice(deleteIndex, 1);
    state.tasknotcompd.splice(deleteIndex, 1);
    state.tasknotcompti.splice(deleteIndex, 1);
    state.tasknotcompty.splice(deleteIndex, 1);
    state.tasknotcompid.splice(deleteIndex, 1);
    state.filterd.splice(deletesort, 1);
    state.filtern.splice(deletesort, 1);
    state.filterti.splice(deletesort, 1);
    state.filterty.splice(deletesort, 1);
    state.filterid.splice(deletesort, 1);
    calculate();
}
function oneditClick(event)
{
    var id = parseInt(event.target.getAttribute('data-id'));
    for(var i = 0 ; i < state.routines.length ; i++)
    {

        if (state.routines[i].id === id && state.routines[i].type != 'complete'){

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

        
    var RoutineEl, containerEl, timeEl,dateEl,  btnEl ,editEl,compel,RoutinesortEl;  
    RoutinesEl.innerHTML = '';
    RoutinesSortEl.innerHTML = '';
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
        else if(item.type === 'complete')
        {
            timeEl.classList.add('completeall');
            dateEl.classList.add('completeall');
        }
        timeEl.innerHTML = `${item.time} mins`;
       dateEl.innerHTML = `${item.date}` ;
        
        containerEl.appendChild(timeEl);
        containerEl.appendChild(dateEl);

        compel=document.createElement('button');
        compel.setAttribute('data-id',item.id);
        compel.innerHTML = 'COMPLETE';
        compel.style.color="red";
        compel.style.backgroundColor="#131419";
        compel.style.border="none";
        compel.style.marginRight="2px";
        compel.style.marginLeft="5px";
        compel.style.fontFamily="Maven pro";
        compel.addEventListener('click', oncompleteclick);
        containerEl.appendChild(compel);

        btnEl=document.createElement('button');
        btnEl.setAttribute('data-id', item.id);
        btnEl.innerHTML='X';
        btnEl.style.backgroundColor="#131419";
        btnEl.style.color="red";
        btnEl.style.border="none"
        btnEl.style.margin="2px";
        btnEl.style.fontFamily="Maven pro";
        btnEl.addEventListener('click', onDeleteClick);

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
        containerEl.appendChild(btnEl);
        RoutineEl.appendChild(containerEl);      
    }
    sortall();
    for(var i=0; i < state.routines.length; i++)
    {
        RoutinesortEl = document.createElement('li');
        RoutinesortEl.append(state.filtern[i]);
        RoutinesSortEl.appendChild(RoutinesortEl);

        containerEl = document.createElement('div');
        dateEl=document.createElement('span');
        timeEl =document.createElement('span');

        if(state.filterty[i]=='compulsory')
        {
            timeEl.style.color="rgb(27, 216, 27)";
        }
        else if(state.filterty[i]=='notcompulsory')
        {
            timeEl.style.color="#1F51FF";
        }
        else if(state.filterty[i] == 'complete')
        {
            timeEl.style.color="red"
        }
        dateEl.style.color="red";
        timeEl.style.margin="30px";
        dateEl.style.margin="30px";
        timeEl.innerHTML = `${state.filterti[i]} mins`;
        dateEl.innerHTML = `${state.filterd[i]}` ;
        
        containerEl.appendChild(timeEl);
        containerEl.appendChild(dateEl);

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


        RoutinesortEl.appendChild(containerEl);      
    }
   
}

init();