function cariBarang(idInput, idUl) {
  var input, filter, ul, li, ahref, i, txtValue;
  input = document.getElementById(idInput);
  filter = input.value.toUpperCase();
  ul = document.getElementById(idUl);
  ahref = ul.getElementsByTagName("a");
  for (i = 0; i < ahref.length; i++) {
    // a = ;
    txtValue = ahref[i].textContent || ahref[i].innerText;
    // console.log(input.value)
    
    ahref[i].style.display = "none";
    
    if (txtValue.toUpperCase().search(filter) > -1) {
      // console.log(txtValue)
      ahref[i].style.display = "block";
    } 
    
    if (input.value == "") {
      ahref[i].style.display = "none";
    }
  }
  
  ahref.map.onclick = (e)=>{
    console.log(e.target)
  }
}
