// ========================
// UTILS
// No DOM dependency, no side effects
// ========================
export function getDay(date) {
    const createdAt  = new Date(date);
    const currentDate = new Date();
    const diffMs     = currentDate - createdAt;
    const diffDays   = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears  = Math.floor(diffDays / 365);

    if (diffYears  > 0) return diffYears  + "y";
    if (diffMonths > 0) return diffMonths + "m";
    if (diffDays  === 0) return "Today";
    return diffDays + "d";
}
// ────────────────────────────────
//  Switch Active Button
//  (All-Stars)
// ────────────────────────────────
export function switchActive(e) {
    document.querySelectorAll("[data-searchType]").forEach(el => {
        el.classList.remove("active");
    });
    e.target.classList.add("active");
}
// ────────────────────────────────
//  Focus Inputs
//  Header Input
// ────────────────────────────────
export function focusHeaderInput(headerInput){
    headerInput.focus();
}