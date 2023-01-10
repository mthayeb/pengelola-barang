function cariBarang(idInput, idUl) {
  var input, filter, ul, li, ahref, i, txtValue;
  input = document.getElementById(idInput);
  filter = input.value.toUpperCase();
  ul = document.getElementById(idUl);
  ahref = ul.getElementsByTagName("a");
  for (i = 0; i < ahref.length; i++) {
    // a = ;
    txtValue = ahref[i].textContent || ahref[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      ahref[i].style.display = "block";
    } 
    if (input.value == "") {
      ahref[i].style.display = "none";
    }
  }
}
