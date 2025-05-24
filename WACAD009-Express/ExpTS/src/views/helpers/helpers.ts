import { Prof } from "../../types/main";

export function listProfs(profs: Prof[]) {
    return `<ul>${profs.map(p => `<li>${p.nome}</li>`).join("")}</ul>`;
}