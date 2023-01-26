let horizontalUnderline = document.getElementById("horizontal-underline"); 
let verticalUnderline = document.getElementById("vertical-underline")
let horizontalMenus = document.querySelectorAll("nav:first-child a");
let verticalMenus = document.querySelectorAll("nav:nth-child(2) a");

horizontalMenus.forEach((menu) => {
    menu.addEventListener("click", (e) => horizontalIndicator(e));
});

function horizontalIndicator(e) {
    horizontalUnderline.style.left = e.currentTarget.offsetLeft + "px";
    horizontalUnderline.style.width = e.currentTarget.offsetWidth + "px";
    horizontalUnderline.style.top =
        e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

verticalMenus.forEach((menu) => {
    menu.addEventListener("click", (e) => verticalIndicator(e));
});
function verticalIndicator(e) {
    verticalUnderline.style.left = e.currentTarget.offsetLeft + "px";
    verticalUnderline.style.width = e.currentTarget.offsetWidth + "px";
    verticalUnderline.style.top =
        e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}