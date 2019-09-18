$( document ).ready(function() {
    
    var d = new Date();
    //Para comporbar si diciembre lo hace bien d.setMonth(d.getMonth()-8);
    var day=d.getDay();
    var month=d.getMonth()+1;
    var year=d.getFullYear();
    var day_week=d.getDay();

    if (month==1)
    {
        var lastyear=year-1;
        var lastmonth=12;
    }
    else
    {
        var lastyear=year;
        var lastmonth=month-1;
    }   

    //Empezamos dibujando este mes
    dibuja_dias(month,year);    

    $("#mesizqda").click(function(){
        $("#mesano").empty();
        $("#dias").empty();
        dibuja_dias(lastmonth,lastyear)
        //alert("izquierda");
    });

});

function dibuja_dias(month,year)
{
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
    $('#mesano').append('<div class="col"><h1>'+monthNames[month-1]+' '+year+'</h1></div>');

    var array_enmes=[];
    array_enmes.length=42;
    array_enmes=array_diasmes(month,year);    

    var columnas="";
    
    for (j=0;j<=5;j++)
    {
        columnas=columnas+'<div class="row">';
        for (i=1;i<8;i++)
        {
            columnas=columnas+'<div class="col-sm col-1 fecha"><h1>'+array_enmes[j*7+i]+'</h1></div>';
        } 
        columnas=columnas+'</div>';
    }
    $('#dias').append(columnas);
}

function array_diasmes(month,year)
{      

    if (month==1)
    {
        var lastyear=year-1;
        var lastmonth=12;
    }
    else
    {
        var lastyear=year;
        var lastmonth=month-1;
    }
    
    var days_inmonth=new Date(year,month,0).getDate();    
    var days_inlastmonth=new Date(lastyear,lastmonth,0).getDate();
    
    var firstDaymonth = new Date(year, month-1, 1).getDay();
    if (firstDaymonth==0)
    {
        firstDaymonth=7;
    }
    var array_mes=[];
    array_mes.length=42;

    for (var i=1;i<firstDaymonth;i++)
    {
        array_mes[i]=days_inlastmonth-firstDaymonth+i+1;
   }

   var j=1;
   for (var i=firstDaymonth;i<=days_inmonth+firstDaymonth;i++)
    {
        array_mes[i]=j;
        j++;
    }
    j=1;
    for (var i=days_inmonth+firstDaymonth+1;i<=43;i++)
    {
        array_mes[i]=j;
        j++;
    }
    
    return array_mes;
    //console.log(firstDaymonth);
    
}

