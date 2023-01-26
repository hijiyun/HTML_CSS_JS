let horizontalUnderline = document.getElementById("horizontal-underline"); 
let horizontalMenus = document.getElementById("nav:first-child a");



horizontalMenus.forEach((menu) => {
    menu.addEventListener("click", (e) => horizontalIndicator(e));
});

function horizontalIndicator(e) {
    horizontalUnderline.style.left = e.currentTarget.offsetLeft + "px";
    horizontalUnderline.style.width = e.currentTarget.offsetWidth + "px";
    horizontalUnderline.style.top =
        e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}