function cariBarang(idInput, idUl) {
  var input, filter, ul, li, ahref, i, txtValue;
  input = document.getElementById(idInput);
  filter = input.value.toUpperCase();
  ahref = document.getElementById(idUl).querySelectorAll("a");
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

  ahref.forEach((e, n) => {
    e.onclick = (d) => {
      input.value = ""
      console.log($(d.target).text())
      $("#kode_barang").val($(d.target).children("span").text())
      let posisispan = ($(d.target).html()).search(" <span")
      let namaBarang = ($(d.target).html()).substring(0, posisispan)
      console.log(namaBarang)
      $("#nama_barang").val(namaBarang)
      for (i = 0; i < ahref.length; i++) {
        ahref[i].style.display = "none";
      }
      // console.log(d.target.textContent);
    };
  });
}

function ambilDb(perintah) {
  fetch(
    "https://script.google.com/macros/s/AKfycbyRZXiLsIsTh0LzFk9z95tbHGArb3Ht03rLW_GgIv3F1kQmOlxkLjvNVPjcb3hjgh3NAg/exec",
    {
      method: "post",
      body: JSON.stringify({ perintah: perintah }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((dataBarang) => {
      for (let i = 2; i < dataBarang.length; i++) {
        //console.log(dataBarang[i][0]); //kode barang
        //console.log(dataBarang[i][1]); //nama barang

        $("#myUL").append(
          `<a class="list-group-item list-group-item-action" href="#">${dataBarang[i][1]} <span>${dataBarang[i][0]}</span></a>`
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

ambilDb("ambil db")

function simpanMasuk(){
  ambilDb("simpan masuk")
}
