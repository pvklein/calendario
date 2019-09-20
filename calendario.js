$( document ).ready(function() {
    
    //$('#myModal .close').append('<h4 class="modal-title">Modal Header</h4>');
    //$('#myModal').modal('show');
    //$('#myModal').modal('show');
    var d = new Date();
    //Para comporbar si diciembre lo hace bien d.setMonth(d.getMonth()-8);
    var day=d.getDay();
    var month=d.getMonth()+1;
    var year=d.getFullYear();
    var day_week=d.getDay();       

    var my_last_next=[];
    my_last_next.length=6;

    my_last_next=calcula_anterior_posterio(month,year);
    
    //Empezamos dibujando este mes    
    dibuja_dias(my_last_next);  
    
    $("#mesizqda").click(function(){
        $("#mesano").empty();
        $("#dias").empty();
        my_last_next=calcula_anterior_posterio(my_last_next[0],my_last_next[1]);   
        dibuja_dias(my_last_next);
            
    });

    $("#mesdcha").click(function(){
        $("#mesano").empty();
        $("#dias").empty();
        my_last_next=calcula_anterior_posterio(my_last_next[2],my_last_next[3]);
        dibuja_dias(my_last_next);
    });

    $(document).on('click', '.fecha', function(e) {
        console.log(this.id);        
        Cargar_modal(this.id);        
      });

});

//Dibuja el mes con el vector que le de exactamente
function dibuja_dias(my_last_next)
{
    console.log(my_last_next);    
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]
    $('#mesano').append('<div class="col"><h1>'+monthNames[my_last_next[4]-1]+' '+my_last_next[5]+'</h1></div>');

    var array_enmes=[];
    array_enmes.length=86;
    array_enmes=array_diasmes(my_last_next);    
    //console.log(array_enmes);

    var columnas="";
    
    for (j=0;j<=5;j++)
    {
        columnas=columnas+'<div class="row">';
        for (i=1;i<8;i++)
        {
            if (i<6)
            {                
                if (j*7+i<array_enmes[85] || j*7+i>=array_enmes[86])
                {
                    columnas=columnas+'<div name="midia" id="'+("0"+array_enmes[j*7+i].toString()).slice(-2)+array_enmes[j*7+i+42].toString()+'" class="col-sm col-1 fecha fondo-claro letra-clara"><h1>'+array_enmes[j*7+i]+'</h1></br></div>';
                }
                else
                {
                    columnas=columnas+'<div name="midia" id="'+("0"+array_enmes[j*7+i].toString()).slice(-2)+array_enmes[j*7+i+42].toString()+'" class="col-sm col-1 fecha fondo-claro letra-oscura"><h1>'+array_enmes[j*7+i]+'</h1></br></div>';
                }
            }
            else
            {
                if (j*7+i<array_enmes[85] || j*7+i>=array_enmes[86])
                {
                    columnas=columnas+'<div name="midia" id="'+("0"+array_enmes[j*7+i].toString()).slice(-2)+array_enmes[j*7+i+42].toString()+'" class="col-sm col-1 fecha fondo-oscuro letra-clara"><h1>'+array_enmes[j*7+i]+'</h1></br></div>';
                }
                else
                {
                    columnas=columnas+'<div name="midia" id="'+("0"+array_enmes[j*7+i].toString()).slice(-2)+array_enmes[j*7+i+42].toString()+'" class="col-sm col-1 fecha fondo-oscuro letra-oscura"><h1>'+array_enmes[j*7+i]+'</h1></br></div>';
                }
            }
        } 
        columnas=columnas+'</div>';
    }
    $('#dias').append(columnas);
    Dibujar_Titulos(my_last_next[4],my_last_next[5])
}

