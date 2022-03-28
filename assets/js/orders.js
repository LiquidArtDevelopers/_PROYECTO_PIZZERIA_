
let contador = 0;
//Array para el precio donde el precio se suma de entre todos sus valores: masa[0],tipo[1], topping[2] y bebida[3].
let ticket = [0,0,0,0,0];
//creamos
//creamos un objeto pedido
const ordenPedido={
    masa:'',
    tipo:'',
    topping:[],
    bebida:[],
    otros:[],
    precio:0,
}
const pedidos=[];
export default function pedido(){
    comanda();
    escribirPedido();
}
const escribirPedido=()=>{
    const $box_comprar=document.querySelector('.comprar');
    const $notaPizza=document.querySelector('.list-fact');
    const $btn_comprar=document.querySelector('.btn-comprar');
    const $caja_cuaderno=document.querySelector('.caja-cuaderno');
    let template_fact='';
    const getText=(type="")=> document.getElementById(type).textContent;
    const createLiText=(ckey)=>{
        ordenPedido[ckey].forEach((value,index,arr)=>{
            if(arr[index]){
               template_fact+=`<li> ${getText(value)}</li>`;
            }
        });
    }
    const modPedido='Modificar pedido', hacerCompra='Hacer mi compra';
    let click=false;
    document.querySelector('.btn-comprar').classList.add('active');
    document.addEventListener('click',(e)=>{
        if(e.target.matches('.btn-comprar')){
            $caja_cuaderno.classList.toggle('disable');
            const pr=document.querySelector('.precio');
            $box_comprar.classList.toggle('active');
            $btn_comprar.classList.toggle('btn-active');
            if($btn_comprar.textContent == hacerCompra){
                $btn_comprar.textContent = modPedido;
            }else{
                $btn_comprar.textContent=hacerCompra;
            }
            Object.entries(ordenPedido).forEach(([key,value])=>{
                if(value && value!==0){
                    if(key==='masa'){
                        template_fact="<h3>Pizza<h3>";
                        template_fact+= `<li> ${document.querySelector('.txt5').textContent.toUpperCase()} ${getText(ordenPedido[key])}</li>`;
                    }
                    if(key=='tipo') template_fact+=`<li> ${document.querySelector('.txt9').textContent.toUpperCase()}   ${getText(ordenPedido[key])}</li>`;
                    if(key==='topping') createLiText(key);
                    if(key==='bebida') template_fact+="<h3>Bebidas<h3>", createLiText(key);
                    if(key==='otros') template_fact+="<h3>Otros<h3>",createLiText(key);
                    pr.textContent=`Total: ${ordenPedido['precio']}€`;
                }
            });
            click ? click=false : click=true;
            click ? $notaPizza.insertAdjacentHTML('afterbegin',template_fact) : $notaPizza.textContent='';
            
        }
    });
}

//Precios (esto ya lo traeremos de algún lado donde sea más fácil gestionar)
var precioPeq = 0, precioMed = 0, precioFam = 0, precioFin = 0, precioGru = 0, precioCqu = 0, precioTpp = 0, precioRef = 0, precioOtr = 0;

//cogemos los datos de los precios
fetch("assets/json/precios.json")
.then(response =>{
    if(response.ok)
        return response.text()
    else
        throw new Error(response.status);
})
.then(data =>{
    const rJs=JSON.parse(data);
    precioPeq = rJs.precio_pequena;
    precioMed = rJs.precio_mediana;
    precioFam = rJs.precio_familiar;
    precioFin = rJs.precio_fina;
    precioGru = rJs.precio_gruesa;
    precioCqu = rJs.precio_con_queso;
    precioTpp = rJs.precio_ingrediente;
    precioRef = rJs.precio_refresco;
    precioOtr = rJs.precio_anadidos;
})
.catch(err =>{
    //por si el json da error, le metemos precios
    console.error("ERROR", err.message)
    precioPeq = 6;
    precioMed = 8;
    precioFam = 10;
    precioFin = 1;
    precioGru = 2;
    precioCqu = 3;
    precioTpp = 1.5;
    precioRef = 2;
    precioOtr = 1.5;
});


