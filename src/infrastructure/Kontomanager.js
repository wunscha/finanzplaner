import dataseed from "../domain/dataseed";

export default class {
  berechneKontostand(konto, datum, datastore) {
    let kontostand = konto.sollInitial - konto.habenInitial;
    for (let buchung of datastore.buchungen) {
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
    datumEnde = new Date(datumEnde) || new Date(dataseed.datumMax);
    if (!datumEnde) {
      throw new Error('Enddatum fehlt.');
    }
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

  berechneKontostandZeitreihe(konto, arrDatum, datastore) {
    let kontostandZeitreihe = arrDatum.map(dat => this.berechneKontostand(konto, dat, datastore));
    return kontostandZeitreihe;
  }
}