function array_diasmes(my_last_next)
{  
    var month=my_last_next[4];
    var year=my_last_next[5];
    var array_mes=[];
    array_mes.length=86; 

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

    for (var i=1;i<firstDaymonth;i++)
    {
        array_mes[i]=days_inlastmonth-firstDaymonth+i+1;
        array_mes[i+42]=("0"+my_last_next[0].toString()).slice(-2)+my_last_next[1].toString()
   }
   array_mes[85]=firstDaymonth;
   var j=1;
   for (var i=firstDaymonth;i<days_inmonth+firstDaymonth;i++)
    {
        array_mes[i]=j;
        array_mes[i+42]=("0"+my_last_next[4].toString()).slice(-2)+my_last_next[5].toString()
        j++;
    }
    array_mes[86]=days_inmonth+firstDaymonth;
    j=1;
    for (var i=days_inmonth+firstDaymonth;i<43;i++)
    {
        array_mes[i]=j;
        array_mes[i+42]=("0"+my_last_next[2].toString()).slice(-2)+my_last_next[3].toString()
        j++;
    }
    //console.log(array_mes);
    return array_mes;
    //console.log(firstDaymonth);
    
}

function calcula_anterior_posterio(month,year)
{
    //Defined: [last_month, last_year, next_month, next_year, actual_month, actual_year]
    var array_anterior_posterior=[];
    array_anterior_posterior.length=6;

    if (month==1)
    {
        array_anterior_posterior[1]=year-1;
        array_anterior_posterior[3]=year;
        array_anterior_posterior[0]=12;
        array_anterior_posterior[2]=month+1;
    }
    else
    {
        if (month==12)
        {
            array_anterior_posterior[1]=year;
            array_anterior_posterior[3]=year+1;
            array_anterior_posterior[0]=month-1;
            array_anterior_posterior[2]=1;

        }
        else
        {
            array_anterior_posterior[1]=year;
            array_anterior_posterior[3]=year;
            array_anterior_posterior[0]=month-1;
            array_anterior_posterior[2]=month+1;
        }
    }
    array_anterior_posterior[4]=month;
    array_anterior_posterior[5]=year;
    return array_anterior_posterior;

}

function Dibujar_Titulos(month,year)
{    
    var funcion='encontrartitulos';       
	
	var parametros = {
                "select" : funcion,				
				"month" : month,
				"year" : year
        };
        $.ajax({
                data:  parametros,
                url:   'gestionacalendario.php',
                type:  'post',
                beforeSend: function () {
                },
                success:  function (response) {
                    var obj = JSON.parse(response);
                    $.each(obj, function(key, value) {                        
                        var mid='#'+value['fecha'];                        
                        $(mid).append('<span class="glyphicon glyphicon-pushpin red"></span>&nbsp;<span class="red">'+value['titulo']+'</span></br>');
                        
                   });

                },
				error: function() {
          			alert('Error occurs2!');
       			}

        });	
}

function Cargar_modal(miid)
{    
    var funcion='recuperamodal';       
	
	var parametros = {
                "select" : funcion,				
				"miid" : miid
        };
        $.ajax({
                data:  parametros,
                url:   'gestionacalendario.php',
                type:  'post',
                beforeSend: function () {
                },
                success:  function (response) {
                    var visible=true;
                    var obj = JSON.parse(response);
                    $('#myModal .modal-body').empty(); 
                    $.each(obj, function(key, value) {      
                        //alert(value);
                        if (value=="error"){
                            visible=false;
                        } 
                        else
                        {
                            $('#myModal .modal-body').append(value['titulo']);                         
                            $('#myModal .modal-body').append("</br></br>");
                            $('#myModal .modal-body').append("Horario: 17:30 - 19:30</br>");
                            $('#myModal .modal-body').append("Descripción: "+value['descripcion']+"</br></br>");
                            visible=true;
                        }
                        //alert(value['titulo']);                                                                       
                        //var mid='#'+value['fecha'];                        
                        //$(mid).append('<span class="glyphicon glyphicon-pushpin red"></span>&nbsp;<span class="red">'+value['titulo']+'</span></br>');
                        
                   });
                   if(visible)
                   {
                   $('#myModal').modal('show');
                   }

                },
				error: function() {
          			alert('Error occurs2!');
       			}

        });	
}

