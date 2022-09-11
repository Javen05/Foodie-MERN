cookie_box =document.getElementById('cookie_box');
ignoreCookies = document.getElementById('btn_ignoreCookies');
btn_agreeCookies = document.getElementById('btn_agreeCookies');

if(localStorage.getItem('cookies') == 'enabled') {
    cookie_box.style.display = "none";
} else {
    cookie_box.style.display = "flex";
}

btn_agreeCookies.addEventListener('click',function() {
    cookie_box.style.display = "none";
    localStorage.setItem('cookies', 'enabled');
})

ignoreCookies.addEventListener('click',function() {
    cookie_box.style.display = "none";
})