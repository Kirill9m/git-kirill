let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["палка"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'палка', power: 5 },
  { name: 'кинжал', power: 30 },
  { name: 'молоток', power: 50 },
  { name: 'меч', power: 100 }
];
const monsters = [
  {
    name: "слизень",
    level: 2,
    health: 15
  },
  {
    name: "зубастое чудовище",
    level: 8,
    health: 60
  },
  {
    name: "дракон",
    level: 20,
    health: 300
  }
];
const locations = [
  {
    name: "площадь города",
    "button text": ["Перейти в магазин", "Перейти в пещеру", "Сразиться с драконом"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Вы находитесь на площади города. Вы видите табличку, на которой написано \"Магазин\"."
  },
  {
    name: "магазин",
    "button text": ["Купить 10 здоровья (10 золота)", "Купить оружие (30 золота)", "Перейти на площадь города"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Вы вошли в магазин."
  },
  {
    name: "пещера",
    "button text": ["Сразиться со слизнем", "Сразиться с зубастым чудовищем", "Перейти на площадь города"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Вы вошли в пещеру. Вы видите несколько монстров."
  },
  {
    name: "битва",
    "button text": ["Атаковать", "Уклониться", "Убежать"],
    "button functions": [attack, dodge, goTown],
    text: "Вы сражаетесь с монстром."
  },
  {
    name: "победа над монстром",
    "button text": ["Перейти на площадь города", "Перейти на площадь города", "Перейти на площадь города"],
    "button functions": [goTown, goTown, goTown],
    text: 'Монстр кричит "Арг!" и умирает. Вы получаете очки опыта и находите золото.'
  },
  {
    name: "поражение",
    "button text": ["ПЕРЕИГРАТЬ?", "ПЕРЕИГРАТЬ?", "ПЕРЕИГРАТЬ?"],
    "button functions": [restart, restart, restart],
    text: "Вы погибли. &#x2620;"
  },
  {
    name: "победа",
    "button text": ["Перейти на площадь города", "Перейти на площадь города", "Перейти на площадь города"],
    "button functions": [goTown, goTown, goTown],
    text: 'Поздравляем! Вы победили дракона и спасли город!'
  }
];

// инициализация кнопок
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "У вас недостаточно золота для покупки здоровья.";
  }
}

function buyWeapon() {
  if (currentWeaponIndex < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeaponIndex++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeaponIndex].name;
      text.innerText = "Теперь у вас " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " В вашем инвентаре: " + inventory;
    } else {
      text.innerText = "У вас недостаточно золота для покупки оружия.";
    }
  } else {
    text.innerText = "У вас уже самое мощное оружие!";
    button2.innerText = "Продать оружие за 15 золота";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Вы продали " + currentWeapon + ".";
    text.innerText += " В вашем инвентаре: " + inventory;
  } else {
    text.innerText = "Не продавайте ваше единственное оружие!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  if (health <= 0) {
    lose();
    return;
  }
  
  text.innerText = "Монстр " + monsters[fighting].name + " атакует.";
  text.innerText += " Вы атаковали его своим " + weapons[currentWeaponIndex].name + ".";
  health -= monsters[fighting].level;
  monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
}

function dodge() {
  text.innerText = "Вы уклонились от атаки " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["палка"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
