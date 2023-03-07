import datastore from "../infrastructure/datastore"
import dataseed from "../domain/dataseed";
import services from "./services";
import { Szenario, Konto, Kontoschema } from "../domain/models"

export default class {
  initalisiereApp() {
    // Kontoschemata
    for (let dataKontoschema of dataseed.kontoschemata) {
      datastore.kontoschemata.push(new Kontoschema(dataKontoschema));
    }
    // Default Szenario
    let szenarioDefault = new Szenario({bezeichnung: 'Default', beschreibung: 'Das ist das Default-Szenario.'});
    datastore.szenarien.push(szenarioDefault);
    datastore.objekteAktuell.szenario = szenarioDefault;
    szenarioDefault.seedeKonten(services.datastoremanager, datastore);

    datastore.objekteAktuell.buchungsintervall = 'einzel';
  }
}
