export default class Zeitreihenmanager {
  constructor(data) {
    this.datastoremanager = data.datastoremanager;
  }

  berechneBuchungssaldoFuerZeitraum(konto, datumAnfang, datumEnde) {
    let buchungssaldo = 0;
    for (let buchung of this.datastoremanager.datastore.buchungen) {
      if (
        buchung.datum >= datumAnfang &&
        buchung.datum <= datumEnde
      ) {
        if (buchung.sollkonto.id == konto.id) {buchungssaldo += buchung.betrag;}
        else {buchungssaldo -= buchung.betrag}
      }
    }
  }

  berechneKontostandFuerDatum(konto, datum) {
    let kontostand = konto.sollInitial - konto.habenInitial;
    for (let buchung of this.datastoremanager.datastore.buchungen) {
      if (buchung.datum > datum) { continue }
      if (buchung.szenario.id != konto.szenario.id) { continue }
      if (buchung.sollkonto.id == konto.id) {
        kontostand += buchung.betrag;
      }
      if (buchung.habenkonto.id == konto.id) {
        kontostand -= buchung.betrag;
      }
    }
    return kontostand;
  }

  erstelleArrDatum(datumAnfang, datumEnde, intervall = 'monatlich') {
    let arrDatum = [];
    let datum = new Date(datumAnfang);
    while (datum <= datumEnde) {
      arrDatum.push(new Date(datum));
      switch (intervall) {
        case 'woechentlich':
          datum.setDate(datum.getDate() + 7);
          break;
        case 'monatlich':
          datum.setMonth(datum.getMonth() + 1);
          break;
        case 'jaehrlich':
          datum.setFullYear(datum.getFullYear() + 1);
          break;
        default:
          throw new Error('Kein gültiges Intervall gefunden.');
      }
    }

    return arrDatum;
  }

  erstelleArrKontostand(konto, arrDatum) {
    let kontostandZeitreihe = arrDatum.map(dat => this.berechneKontostand(konto, dat));
    return kontostandZeitreihe;
  }

}
