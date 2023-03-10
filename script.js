let templateBarangMasuk = (namaBarang, kodeBarang) => {
  return `
    <tr>
      <th scope="row"></th>
      <td>${namaBarang}</td>
      <td>${kodeBarang}</td>
      <td><input value=0 onkeyup="hitungTotal(this)" required type="input" class="form-control" placeholder="Jumlah" aria-label="Jumlah"></input></td>
      <td><input required type="text" class="form-control" placeholder="Satuan" aria-label="Satuan"></input></td>
      <td><input value=0 onkeyup="hitungTotal(this)" required type="number" class="form-control" placeholder="Harga" aria-label="Harga"></input></td>
      <td><input type="number" class="form-control" placeholder="Total" aria-label="Total" readonly></input></td>
      <td><span class="btn btn-warning" onclick="hapusBaris(this)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
        </span>
      </td>
    </tr>`;
};

function hitungTotal(e){
  let td = $(e).parents("tr").children()
  let inpjml = $(td).eq(3).children("input").val()
  let inpharga = $(td).eq(5).children("input").val()
  $(td).eq(6).children("input").val(inpjml * inpharga)

  // inp[5].value = hasil 
}

function hapusBaris(e) {
  $(e).parents("tr").remove();
  bikinNoUrut();
}

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
      input.value = "";

      let posisispan = $(d.target).html().search(" <span");
      let namaBarang = $(d.target).html().substring(0, posisispan);

      $("#list_barang_masuk").prepend(
        templateBarangMasuk(namaBarang, $(d.target).children("span").text())
      );

      for (i = 0; i < ahref.length; i++) {
        ahref[i].style.display = "none";
      }

      bikinNoUrut();
    };
  });
}

function bikinNoUrut() {
  let panjangList = $("#list_barang_masuk").children().length;
  for (let i = 0; i < panjangList; i++) {
    $("#list_barang_masuk th")
      .eq(i)
      .html(i + 1);
  }
}

function ambilDb(perintah, isidata) {
  fetch(
    "https://script.google.com/macros/s/AKfycbyRZXiLsIsTh0LzFk9z95tbHGArb3Ht03rLW_GgIv3F1kQmOlxkLjvNVPjcb3hjgh3NAg/exec",
    {
      method: "post",
      body: JSON.stringify({ perintah: perintah, isidata: isidata }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((dataBarang) => {
      for (let i = 2; i < dataBarang.length; i++) {
        $("#myUL").append(
          `<a class="list-group-item list-group-item-action" href="#">${dataBarang[i][1]} <span>${dataBarang[i][0]}</span></a>`
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

ambilDb("ambil db");

$("#kirim_masuk").submit(simpanMasuk)

function simpanMasuk(e) {
  e.preventDefault()
  
  if ($("#tanggal_masuk").val() == "") {
    alert("tanggal masuk tidak boleh kosong");
    $("#tanggal_masuk").focus();
  } else if ($("#list_barang_masuk").children().length == 0) {
    alert("barang masuk tidak boleh kosong");
    $("#myInput").focus();
  } else {
    let tglMasuk = $("#tanggal_masuk").val()
    let kdbr = null, nmbr = null, jml = null, sat = null, hrg = null, ttl = null, arr = {}
    arr["tanggal masuk"] = tglMasuk
    arr["data masuk"] = []

    for(let i = 0;i < $("#list_barang_masuk tr").length;i++){
        kdbr = $("#list_barang_masuk tr").eq(i).children().eq(2).text() //ambil kode barang
        nmbr = $("#list_barang_masuk tr").eq(i).children().eq(1).text() //ambil nama barang
      
        jml = $("#list_barang_masuk tr").eq(i).find("input").eq(0).val() //ambil jumlah
        sat = $("#list_barang_masuk tr").eq(i).find("input").eq(1).val() //ambil satuan
      
        hrg = $("#list_barang_masuk tr").eq(i).find("input").eq(2).val() //ambil harga
        ttl = $("#list_barang_masuk tr").eq(i).find("input").eq(3).val() //ambil total

      arr["data masuk"].push({"kode barang": kdbr, "nama barang": nmbr, "jumlah" : jml, "satuan": sat, "harga": hrg, "total": ttl})
    }
      
    ambilDb("simpan masuk", arr);
  }
}