console.log(precioFam)

function comanda(){    

    
    document.body.addEventListener("click", function(event){

        //escuchar la clase pesta (pestaña)
        if(event.target.classList.contains("pesta")){        
            console.log("pestaña: "+ event.target.id);
            cambiar_hoja(event.target.id);  
        }

        //escuchamos la hoja de pedido de pizza
        //tamaño
        if(event.target.classList.contains("nota1")){        
            console.log("Tamaño: "+ event.target.id);
            insertar_comanda(event.target.id);       
        }

        //tipo masa
        if(event.target.classList.contains("nota2")){     
            console.log("tipo: "+ event.target.id);
            insertar_comanda(event.target.id);          
        }

        //ingredientes
        if(event.target.classList.contains("nota3")){        
            console.log("ingrediente: "+ event.target.id);
            insertar_comanda(event.target.id);
        }
        //bebidas
        if(event.target.classList.contains("nota4")){        
            console.log("bebida: "+ event.target.id);
            insertar_comanda2(event.target.id);
        }

        //otros
        if(event.target.classList.contains("nota5")){        
            console.log("bebida: "+ event.target.id);
            insertar_comanda3(event.target.id);        
        }

        //si hay click en la marca de ingrediente seleccionado, quitamos html de la marca
        if(event.target.classList.contains("nota3Sel")){

            //Quitamos ralla de ingrediente
            console.log("Quitamos ingrediente: "+ event.target.id);
            document.querySelector(`#${event.target.id}`).remove();

            //Quitamos topping de la animación          
            let idt = event.target.id.split("i").join("");
            document.querySelector(`#t${idt}`).remove();
            contador-=1;
            ticket[2]-=precioTpp;
            
            //Quitamos topping del ticket
            let myIndex = ordenPedido['topping'].indexOf(idt);
            if (myIndex !== -1) {
                ordenPedido['topping'].splice(myIndex, 1);
            }   

            //si existe topping de queso rallado y el contador es =< que 2, quitamos el queso-rallado
            if(contador<=2 && document.querySelector(`#t10`)!=null){
                document.querySelector(`#t10`).remove();
            }
            calcTicket();           
        }

        //si hay click en la marca de bebidas, quitamos html de la marca (pendiente añadir más cantidad)
        if(event.target.classList.contains("nota4Sel")){

            //Quitamos ralla de ingrediente
            console.log("Quitamos bebida: "+ event.target.id);
            document.querySelector(`#${event.target.id}`).remove();
            ticket[3]-=precioRef;          
            
            calcTicket();            
        }

        //si hay click en la marca de otros, quitamos html de la marca (pendiente añadir más cantidad)
        if(event.target.classList.contains("nota5Sel")){

            //Quitamos ralla de ingrediente
            console.log("Quitamos complemento: "+ event.target.id);
            document.querySelector(`#${event.target.id}`).remove();
            ticket[4]-=precioOtr;
            calcTicket();            
        }
    });  
}

function cambiar_hoja(hoja){
    const oCuaderno01= document.querySelector("#cuaderno-01");
    const oCuaderno02= document.querySelector("#cuaderno-02");
    const oCuaderno03= document.querySelector("#cuaderno-03");
    switch(hoja){
        case "pest01":            
            oCuaderno01.style.zIndex= "8";    
            oCuaderno02.style.zIndex= "6";
            oCuaderno03.style.zIndex= "4";
            
            break;
        case "pest02":
            oCuaderno01.style.zIndex= "6";    
            oCuaderno02.style.zIndex= "8";
            oCuaderno03.style.zIndex= "4";
            break;
        case "pest03":
            oCuaderno01.style.indexZ= "4";    
            oCuaderno02.style.zIndex= "6";
            oCuaderno03.style.zIndex= "8";
            break;
    }
}

