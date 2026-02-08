const URL_MONSTERS = new URL('https://mhw-db.com/monsters');
const URL_WEAPONS = new URL('https://mhw-db.com/weapons');

async function fetcher(url){
    const request = new Request(url)
    const response = await fetch(request);
    const fetched_text = await response.json();
    return fetched_text;
}

async function initialize(){
    const monsters = await fetcher(URL_MONSTERS);
    const weapons = await fetcher(URL_WEAPONS);
    populateMonsters(monsters);
}

function populateMonsters(monsters){
    
    const div = document.querySelector("#monsters");
    
    for(const monster of monsters){
        if(monster.type == "small"){
            continue;
        }
        const article = document.createElement("article");

        const name = document.createElement("h2")
        name.textContent = monster.name
        article.appendChild(name);

        if(monster.type == "elder dragon"){
            const elder_dragon = document.createElement("p");
            elder_dragon.textContent = "Elder Dragon";
            article.appendChild(elder_dragon);
        }

        const elements = document.createElement("p");
        if(monster.elements.length > 0){
            elements.textContent = "Elements: " + monster.elements;
        }else{
            elements.textContent = "Elements: None";
        }
        article.appendChild(elements);

        const ailments = document.createElement("p");
        if(monster.ailments.length > 0){
            const ailments_str = "";
            for(const a of monster.ailments){
                if(monster.ailments.indexOf(a) < monster.ailments.length - 1){
                    ailments_str += a + ", ";
                }else{
                    ailments_str += a;
                }
            }
            elements.textContent = "Ailments: " + ailments_str;
        }else{
            ailments.textContent = "Ailments: None";
        }
        article.appendChild(ailments);

        const locations = document.createElement("p");
        locations.textContent = "Found in: " + monster.locations;
        article.appendChild(locations);

        const resistances = document.createElement("p");
        if(monster.resistances != []){
            resistances.textContent = "Strong Against: " + monster.resistances;
        }else{
            resistances.textContent = "Strong Against: None";
        }
        article.appendChild(resistances);

        const weaknesses = document.createElement("p");
        if(monster.weaknesses != []){
            weaknesses.textContent = "Weak to: " + monster.weaknesses;
        }else{
            weaknesses.textContent = "Weak to: None"
        }
        article.appendChild(weaknesses);

        div.appendChild(article);

    }
}