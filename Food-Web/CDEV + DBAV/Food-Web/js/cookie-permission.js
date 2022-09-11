btn_agreeCookies = document.getElementById('btn_agreeCookies');
btn_clearCookies = document.getElementById('btn_clearCookies');

btn_agreeCookies.addEventListener('click',function() {
    btn_agreeCookies.style.display = "none"
    localStorage.setItem('cookies', 'enabled');
    setTimeout(window.location.reload(), 1000);
})

if(localStorage.getItem('cookies') == 'enabled') {
    btn_agreeCookies.style.display = "none"
    btn_clearCookies.style.display = "inline-block"
} else {
    btn_agreeCookies.style.display = "inline-block"
    btn_clearCookies.style.display = "none"
}

function clearCookie() {
    localStorage.clear();
    setTimeout(window.location.reload(), 1000);
}