function insertar_comanda(com){

    const nota1Sel= document.querySelector(".nota1Sel");
    const nota2Sel= document.querySelector(".nota2Sel");
    const selecciones = document.querySelector("#selecciones");
    const resultado = document.querySelector("#resultado");
    
    contador=Number(contador);
    switch(com){
        //marcamos tamaño
        case "peq":
            nota1Sel.style.display="block";
            nota1Sel.style.top="205px";
            nota1Sel.style.left="19px";
            ordenPedido['masa']  = com;
            ticket[0]=precioPeq;
            break;
        case "med":
            nota1Sel.style.top="205px";
            nota1Sel.style.left="160px";
            ordenPedido['masa']  = com;
            ticket[0]=precioMed;
            break;
        case "fam":
            nota1Sel.style.display="block";
            nota1Sel.style.top="202px";
            nota1Sel.style.left="312px";
            ordenPedido['masa']  = com;
            ticket[0]=precioFam;
            break;
        //marcamos tipo de masa
        case "fin":
            nota2Sel.style.display="block";
            nota2Sel.style.top="340px";
            nota2Sel.style.left="10px";
            ordenPedido['tipo']  = com;
            ticket[1]=precioFin;
            break;        
        case "gru":
            nota2Sel.style.display="block";
            nota2Sel.style.top="340px";
            nota2Sel.style.left="125px";
            ordenPedido['tipo']  = com;
            ticket[1]=precioGru;
            break;
        case "cqu":
            nota2Sel.style.display="block";
            nota2Sel.style.top="340px";
            nota2Sel.style.left="299px";
            ordenPedido['tipo']  = com;
            ticket[1]=precioCqu;
            break;
        //marcamos (o desmarcamos)m ingredientes
        default:
            //si no existe, metemos            
            if(document.querySelector(`.nota3Sel${com}`)==null){
                let topP = "",leftP ="", etiquetas="", topping="";
                let indexxx;
                indexxx = Number(indexxx);
                switch(com){
                    case "1":
                        topP ="445px";
                        leftP = "45px";                        
                        indexxx=2;
                        topping+=`<img id="t1" src="assets/img/pizza/extra-queso.png" alt="">`;
                        ordenPedido['topping'].push(com);
                        ticket[2]+=precioTpp;
                        break;
                    case "2":
                        topP ="445px";
                        leftP = "175px";
                        indexxx=3;
                        topping+=`<img id="t2" src="assets/img/pizza/queso-cabra.png" alt="">`;
                        ordenPedido['topping'].push(com);
                        ticket[2]+=precioTpp;
                        break;
                    case "3":
                        topP ="435px";
                        leftP = "330px";
                        indexxx=5;
                        topping+=`<img id="t3" src="assets/img/pizza/aceitunas.png" alt="">`;
                        ordenPedido['topping'].push(com);
                        ticket[2]+=precioTpp;
                        break;
                    case "4":
                        topP ="530px";
                        leftP = "50px";
                        indexxx=8;
                        topping+=`<img id="t4" src="assets/img/pizza/pimiento-rojo.png" alt="">`;
                        ordenPedido['topping'].push(com);
                        ticket[2]+=precioTpp;
                        break;
                    case "5":
                        topP ="530px";
                        leftP = "190px";
                        indexxx=6;
                        topping+=`<img id="t5" src="assets/img/pizza/pimiento-verde.png" alt="">`;
                        ordenPedido['topping'].push(com);
                        ticket[2]+=precioTpp;
                        break;
                    case "6":
                        topP ="530px";
                        leftP = "345px";
                        indexxx=4;
                        topping+=`<img id="t6" src="assets/img/pizza/salami.png" alt="">`;
                        ordenPedido['topping'].push(com);
                        ticket[2]+=precioTpp;
                        break;
                    case "7":
                        topP ="605px";
                        leftP = "55px";
                        indexxx=10;
                        topping+=`<img id="t7" src="assets/img/pizza/champis.png" alt="">`;
                        ordenPedido['topping'].push(com);
                        ticket[2]+=precioTpp;
                        break;
                    case "8":
                        topP ="605px";
                        leftP = "200px";
                        indexxx=7;
                        topping+=`<img id="t8" src="assets/img/pizza/cebolla.png" alt="">`;
                        ordenPedido['topping'].push(com);
                        ticket[2]+=precioTpp;
                        break;
                    case "9":
                        topP ="605px";
                        leftP = "340px";
                        indexxx=9;
                        topping+=`<img id="t9" src="assets/img/pizza/bacon.png" alt="">`;
                        ordenPedido['topping'].push(com);
                        ticket[2]+=precioTpp;
                        break;                    
                }                
                //Insertamos HTML y cambiamos Style de las marcas
                etiquetas+=`<img id="i${com}" src="assets/img/pizza/select-ing.png" class="nota3Sel${com} nota3Sel" alt="">`            
                selecciones.insertAdjacentHTML('beforeend',etiquetas);
                document.querySelector(`.nota3Sel${com}`).style.display="block";
                document.querySelector(`.nota3Sel${com}`).style.top=topP;
                document.querySelector(`.nota3Sel${com}`).style.left=leftP;
                
                //Insertamos HTML y cambiamos Style del topping
                resultado.insertAdjacentHTML('beforeend',topping);
                document.querySelector(`#t${com}`).style.display="block";
                document.querySelector(`#t${com}`).style.zIndex=indexxx;
                console.log();
                contador+=1
                console.log(contador)
                if(contador==3){
                    let topping2=`<img id="t10" src="assets/img/pizza/queso-rallado.png" alt="">`;
                    indexxx=11;
                    resultado.insertAdjacentHTML('beforeend',topping2);
                    document.querySelector("#t10").style.display="block";
                    document.querySelector("#t10").style.zIndex=indexxx;
                }              
            }             
    }

    //llamamos a la función ticket para los cálculos
    /* document.querySelector("#preci").remove() */
    calcTicket()
}

