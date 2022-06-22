const clickHeros = Vue.createApp({
    data(){
        return{
            id: "",
            comics: "",
            events: ""
        }
    },
    methods:{
        async informacionHeroe(index){
            const respuesta = await fetch("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c656a2c85d33e82cb20239cef1319279&hash=cfa6f4f7ac057a5e6bf852156d66ab25");
            const {data} = await respuesta.json();
            
            heros = data.results;
            
            console.log(heros[index])
            this.id = "id: "+heros[index].id+" ";
            this.comics = " numbres of comics: "+heros[index].comics.available;
            this.events = "number of events: "+heros[index].events.available;

        }
    }
})

function getID() {

    document.querySelectorAll(".clickHero").forEach(el => {
        el.addEventListener("click", e => {
        const id = e.target.getAttribute("id");
        console.log("Se ha clickeado el id "+ id);
        
        });
    });

}


const fetchMarvel = ()=>{
    const url = "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c656a2c85d33e82cb20239cef1319279&hash=cfa6f4f7ac057a5e6bf852156d66ab25";
    fetch(url).then((res) =>{
        return res.json()

    }).then((data) => {
        let hero = data.data.results
        let name;
        let img;
        let contenidos = "";
        console.log(hero)
        
        

        for(let i = 0; i < data.data.results.length; i++){
            imgNotAvailable = "";
            console.log(hero[i].name+"\t"+hero[i].id)
            name = hero[i].name
            img = hero[i].thumbnail.path

            /*
            for(let j = 0; j < 19; j++){
                imgNotAvailable += img[img.length-19+j]
                
            }

            if (imgNotAvailable == "image_not_available")
                img = "./marvel.png";
            else*/
                img += "."+hero[i].thumbnail.extension

            contenidos += `
            <div class="contenidoHero rows centrarContenido">
                <div id="${i}DivImg" class="rows centrarContenido">   </div>
                
                <div class="clickHero">
                    <button v-on:click="informacionHeroe(${i})" class="noStyle clickHero nameHero" id="${i}">${name}</button>
                </div><br><br>
                <h1 class="nameHero"> {{id}} </h1><br>
                <h1 class="nameHero"> {{comics}} </h1><br>
                <h1 class="nameHero"> {{events}} </h1>
                <br><br><br>
            </div>
            `
           
           
            
        }
        
        
        let contenido = document.getElementById("contenido")
        contenido.innerHTML = contenidos
        clickHeros.mount("#contenido")

        for(let i = 0; i<data.data.results.length;i++){
            img = hero[i].thumbnail.path
            img += "."+hero[i].thumbnail.extension

            contenidos = `<img src="${img}" alt="heroe" width="80%" height="80%" class="redondear">`
            
            contenido = document.getElementById(`${i}DivImg`)
            contenido.innerHTML = contenidos
        }
        
        getID()
        
    })
}

fetchMarvel()

