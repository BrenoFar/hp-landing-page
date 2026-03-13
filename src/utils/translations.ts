// src/utils/translations.ts

export const houseNames: Record<string, string> = {
  Gryffindor: "Grifinória",
  Slytherin: "Sonserina",
  Hufflepuff: "Lufa-Lufa",
  Ravenclaw: "Corvinal",
};

export const speciesNames: Record<string, string> = {
  human: "Humano",
  ghost: "Fantasma",
  "house-elf": "Elfo Doméstico",
  giant: "Gigante",
  "half-giant": "Meio-Gigante",
  "half-human": "Meio-Humano",
  centaur: "Centauro",
  werewolf: "Lobisomem",
  goblin: "Goblin",
  acromantula: "Acromântula",
  serpent: "Serpente",
  snake: "Cobra",
  dragon: "Dragão",
  hippogriff: "Hipogrife",
  phoenix: "Fênix",
  poltergeist: "Poltergeist",
  vampire: "Vampiro",
  cat: "Gato",
  dog: "Cachorro",
  owl: "Coruja",
  toad: "Sapo",
  selkie: "Selkie",
  cephalopod: "Cefalópode",
  hat: "Chapéu",
  "three-headed dog": "Cachorro de Três Cabeças",
  "pygmy puff": "Soprocins",
};

export const genderNames: Record<string, string> = {
  male: "Masculino",
  female: "Feminino",
};

export const hairColours: Record<string, string> = {
  black: "Preto",
  blond: "Loiro",
  blonde: "Loiro",
  brown: "Castanho",
  red: "Ruivo",
  white: "Branco",
  grey: "Grisalho",
  silver: "Prateado",
  ginger: "Ruivo-Alaranjado",
  sandy: "Areia",
  dark: "Escuro",
  dull: "Opaco",
  tawny: "Acastanhado",
  green: "Verde",
  purple: "Roxo",
  bald: "Calvo",
};

export const eyeColours: Record<string, string> = {
  green: "Verde",
  blue: "Azul",
  brown: "Castanho",
  black: "Preto",
  grey: "Cinza",
  silver: "Prateado",
  hazel: "Mel",
  amber: "Âmbar",
  orange: "Laranja",
  yellow: "Amarelo",
  yellowish: "Amarelado",
  white: "Branco",
  dark: "Escuro",
  beady: "Miudinho",
  Scarlet: "Escarlate",
  "pale, silvery": "Pálido Prateado",
};

export const ancestryNames: Record<string, string> = {
  "half-blood": "Mestiço",
  "pure-blood": "Sangue Puro",
  muggleborn: "Nascido Trouxa",
  muggle: "Trouxa",
  squib: "Squib",
  "half-veela": "Meio-Veela",
  "quarter-veela": "Quarto-Veela",
};

export const patronusNames: Record<string, string> = {
  stag: "Cervo",
  doe: "Corça",
  otter: "Lontra",
  "Jack Russell terrier": "Jack Russell Terrier",
  hare: "Lebre",
  horse: "Cavalo",
  wolf: "Lobo",
  lynx: "Lince",
  boar: "Javali",
  goat: "Cabra",
  swan: "Cisne",
  weasel: "Doninha",
  "tabby cat": "Gato Malhado",
  "persian cat": "Gato Persa",
  Phoenix: "Fênix",
  "Non-Corporeal": "Incorpóreo",
};

export const wandWoods: Record<string, string> = {
  holly: "Azevinho",
  vine: "Videira",
  willow: "Salgueiro",
  yew: "Teixo",
  elm: "Olmo",
  walnut: "Nogueira",
  cherry: "Cerejeira",
  hawthorn: "Espinheiro",
  hazel: "Aveleira",
  oak: "Carvalho",
  ash: "Freixo",
  alder: "Amieiro",
  birch: "Bétula",
  cedar: "Cedro",
  chestnut: "Castanheiro",
  cypress: "Cipreste",
  fir: "Abeto",
  hornbeam: "Carpino",
  larch: "Lariço",
  mahogany: "Mogno",
};

export const wandCores: Record<string, string> = {
  "phoenix feather": "Pena de Fênix",
  "phoenix tail feather": "Pena da Cauda de Fênix",
  "dragon heartstring": "Corda do Coração de Dragão",
  "unicorn hair": "Cabelo de Unicórnio",
  "unicorn tail hair": "Cabelo da Cauda de Unicórnio",
};

// Helper universal
export function t(map: Record<string, string>, key: string): string {
  if (!key) return "—";
  return map[key] ?? key; // fallback
}