function insertar_comanda2(com){

    const selecciones2 = document.querySelector("#selecciones2");
    let topP = "",leftP ="", etiquetas="";
    
    switch(com){
        //marcamos aguas
        case "agu":
            topP ="190px";
            leftP = "50px";            
            ordenPedido['bebida'].push(com);
            ticket[3]+=precioRef;
            break;
        case "aguG":
            topP ="190px";
            leftP = "240px";
            ordenPedido['bebida'].push(com);
            ticket[3]+=precioRef;
            break;
        //marcamos cervezas        
        case "cKel":
            topP ="315px";
            leftP = "35px";
            ordenPedido['bebida'].push(com);
            ticket[3]+=precioRef;
            break;        
        case "cEga":
            topP ="315px";
            leftP = "150px";
            ordenPedido['bebida'].push(com);
            ticket[3]+=precioRef;
            break;
        case "cSN":
            topP ="315px";
            leftP = "299px";
            ordenPedido['bebida'].push(com);
            ticket[3]+=precioRef;
            break;
        case "b1":
            topP ="445px";
            leftP = "40px";
            ordenPedido['bebida'].push(com);
            ticket[3]+=precioRef;
            break;
        case "b2":
            topP ="445px";
            leftP = "170px";
            ordenPedido['bebida'].push(com);
            ticket[3]+=precioRef;
            break;
        case "b3":
            topP ="445px";
            leftP = "305px";
            ordenPedido['bebida'].push(com);
            ticket[3]+=precioRef;
            break;
        case "b4":
            topP ="525px";
            leftP = "50px";
            ordenPedido['bebida'].push(com);
            ticket[3]+=precioRef;
            break;
        case "b5":
            topP ="525px";
            leftP = "195px";
            ordenPedido['bebida'].push(com);
            ticket[3]+=precioRef;
            break;
        case "b6":
            topP ="525px";
            leftP = "345px";
            ordenPedido['bebida'].push(com);
            ticket[3]+=precioRef;
            break;
        case "b7":
            topP ="605px";
            leftP = "55px";
            ordenPedido['bebida'].push(com);
            ticket[3]+=precioRef;
            break;
        case "b8":
            topP ="605px";
            leftP = "195px";
            ordenPedido['bebida'].push(com);
            ticket[3]+=precioRef;
            break;
        case "b9":
            topP ="605px";
            leftP = "345px";
            ordenPedido['bebida'].push(com);
            ticket[3]+=precioRef;     
            break;     
    }

    //si no existe, metemos            
    if(document.querySelector(`.nota4Sel${com}`)==null){
        
        //Insertamos HTML y cambiamos Style de las marcas
        etiquetas+=`<img id="b${com}" src="assets/img/pizza/select-ing.png" class="nota4Sel${com} nota4Sel" alt="">`            
        selecciones2.insertAdjacentHTML('beforeend',etiquetas);
        document.querySelector(`.nota4Sel${com}`).style.display="block";
        document.querySelector(`.nota4Sel${com}`).style.top=topP;
        document.querySelector(`.nota4Sel${com}`).style.left=leftP;
    }
    //llamamos a la función ticket para los cálculos
    /* document.querySelector("#preci").remove() */
    calcTicket()
}

