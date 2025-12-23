import './style.css'

(()=>{
    'use strict'
    let deck =[]

    const tiposCartas =[ 'C','D','H','S']
    const especiales =[ 'A','J','Q','K']
    let puntosJugador=0,
        puntosComputadora=0
    const DivCartasJugador = document.querySelector('#jugador-cartas')
    const btnPedir=document.querySelector('#btnPedir')
    const DivCartasComputadora=document.querySelector('#computadora-cartas')
    const btnDetener=document.querySelector('#btnDetener')
    const btnNuevoJuego=document.querySelector('#btnNuevo')
    console.log(btnPedir)
    const smljugador=document.querySelectorAll('small')
    console.log(smljugador)
    const crearDeck= () =>{
        for (let i =2 ; i<=10 ; i++)
        {
            for (let tipo of tiposCartas){
                deck.push(i + tipo) 
            }
            
        }

        for (let especial of especiales){
            
            for(let tipo of tiposCartas){
                deck.push(especial + tipo)
            }
        }
        deck =_.shuffle(deck)
        console.log(deck)
    
        return deck;
    }
    crearDeck()

    const pedirCarta =()=>{

            
          let  carta =deck.pop()
            return carta 
    }

    let puntos=0;
    const valorCarta =(carta)=>{
        let valor = carta.substring(0, carta.length-1);
        return( isNaN(valor)?
                (valor==='A')? 11:10
                : valor*1)

    }

    const turnoComputadoraa =(puntosminimos)=>{
        do{
            const carta=pedirCarta()
            puntosComputadora=puntosComputadora+valorCarta(carta)
            console.log(puntosComputadora)
            smljugador[1].innerText=puntosComputadora;
            const generarCarta = document.createElement('img')
            generarCarta.src=`/cartas/${carta}.png`
            generarCarta.classList.add('carta')
            DivCartasComputadora.append(generarCarta)
            if(puntosminimos>21){
                break;
            }
        }while((puntosComputadora<puntosminimos)&& puntosminimos<=21)

            setTimeout(()=>{
                if ((puntosJugador>21)||(puntosJugador<puntosComputadora&& puntosComputadora<=21)){
                        alert('Computadora Gano')
                    }else if (puntosComputadora===puntosminimos){
                        alert('Nadie gana')
                    }else if (puntosJugador<=21 && puntosComputadora>21){
                        alert('ganaste')
                    }
            },100)
        }        
    
        
        

    // Eventos 

    btnPedir.addEventListener('click',()=>{

        const carta=pedirCarta()
        puntosJugador=puntosJugador+valorCarta(carta)
        console.log(puntosJugador)
        smljugador[0].innerText=puntosJugador;
        const generarCarta = document.createElement('img')
        generarCarta.src=`/cartas/${carta}.png`
        generarCarta.classList.add('carta')
        DivCartasJugador.append(generarCarta)
        if(puntosJugador>21){
        
            turnoComputadoraa(puntosJugador);
            
            btnPedir.disabled=true;
        btnDetener.disabled=true;
        
        }else if (puntosJugador===21)
        {
            
            turnoComputadoraa(puntosJugador)
            btnPedir.disabled=true;
        btnDetener.disabled=true;
        }
    })

    btnDetener.addEventListener('click',()=>{
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadoraa(puntosJugador)
        
    })

    btnNuevoJuego.addEventListener('click',()=>{
        DivCartasComputadora.innerHTML=''
        DivCartasJugador.innerHTML=''
        smljugador[0].innerHTML=''
        smljugador[1].innerHTML=''
        deck=[];
        btnDetener.disabled=false
        btnPedir.disabled=false
        puntosComputadora=0
        puntosJugador=0
        crearDeck()
    })
})();


