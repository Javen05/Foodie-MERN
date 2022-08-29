function themifyFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    var element = document.body;

    if(localStorage.getItem('cookies') == 'enabled') {

    if(document.body.classList.contains('dark-mode')) { 
        localStorage.setItem('darkMode', 'enabled'); 

    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
   }
}

if(localStorage.getItem('darkMode') == 'enabled') {
    document.body.classList.toggle('dark-mode');
}