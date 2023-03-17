import datastore from "src/_Data/datastore";

class Zeitreihenmanager {
  constructor(datastore) {
    this.datastore = datastore;
  }

  ermittleDatumAnfang(datum) {
    let datumAnfang =
      new Date(datum) < this.datastore.datumMin ||
      new Date(datum) == 'Invalid Date' ||
      datum == '' ||
      datum == null ||
      datum == undefined ?
      this.datastore.datumMin :
      datum;
    return datumAnfang;
  }

  ermittleDatumEnde(datum) {
    let datumEnde =
      new Date(datum) > this.datastore.datumMax ||
      new Date(datum) == 'Invalid Date' ||
      datum == '' ||
      datum == null ||
      datum == undefined ?
      this.datastore.datumMin :
      datum;
    return datumEnde;
  }
}

// TODO: Initialisierung in "services" auslagern?
export default new Zeitreihenmanager(datastore);
