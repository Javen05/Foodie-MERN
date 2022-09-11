btn_accTab = document.getElementById('btn_accTab');
account_tab = document.getElementById('account_tab');
tabExpanded = false;

btn_accTab.addEventListener('click',function() {

    if(tabExpanded == false) {
        account_tab.style.display = "flex";
        tabExpanded = true;

    } else {
    account_tab.style.display = "none";
    tabExpanded = false; }
})