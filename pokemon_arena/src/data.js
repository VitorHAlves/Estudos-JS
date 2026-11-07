
export const POKEMON = [
  {id:1,name:'Bulbasaur',type:'Planta',emoji:'🌿',hp:82,attack:13,defense:5,moves:[{name:'Chicote de Vinha',type:'Planta',power:16},{name:'Investida',type:'Normal',power:12}]},
  {id:4,name:'Charmander',type:'Fogo',emoji:'🔥',hp:76,attack:16,defense:3,moves:[{name:'Brasa',type:'Fogo',power:17},{name:'Arranhão',type:'Normal',power:12}]},
  {id:7,name:'Squirtle',type:'Água',emoji:'💧',hp:88,attack:12,defense:6,moves:[{name:'Jato de Água',type:'Água',power:16},{name:'Investida',type:'Normal',power:12}]},
  {id:25,name:'Pikachu',type:'Elétrico',emoji:'⚡',hp:75,attack:17,defense:3,moves:[{name:'Choque do Trovão',type:'Elétrico',power:17},{name:'Ataque Rápido',type:'Normal',power:12}]},
  {id:10,name:'Caterpie',type:'Inseto',emoji:'🐛',hp:64,attack:10,defense:3,moves:[{name:'Picada',type:'Inseto',power:12},{name:'Investida',type:'Normal',power:10}]},
  {id:16,name:'Pidgey',type:'Voador',emoji:'🪽',hp:72,attack:12,defense:4,moves:[{name:'Rajada de Vento',type:'Voador',power:14},{name:'Investida',type:'Normal',power:11}]},
  {id:43,name:'Oddish',type:'Planta',emoji:'🍃',hp:78,attack:13,defense:4,moves:[{name:'Folha Navalha',type:'Planta',power:16},{name:'Investida',type:'Normal',power:11}]},
  {id:37,name:'Vulpix',type:'Fogo',emoji:'🦊',hp:73,attack:15,defense:4,moves:[{name:'Brasa',type:'Fogo',power:16},{name:'Ataque Rápido',type:'Normal',power:11}]},
  {id:60,name:'Poliwag',type:'Água',emoji:'💦',hp:76,attack:13,defense:4,moves:[{name:'Bolhas',type:'Água',power:16},{name:'Investida',type:'Normal',power:11}]},
  {id:74,name:'Geodude',type:'Pedra',emoji:'🪨',hp:86,attack:14,defense:7,moves:[{name:'Arremesso de Pedra',type:'Pedra',power:16},{name:'Investida',type:'Normal',power:11}]},
  {id:133,name:'Eevee',type:'Normal',emoji:'⭐',hp:78,attack:14,defense:4,moves:[{name:'Ataque Rápido',type:'Normal',power:15},{name:'Investida',type:'Normal',power:12}]},
  {id:92,name:'Gastly',type:'Fantasma',emoji:'👻',hp:68,attack:17,defense:3,moves:[{name:'Assombração',type:'Fantasma',power:17},{name:'Lambida',type:'Fantasma',power:12}]},
  {id:63,name:'Abra',type:'Psíquico',emoji:'🔮',hp:65,attack:17,defense:3,moves:[{name:'Confusão',type:'Psíquico',power:16},{name:'Pancada',type:'Normal',power:10}]},
  {id:52,name:'Meowth',type:'Normal',emoji:'🐈',hp:72,attack:14,defense:3,moves:[{name:'Arranhão',type:'Normal',power:15},{name:'Ataque Rápido',type:'Normal',power:11}]},
];

export const STARTERS = [1,4,7,25];

export const TYPE_COLORS = {
  'Planta':'#56c99b',
  'Fogo':'#ff8869',
  'Água':'#64b8f7',
  'Elétrico':'#f9cf55',
  'Normal':'#b2b8c6',
  'Inseto':'#97c86e',
  'Voador':'#a7a9ef',
  'Pedra':'#c6a27c',
  'Fantasma':'#a38de5',
  'Psíquico':'#f38bb4'
};

const GOOD = {
  'Fogo':['Planta','Inseto'],
  'Água':['Fogo','Pedra'],
  'Planta':['Água','Pedra'],
  'Elétrico':['Água','Voador'],
  'Pedra':['Fogo','Voador','Inseto'],
  'Inseto':['Planta','Psíquico'],
  'Fantasma':['Fantasma','Psíquico'],
  'Psíquico':['Fantasma']
};

const WEAK = {
  'Fogo':['Água','Pedra','Fogo'],
  'Água':['Planta','Água'],
  'Planta':['Fogo','Planta','Inseto','Voador'],
  'Elétrico':['Planta','Elétrico'],
  'Inseto':['Fogo','Pedra'],
  'Pedra':['Água','Planta'],
  'Voador':['Elétrico','Pedra']
};

export function effectiveness(attacker,defender){
  if(GOOD[attacker]?.includes(defender)) return 1.5;
  if(WEAK[attacker]?.includes(defender)) return .7;
  return 1;
}

export function sprite(id){
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function makePokemon(template,level=5){
  return {
    ...template,
    uid:`${template.id}-${Date.now()}-${Math.random()}`,
    level,
    maxHp:template.hp+(level-5)*6,
    hp:template.hp+(level-5)*6,
    xp:0
  };
}

export function randomEnemy(round,exclude=[]){
  const pool=POKEMON.filter(
    p=>!exclude.includes(p.id)&&!STARTERS.includes(p.id)
  );
  const chosen=pool[Math.floor(Math.random()*pool.length)];
  return makePokemon(chosen,Math.min(14,3+Math.floor(round/2)));
}
