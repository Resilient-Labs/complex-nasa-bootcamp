export default function loadElements() {
    const loadableElements = document.querySelectorAll(".loadable");
    loadableElements.forEach(e => e.classList.add("loaded"));
}