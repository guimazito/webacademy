import { Prof, Technology } from "../../types/main";

export function listProfs(profs: Prof[]) {
    return `<ul>${profs.map(p => `<li>${p.nome}</li>`).join("")}</ul>`;
}

export function listTechnologies(technologies: Technology[]) {
    return `<ul>${technologies.filter(t => t.poweredByNodejs === true).map(t => `<li>${t.name} - ${t.type}</li>`).join("")}</ul>`;
}