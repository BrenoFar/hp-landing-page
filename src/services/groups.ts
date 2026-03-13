import { Character } from "@/types/character";

export type GroupConfig = {
    key: string;
    label: string;
    icon: string;
    color: string;
    description: string;
};

export const GROUPS: GroupConfig[] = [
    {
        key: "gryffindor",
        label: "Gryffindor",
        icon: "/icons/gryffindor.svg",
        color: "#e64a19",
        description: "Coragem, bravura, nervos de aço e cavalheirismo.",
    },
    {
        key: "slytherin",
        label: "Slytherin",
        icon: "/icons/slytherin.svg",
        color: "#25a69a",
        description: "Astúcia, ambição, liderança e desenvoltura.",
    },
    {
        key: "hufflepuff",
        label: "Hufflepuff",
        icon: "/icons/hufflepuff.svg",
        color: "#ecb939",
        description: "Trabalho duro, dedicação, paciência e lealdade.",
    },
    {
        key: "ravenclaw",
        label: "Ravenclaw",
        icon: "/icons/ravenclaw.svg",
        color: "#7986cb",
        description: "Inteligência, criatividade, aprendizado e sabedoria.",
    },
    {
        key: "staff",
        label: "Corpo Docente",
        icon: "/icons/deathly-hallows.svg",
        color: "#7c3aed",
        description: "Professores, funcionários e guardiões de Hogwarts.",
    },
    {
        key: "unaffiliated",
        label: "Bruxos Sem Casa",
        icon: "/icons/deathly-hallows.svg",
        color: "#df2323",
        description: "Bruxos e bruxas sem afiliação a nenhuma casa conhecida.",
    },
    {
        key: "muggle",
        label: "Trouxas",
        icon: "/icons/deathly-hallows.svg",
        color: "#c5c6c9",
        description: "Humanos sem habilidades mágicas.",
    },
    {
        key: "other",
        label: "Outros",
        icon: "/icons/deathly-hallows.svg",
        color: "#6a7483",
        description: "Criaturas, fantasmas e demais seres do universo mágico.",
    },
];

// Resolve em qual grupo o personagem se encaixa
export function resolveGroup(character: Character): string {
    const { house, hogwartsStaff, hogwartsStudent, species, wizard } = character;

    if (hogwartsStaff) return "staff";

    if (house) return house.toLowerCase();

    if (wizard === true) return "unaffiliated";

    if (species === "human" && wizard === false) return "muggle";

    // 5. Todo o resto (criaturas, fantasmas, etc)
    return "other";
}

// Agrupa lista de personagens
export function groupCharacters(
    characters: Character[]
): Record<string, Character[]> {
    const groups: Record<string, Character[]> = {};

    characters.forEach((c) => {
        const key = resolveGroup(c);
        if (!groups[key]) groups[key] = [];
        groups[key].push(c);
    });

    return groups;
}
