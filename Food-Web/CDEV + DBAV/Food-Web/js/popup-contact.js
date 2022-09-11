btn_exitPopup = document.getElementById('btn_exitPopup');

btn_exitPopup.addEventListener('click',function() {
    document.querySelector(".contact_popup").style.display = "none"
    document.querySelector(".screen_blur").style.display = "none"
})

function openPopupFunction() {
    document.querySelector(".contact_popup").style.display = "block"
    document.querySelector(".screen_blur").style.display = "block"
}