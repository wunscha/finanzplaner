import dataseed from "src/domain/dataseed";
import { Buchung } from "src/domain/models";

export default class {
  erzeugeBuchungenFuerBuchungsreihe(buchungsreihe) {
    let data = {
      idSzenario: buchungsreihe.idSzenario,
      betrag: parseInt(buchungsreihe.betrag),
      sollkonto: buchungsreihe.sollkonto,
      habenkonto: buchungsreihe.habenkonto,
      szenario: buchungsreihe.szenario,
      buchungsreihe: buchungsreihe,
    };

    let arrBuchungen = [];
    let datumEnde = buchungsreihe.datumEnde || dataseed.datumMax;
    if (!datumEnde) {
      throw new Error('Es konnte kein Enddatum für die Buchungsreihe ermittelt werden.');
    }

    // Datum muss immer neu instanziiert werden, sonst wird nur Referenza auf datumAnfang von Buchungsreihe weitergegeben
    let datum = new Date(buchungsreihe.datumAnfang);
    while (datum < datumEnde) {
      data.datum = new Date(datum);
      arrBuchungen.push(new Buchung(data));
      switch (buchungsreihe.buchungsintervall) {
        case 'einzel':
          return arrBuchungen;
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
          throw new Error('Kein gültiges Buchungsintervall für die Buchrungsreihe gefunden.');
      }
    }

    return arrBuchungen;
  };

  aktualisiereBuchungen(datastore, datastoremanager) {
    let arrBuchungen = [];
    for (let br of datastore.buchungsreihen) {
      let arrBuchungenFuerBuchungsreihe = this.erzeugeBuchungenFuerBuchungsreihe(br);
      arrBuchungen.push(...arrBuchungenFuerBuchungsreihe);
    }
    datastoremanager.replaceAll(arrBuchungen, 'buchungen', datastore);
  }
}
