// const kendaraan = async (jenisKendaraan) => {
//   let brand;
//   let tipeKendaraan;
//   let harga;

//   if (jenisKendaraan == "Mobil") {
//     brand = "Toyota";
//     tipeKendaraan = "Supra";
//     harga = 87000000;

//     console.log("Kendaraan : ", jenisKendaraan);
//     console.log("Merek Apa : ", brand);
//     console.log("tipeKendaraan : ", tipeKendaraan);
//     console.log("harga : ", harga);
//   } else if (jenisKendaraan == "Mobil-Sport") {
//     brand = "Honda";
//     tipeKendaraan = "Civic Turbo";
//     harga = 10000;

//     console.log("Kendaraan : ", jenisKendaraan);
//     console.log("Merek Apa : ", brand);
//     console.log("tipeKendaraan : ", tipeKendaraan);
//     console.log("harga : ", harga);
//   } else if (jenisKendaraan == "Motor-Sport") {
//     brand = "BMW";
//     tipeKendaraan = "BMW S1000RR";
//     harga = 1000000000000;

//     console.log("Kendaraan : ", jenisKendaraan);
//     console.log("Merek Apa : ", brand);
//     console.log("tipeKendaraan : ", tipeKendaraan);
//     console.log("harga : ", harga);
//   } else {
//     jenisKendaraan = null;
//     brand = null;
//     tipeKendaraan = null;
//     harga = null;

//     console.log("Kendaraan : ", jenisKendaraan);
//     console.log("Merek Apa : ", brand);
//     console.log("tipeKendaraan : ", tipeKendaraan);
//     console.log("harga : ", harga);
//   }

//   return Promise.resolve(jenisKendaraan, brand, tipeKendaraan, harga);
// };

// kendaraan("Motor-Sport");

const fetchData = async (aod) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Memproses ID:", aod);
      console.log(aod);
      resolve(`Data untuk id ${aod}`);
    }, 1000); //1 detik
  });
};

//sequential
const fetchSequentially = async () => {
  console.time("Eksekusi sekuensial");

  const data1 = await fetchData("BMW S1000RR");
  const data2 = await fetchData("BYD Seal");
  const data3 = await fetchData("Toyota Supra");
  const data4 = await fetchData("Cadillac Escalade");

  console.log("Hasil Sekuensial:", [data1, data2, data3, data4]);
  console.timeEnd("Eksekusi sekuensial");
};

//paralel
const fetchParalelly = async () => {
  console.time("Eksekusi paralel");

  const paralel = await Promise.all([
    fetchData("BMW S1000RR"),
    fetchData("BYD Seal"),
    fetchData("Cadillac Escalade"),
    fetchData("Toyota Supra"),
  ]);

  console.log("Hasil Paralel", paralel);
  console.timeEnd("Eksekusi paralel");
};

const runTask = async (runType) => {
  if (runType == "Sequential") {
    await fetchSequentially();
  } else {
    await fetchParalelly();
  }
};

// runTask("Sequential");
runTask("Paralel");
