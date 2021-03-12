window.onload = function(){
    function Producto(nombre, precio){
        this.nombre = nombre;
        this.precio = parseInt(precio);
    }
    
    let producto1 = new Producto("Internet Móvil 5G", 1500);
    let producto2 = new Producto("Telefonía Móvil", 1200);
    let producto3 = new Producto("Televisión 4K", 1000);

    var valorInternet = 0;
    var valorCable = 0;
    var valorTelefoníaMóvil = 0;
    var iva = 1.21;

    const todos = [producto1, producto2, producto3];
    console.log(todos);

    const elegidos = [];

    var nombreUsuario;
    
      
    //MODAL NOMBRE//
    
    $(document).ready(function(){
        if (localStorage.getItem('nombre')== undefined){

            $("#openModal").delay(600).fadeIn("slow");

            $("#inputName").on('keyup', function (e) {
                var keycode = e.keyCode || e.which;
                if (keycode == 13) {
                    localStorage.setItem('nombre', document.getElementById("inputName").value)
                    nombreUsuario = document.getElementById("inputName").value;
                    actualizarNombre();
                    //alert("hola, " + nombreUsuario +"!");
                    if (nombreUsuario.length >= 3){
                        $("#openModal").fadeOut();
                        $("#saludo").append(`<h1>¡Hola ${nombreUsuario}!</h1>`);
                    } else{
                        alert("Por favor ingresá un nombre válido")
                    }
                    console.log(localStorage.getItem("nombre"));
                }
            });
    
        } else if (localStorage.getItem('nombre')!== undefined){
            $("#saludo").append(`<h1>¡Hola de nuevo, ${localStorage.getItem('nombre')}!</h1>`);
            actualizarNombre();
        }
    });

    function actualizarNombre(){
        nombreUsuario = localStorage.getItem('nombre');
        document.final.finalInputName.value =  nombreUsuario;
    }

    

    function mostrarPrecio(){
        let cuentaFinal = (parseInt(valorInternet + valorTelefoníaMóvil + valorCable)*iva);
        $("#resumenContainer").empty()
                            .hide()
                            .fadeIn(1000)
                            .append(`<section class="resumen" id="resumen">
                                <div class="containerResumen">
                                    <div class="boxResumen">
                                        <span></span>
                                        <div class="contentResumen" id="contentResumen">
                                        <p>Estás contratando ${(elegidos.join(', '))}</p><br>
                                        <h2>El valor de tu factura será de $${cuentaFinal}.-</h2><br>
                                        <button id="finalizar">Finalizar contratación</button>
                                        </div>
                                    </div>
                                </div>
                            </section>`);  
    
        //Boton Finalizar
        $("#finalizar").click(function(){
            console.log("stuar");
            $("#finalModal").fadeIn();

        })                    

        console.log(parseInt(valorInternet + valorTelefoníaMóvil + valorCable)*iva);
        console.log(elegidos);
    }

    


    //let botonInt = document.getElementById("siInt");
    //let botonIntNo = document.getElementById("noInt");

    $("#siInt").click(function() {
        console.log("Contrataste internet");
        valorInternet = producto1.precio;
        $(this).fadeOut(function(){
            $("#noInt").fadeIn();
        });
        //botonInt.style.display = "none";
        //botonIntNo.style.display = "inline-block";
        elegidos.push("Internet");
    });

    $("#noInt").click(function() {
        console.log("retiraste internet");
        valorInternet = 0;
        $(this).fadeOut(function(){
            $("#siInt").fadeIn();
        });
        //botonIntNo.style.display = "none";
        //botonInt.style.display = "inline-block";
        elegidos.pop("Internet");
    });
    
    //let botonMov = document.getElementById("siMov");
    //let botonMovNo = document.getElementById("noMov");

    $("#siMov").click(function() {
        console.log("Contrataste movil");
        valorTelefoníaMóvil = producto2.precio;
        $(this).fadeOut(function(){
            $("#noMov").fadeIn();
        });
        //botonMov.style.display = "none";
        //botonMovNo.style.display = "inline-block";
        elegidos.push("Telefonía Móvil");
    });

    $("#noMov").click(function() {
        console.log("retiraste movil");
        valorTelefoníaMóvil = 0;
        $(this).fadeOut(function(){
            $("#siMov").fadeIn();
        });
        //botonMovNo.style.display = "none";
        //botonMov.style.display = "inline-block";
        elegidos.pop("Telefonía Móvil");
    });

    //let botonTv = document.getElementById("siTv");
    //let botonTvNo = document.getElementById("noTv");

    $("#siTv").click(function() {
        console.log("Contrataste cable");
        valorCable = producto3.precio;
        $(this).fadeOut(function(){
            $("#noTv").fadeIn();
        });
        //botonTv.style.display = "none";
        //botonTvNo.style.display = "inline-block";
        elegidos.push("Televisíon 4K");
    });

    $("#noTv").click(function() {
        console.log("retiraste cable");
        valorCable = 0;
        $(this).fadeOut(function(){
            $("#siTv").fadeIn(); 
        });
        //botonTvNo.style.display = "none";
        //botonTv.style.display = "inline-block";
        elegidos.pop("Televisíon 4K");
    });

    //Boton seguir

    $("#seguir").click(function(){
        console.log("estuart");
        mostrarPrecio(); 
    })

    //Boton final


    $("#botonFinal").click(function(){

        let mailUsuario;
        let apellidoUsuario;
        function verificarApellido(){
            apellidoUsuario=document.getElementById("finalInputSubName").value;
            console.log(apellidoUsuario);
        }
        function verificarMail(){
            mailUsuario = document.getElementById("inputMail").value;
            console.log(mailUsuario);
        }

        verificarMail();
        verificarApellido();

        if (apellidoUsuario == ""){  
            $("#errorApellido").empty()
                                .append(`<p> Ingresá tu apellido </p>`);
        } else if (apellidoUsuario !== "" && !mailUsuario.includes("@")) {
            $("#errorApellido").empty()
            $("#errorMail").empty()
                            .append(`<p> Ingresá un mail correcto </p>`);

        }else if (!mailUsuario.includes("@")){
            $("#errorMail")
                            .append(`<p> Ingresá un mail correcto </p>`);
        }
        else{
            $("#finalModal").fadeOut();
            location.href = "index.html?#start";
        }

        
    });



}