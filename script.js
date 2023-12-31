let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let index = 0;
let monsterHealth;
let inventory = ["stick"]

const xpText = document.querySelector('#xpText');
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const monsterStats = document.querySelector("#monsterStats");
const monsterHealthText = document.querySelector("#monsterHealthText");
const monsterNameText = document.querySelector("#monsterNameText");
const locations = [
    {
        name : "townSquare",
        "button Text" : ["go to store" , "go to cave" , "Fight Dragon"],
        "button functions" : [goStore , goCave , fightdragon],
        text : "you are in town square"
    },
    {
        name : "store",
        "button Text" : ["Buy Health(gold 10)" , "Buy weapon(gold 30)" , "go to town square"],
        "button functions" : [buyHealth , buyWeapon , townSquare],
        text : "you are in Store"
    },
    {
        name : "cave",
        "button Text" : ["Fight Slime","Fight greatier","go to town square"],
        "button functions" : [fightSlime , fightGreatier , townSquare],
        text : "Be careful . Your are between Dragons . Do you really fight . "
    },
    {
        name : "fight",
        "button Text" : ["Attack","Dodge","Run"],
        "button functions" :[attack , dodge , townSquare],
        text : "Be careful . This dragon is very dangrous."
    },
    {
        name : "Kill monster",
        "button Text" : ["go to town square","go to town square","go to town square"],
        "button functions" :[townSquare, townSquare , easterEgg],
        text : "Congratulations Moster was killed."
    },
    {
        name : "Loss",
        "button Text" : ["Replay?","Replay?","Replay?"],
        "button functions" :[restart, restart , restart],
        text : "It was die."
    },
    {
        name : "easter Egg",
        "button Text" : ["2","8","Go To Town Square"],
        "button functions" :[pickTwo, pickEight , townSquare],
        text : "Wow You Find a hidden secreat of game"
    }
]
const weapons = [
    { name: 'stick', power: 5 },
    { name: 'dagger', power: 30 },
    { name: 'claw hammer', power: 50 },
    { name: 'sword', power: 100 }
  ];
const monsters = [
    {
        name : "slime",
        level : 2,
        power : 15
    },
    {
        name :"greatier",
        level : 8,
        power : 60
    },
    {
        name : "dragon",
        level : 100,
        power : 80
    }
]
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightdragon;


function animateText(target, content) {
    if (index <= content.length) {
        let animatedText = content.slice(0, index);
        target.innerText = animatedText;
        index++;
        setTimeout(() => animateText(target, content), 30);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    townSquare();
});

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button Text"][0];
    button2.innerText = location["button Text"][1];
    button3.innerText = location["button Text"][2];

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    let content = location.text;
    index = 0;  // Reset index for each update
    animateText(text, content);
}

function townSquare(){
    update(locations[0])
}
function goStore(){
    update(locations[1])
}
function goCave(){
    update(locations[2])
}
function buyHealth(){
    if(gold >= 10){
        health += 10;
        gold -= 10 ;
        healthText.innerText = health;
        goldText.innerText = gold;
    }
    else{
        text.innerText = "You Don't have enough money to buy health";
    }
}
function buyWeapon(){
    if(currentWeapon < weapons.length-1){
        if(gold >=30){
            gold -= 30;
            goldText.innerText = gold;
            currentWeapon++;
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon);
            text.innerText = "you have a new Weapon of name " +  newWeapon + ".";
            text.innerText += " Now you have " + inventory;
        }
        else{
            text.innerText = "you don't have enough money to buy weapon";
        }
    }
    else{
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}
function sellWeapon(){
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    }
    else{
        text.innerText = "Don't sell you weapon"
    }
}
function fightSlime(){
    fighting = 0;
    gofight()
}
function fightGreatier(){
    fighting = 1;
    gofight()
}
function fightdragon(){
    fighting = 2;
    gofight()
}
function gofight() {
    update(locations[3]);
    monsterStats.style.display = "block";
    
    monsterHealth = monsters[fighting].power;
    let monsterName = monsters[fighting].name;

    monsterHealthText.innerText = monsterHealth;
    monsterNameText.innerText = monsterName;
}   

function attack(){
    text.innerText = monsters[fighting].name + " attacks on you. You are fighting with your " + weapons[currentWeapon].name;
    health -= monsters[fighting].level;
    healthText.innerText = health;
    if(isMonsterhit()){
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
        monsterHealthText.innerText = monsterHealth;
    }
    else{
        text.innerText = "Oops ! Your weapon breaks . "
        let breakWeapon  = inventory.pop;
        text.innerText = "mow you have "+ inventory;
    }
    if (health <= 0) {
        loss();
    } else if (monsterHealth <= 0) {
        defeatMonster();
    }
}
function isMonsterhit(){
    return Math.random() < 0.2 || health < 20;
}
function dodge(){}
function defeatMonster(){
    xp += monsters[fighting].level
    gold += Math.floor(monsters[fighting].level * 6.7)
    xpText.innerText = xp;
    goldText.innerText = gold;
    update(locations[4])
}
function loss(){
    update(locations[5])
}
function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    inventory = ["stick"]
    xpText.innerText = xp;
    goldText.innerText = gold;
    healthText.innerText = health;

    townSquare()
}
function easterEgg(){
    update(locations[6])
}
function pickTwo(){
    pick(2);
}
function pickEight(){
    pick(8);
}
function pick(guess){
    let numbers = []
    while(numbers.length < 10){
        numbers.push(Math.floor(Math.random() * 10) + 1)
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for(let i = 0 ; i < 10; i++){
        text.innerText += numbers[i]+ "\n"
    }
    if(numbers.indexOf(guess) !== -1){
        text.innerText += "Congratulations you are right and gain 20 gold and 50 health";
        health += 50;
        gold += 20;
        healthText.innerText = health;
        goldText.innerText = gold;
    }
    else{
        text.innerText += "oh no ! you are wrong and loose 10 health";
        health -= 10;
        healthText.innerText = health;
    }
}