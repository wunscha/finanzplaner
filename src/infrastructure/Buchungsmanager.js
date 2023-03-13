import dataseed from "src/_Domain/dataseed";
import { Buchung } from "src/_Domain/models";

export default class Buchungsmanager {
  constructor(data) {
    this.datastoremanager = data.datastoremanager;
  }

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
      this.datastoremanager.create(new Buchung(data), this.datastoremanager.keys.buchungen);
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

  loescheBuchungenFuerBuchungsreihe(buchungsreihe) {
    this.datastoremanager.datastore.buchungen = this.datastoremanager.datastore.buchungen.filter(bu => {
      bu.buchungsreihe.id != buchungsreihe.id
    });
  };

}
