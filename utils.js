const URL_MONSTERS = new URL('https://mhw-db.com/monsters');
const URL_WEAPONS = new URL('https://mhw-db.com/weapons');

async function fetcher(url){
    const request = new Request(url)
    const response = await fetch(request);
    const fetched_text = await response.json();
    return fetched_text;
}

async function initializeMonsters(){
    const monsters = await fetcher(URL_MONSTERS);
    populateMonsters(monsters);
}

function populateMonsters(monsters){
    
    const div = document.querySelector("#monsters");
    
    for(const monster of monsters){
        
        if(monster.type == "small"){
            continue;
        }

        const article = document.createElement("article");
        article.createAttribute("class", "monster");

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
            var elements_str = "";
            for(const e of monster.elements){
                const upper_e = e[0].toUpperCase() + e.slice(1);
                if(monster.elements.indexOf(e) < monster.elements.length - 1){
                    elements_str += upper_e + ", ";
                }else{
                    elements_str += upper_e;
                }
            }
            elements.textContent = "Elements: " + elements_str;
        }else{
            elements.textContent = "Elements: None";
        }
        article.appendChild(elements);

        const ailments = document.createElement("p");
        if(monster.ailments.length > 0){
            var ailments_str = "";
            for(const a of monster.ailments){
                if(monster.ailments.indexOf(a) < monster.ailments.length - 1){
                    ailments_str += a.name + ", ";
                }else{
                    ailments_str += a.name;
                }
            }
            ailments.textContent = "Ailments: " + ailments_str;
        }else{
            ailments.textContent = "Ailments: None";
        }
        article.appendChild(ailments);

        const locations = document.createElement("p");
        var loc_str = "";
        for (const l of monster.locations){
            if(monster.locations.indexOf(l) < monster.locations.length - 1){
                loc_str += l.name + ", ";
            }else{
                loc_str += l.name;
            }
        }
        locations.textContent = "Found in: " + loc_str;
        article.appendChild(locations);

        const resistances_list = document.createElement("p");
        var res_str = "";
        for (const r of monster.resistances){
            const upper_r = r.element[0].toUpperCase() + r.element.slice(1);
            if(monster.resistances.indexOf(r) < monster.resistances.length - 1){
                res_str += upper_r + ", ";
            }else{
                res_str += upper_r;
            }
        }
        if(monster.resistances.length > 0){
            resistances_list.textContent = "Strong Against: " + res_str;
        }else{
            resistances_list.textContent = "Strong Against: None";
        }
        article.appendChild(resistances_list);

        const minor_list = document.createElement("p");
        const major_list = document.createElement("p");
        var minor_str = "";
        var major_str = "";
        for (const w of monster.weaknesses){
            const upper_w = w.element[0].toUpperCase() + w.element.slice(1);
            var weak_level = "";
            if(w.stars == 1){
                continue;
            }else if(w.stars == 2){
                weak_level = "minor";
            }else if(w.stars == 3){
                weak_level = "major";
            }
            if(weak_level == "minor"){
                minor_str += w.element[0].toUpperCase() + w.element.slice(1) + ", ";
            }else if(weak_level == "major"){
                major_str += w.element[0].toUpperCase() + w.element.slice(1) + ", ";
            }
        }
        minor_list.textContent = "Minor Weaknesses: " + minor_str.slice(0, -2);
        major_list.textContent = "Major Weaknesses: " + major_str.slice(0, -2);
        article.appendChild(major_list);
        article.appendChild(minor_list);

        div.appendChild(article);

    }
}