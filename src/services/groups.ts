import { Character } from "@/types/character";
import { houseNames } from "@/utils/translations"; // ← import

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
        label: houseNames["Gryffindor"], 
        icon: "/icons/gryffindor.svg",
        color: "#e64a19",
        description: "Coragem, bravura, nervos de aço e cavalheirismo.",
    },
    {
        key: "slytherin",
        label: houseNames["Slytherin"], 
        icon: "/icons/slytherin.svg",
        color: "#25a69a",
        description: "Astúcia, ambição, liderança e desenvoltura.",
    },
    {
        key: "hufflepuff",
        label: houseNames["Hufflepuff"], 
        icon: "/icons/hufflepuff.svg",
        color: "#ecb939",
        description: "Trabalho duro, dedicação, paciência e lealdade.",
    },
    {
        key: "ravenclaw",
        label: houseNames["Ravenclaw"], 
        icon: "/icons/ravenclaw.svg",
        color: "#7986cb",
        description: "Inteligência, criatividade, aprendizado e sabedoria.",
    },
    {
        key: "staff",
        label: "Corpo Docente",
        icon: "/icons/staff.svg",
        color: "#7c3aed",
        description: "Professores, funcionários e guardiões de Hogwarts.",
    },
    {
        key: "unaffiliated",
        label: "Bruxos Sem Casa",
        icon: "/icons/wizards.png",
        color: "#df2323",
        description: "Bruxos e bruxas sem afiliação a nenhuma casa conhecida.",
    },
    {
        key: "muggle",
        label: "Trouxas",
        icon: "/icons/muggle.png",
        color: "#c5c6c9",
        description: "Humanos sem habilidades mágicas.",
    },
    {
        key: "other",
        label: "Outros",
        icon: "/icons/other.svg",
        color: "#6a7483",
        description: "Criaturas, fantasmas e demais seres do universo mágico.",
    },
];

export function resolveGroup(character: Character): string {
    const { house, hogwartsStaff, species, wizard } = character;

    if (hogwartsStaff) return "staff";
    if (species !== "human") return "other";
    if (house) return house.toLowerCase();
    if (wizard === false) return "muggle";
    if (wizard === true) return "unaffiliated";

    return "other";
}

export function groupCharacters(characters: Character[]): Record<string, Character[]> {
    const groups: Record<string, Character[]> = {};

    characters.forEach((c) => {
        const key = resolveGroup(c);
        if (!groups[key]) groups[key] = [];
        groups[key].push(c);
    });

    return groups;
}
