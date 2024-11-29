export const FormatRupiahFromText = (angka: string): string => {
    let isNegative = false;
    if (angka[0] === "-") {
      isNegative = true;
      angka = angka.substring(1);
    }
    let number_string = angka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  
    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
  
    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    if (isNegative) {
      rupiah = "-" + rupiah;
    }
    return "Rp. " + rupiah ;
  };