function insertar_comanda3(com){

    const selecciones3 = document.querySelector("#selecciones3");
    let topP = "",leftP ="", etiquetas="";
    
    switch(com){
        //marcamos patatas
        case "oPfi":
            topP ="180px";
            leftP = "30px";            
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;
            break;
        case "oPde":
            topP ="180px";
            leftP = "150px";
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;
            break;
        case "oPcq":
            topP ="180px";
            leftP = "312px";
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;            
            break;
        //marcamos cervezas        
        case "oPol":
            topP ="315px";
            leftP = "50px";
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;
            break;        
        case "oAce":
            topP ="315px";
            leftP = "190px";
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;
            break;
        case "oNug":
            topP ="315px";
            leftP = "350px";
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;
            break;
        case "oH1":
            topP ="430px";
            leftP = "60px";
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;
            break;
        case "oH2":
            topP ="430px";
            leftP = "190px";
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;
            break;
        case "oH3":
            topP ="430px";
            leftP = "340px";
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;
            break;
        case "oH4":
            topP ="525px";
            leftP = "55px";
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;
            break;
        case "oH5":
            topP ="525px";
            leftP = "200px";
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;
            break;
        case "oH6":
            topP ="525px";
            leftP = "345px";
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;
            break;
        case "oH7":
            topP ="605px";
            leftP = "40px";
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;
            break;
        case "oH8":
            topP ="605px";
            leftP = "160px";
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;
            break;
        case "oH9":
            topP ="605px";
            leftP = "310px";
            ordenPedido['otros'].push(com);
            ticket[4]+=precioOtr;
            break;     
    }

    //si no existe, metemos             
    if(document.querySelector(`.nota5Sel${com}`)==null){
        
        //Insertamos HTML y cambiamos Style de las marcas
        etiquetas+=`<img id="b${com}" src="assets/img/pizza/select-ing.png" class="nota5Sel${com} nota5Sel" alt="">`            
        selecciones3.insertAdjacentHTML('beforeend',etiquetas);
        document.querySelector(`.nota5Sel${com}`).style.display="block";
        document.querySelector(`.nota5Sel${com}`).style.top=topP;
        document.querySelector(`.nota5Sel${com}`).style.left=leftP;
    }
    //llamamos a la función ticket para los cálculos
    /* document.querySelector("#preci").remove() */
    calcTicket()
}

function calcTicket(){
       
    let sum = 0
    for (let i = 0; i < ticket.length; i++) {
        sum += ticket[i];
    }
    console.log(ordenPedido);
    console.log(sum);

    let eur = "", cent = "";
    let pos = 0
    if(String(sum).indexOf(".")==-1){
        eur = String(sum);
        cent = "00";
    }else{
        pos = Number(String(sum).indexOf("."));
        console.log("pos"+pos);
        eur = String(sum).substring(0,pos);
        cent = String(sum).substring(pos+1,pos+2)+"0";
    }
    console.log("Total: "+sum+" Euros: "+eur+" Cent: "+cent)
    
    let precioHtml = `<p id="preci">${eur}<span>,${cent}€</span></p>`;
    document.querySelector("#precio").innerHTML = precioHtml; 
    ordenPedido['precio']=sum;

}