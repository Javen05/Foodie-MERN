btn_closeNav = document.getElementById('btn_closeNav');
btn_navIcon = document.getElementById('btn_navIcon');

btn_closeNav.addEventListener('click',function() {
    document.querySelector(".Navigation").style.display = "none"
    btn_navIcon.style.display = "block"
})

function expandNavigationFunction() {
    document.querySelector(".Navigation").style.display = "flex"
    btn_navIcon.style.display = "none"
}