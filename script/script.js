const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');
const type = document.querySelector(".type");
const pokemonType1 = document.querySelector('.pokemon-type-1');
const pokemonType2 = document.querySelector('.pokemon-type-2');
const form = document.querySelector('.form');
const input = document.querySelector('.input-search');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonNumber.innerHTML = 'WAIT';
    pokemonName.innerHTML = 'Loading...';
    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = `#${data.id}`;
        type.style.left = '18%';
        pokemonType1.style.display = 'block';
        pokemonImage.style.scale = 1;
        pokemonImage.style.transform = "translate(0,0)";
        searchPokemon = data.id;
        pokemonType1.innerHTML = data['types']['0']['type']['name'];
        try{
            pokemonType2.style.display = 'block';
            pokemonType2.innerHTML = data['types']['1']['type']['name'];
        } catch (e){
            type.style.left = '33%';
            pokemonType2.style.display = 'none';
            console.log(e);
        }
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        if(pokemonImage.src != data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']){
            pokemonImage.src = data['sprites']['front_default'];
            pokemonImage.style.scale = 1.4;
        }
        if(data.id == 602){
            pokemonImage.style.scale = 0.8;
            pokemonImage.style.transform = "translate(-50%,0)";
        }
        input.value = '';
    } else {
        pokemonType1.style.display = 'none';
        pokemonType2.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = 'ERROR';
        pokemonImage.src = "./assets/warning.png"
        input.value = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

function prevPokemon(){
    if((searchPokemon > 1 && searchPokemon < 906) || (searchPokemon > 10000) ){
        if(searchPokemon == 10001){
            searchPokemon = 906;
        }
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
}

function nextPokemon(){
    if(searchPokemon < 906 || (searchPokemon > 10000 && searchPokemon < 10249)){
        if(searchPokemon == 905){
            searchPokemon = 10000;
        }
        searchPokemon += 1;
        renderPokemon(searchPokemon);;
    }
}

renderPokemon(searchPokemon);