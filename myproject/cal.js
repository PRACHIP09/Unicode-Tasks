function display(val){
    const display=document.getElementById('output-screen')
    display.value += val
}
function Calculate()
{
    const display=document.getElementById('output-screen')
    let num=display.value
    let result=eval(num)
    display.value=result 
}
function Clear()
{
    const display=document.getElementById('output-screen')
    display.value=''
}
function del()
{
    const display=document.getElementById('output-screen')
    display.value=display.value.slice(0,-1)
}

function x2()
{
    const display=document.getElementById('output-screen')
    display.value=Math.pow(display.value,2)
}
function x3()
{
    const display=document.getElementById('output-screen')
    display.value=Math.pow(display.value,3)
}
function sqrt()
{
    const display=document.getElementById('output-screen')
    display.value=Math.sqrt(display.value)
}
function sin()
{
    const display=document.getElementById('output-screen')
    if((display.value/90)%2 ==0)
    {
            display.value=0
    }
    display.value=Math.sin((Math.PI*display.value)/180)
}
function cos()
{
    const display=document.getElementById('output-screen')
    if(display.value%90==0)
    {
        if((display.value/90)%2 !=0)
        {
            display.value=0
        }
        else
        {
            display.value=Math.cos(display.value*(Math.PI/180))
        }

    }
        else{
        display.value=Math.cos(display.value*(Math.PI/180))
        }
}
function tan()
{
    const display=document.getElementById('output-screen')
    if(display.value%90==0)
    {
        if((display.value/90)%2!=0)
        {
        
        display.value="∞"
        }
        else
        {
        display.value=0
        }
    }
    else
    {
        display.value=Math.tan(display.value*(Math.PI/180))
    }
}
function ln()
{
    const display=document.getElementById('output-screen')
    display.value=Math.log(display.value)
}
function log()
{
    const display=document.getElementById('output-screen')
    display.value=Math.log10(display.value)
}
function fac()
{
    const display=document.getElementById('output-screen')
    if (display.value < 0)   
    {
        display.value="error"
    }
    else
    {
        let fact=1
        for(i=1;i<=display.value;i++)
            {fact*=i}
        display.value=fact
    }
}
function e()
{
    const display=document.getElementById('output-screen')
    display.value=Math.exp(display.value)
}




