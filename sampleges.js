const kendaraan = async (jenisKendaraan) => {
  let brand;
  let tipeKendaraan;
  let harga;

  if (jenisKendaraan == "Mobil") {
    brand = "Toyota";
    tipeKendaraan = "Supra";
    harga = 87000000;

    console.log("Kendaraan : ", jenisKendaraan);
    console.log("Merek Apa : ", brand);
    console.log("tipeKendaraan : ", tipeKendaraan);
    console.log("harga : ", harga);
  } else if (jenisKendaraan == "Mobil-Sport") {
    brand = "Honda";
    tipeKendaraan = "Civic Turbo";
    harga = 10000;

    console.log("Kendaraan : ", jenisKendaraan);
    console.log("Merek Apa : ", brand);
    console.log("tipeKendaraan : ", tipeKendaraan);
    console.log("harga : ", harga);
  } else if (jenisKendaraan == "Motor-Sport") {
    brand = "BMW";
    tipeKendaraan = "BMW S1000RR";
    harga = 1000000000000;

    console.log("Kendaraan : ", jenisKendaraan);
    console.log("Merek Apa : ", brand);
    console.log("tipeKendaraan : ", tipeKendaraan);
    console.log("harga : ", harga);
  } else {
    jenisKendaraan = null;
    brand = null;
    tipeKendaraan = null;
    harga = null;

    console.log("Kendaraan : ", jenisKendaraan);
    console.log("Merek Apa : ", brand);
    console.log("tipeKendaraan : ", tipeKendaraan);
    console.log("harga : ", harga);
  }

  return Promise.resolve(jenisKendaraan, brand, tipeKendaraan, harga);
};

kendaraan("Motor-Sport");
