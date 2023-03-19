import { Szenario, Konto } from "src/_Domain/models";
import { reactive } from "vue"

const datumMin = new Date();
const datumMax = new Date(datumMin);
datumMax.setFullYear(2040);

let datastore = {
    datumMin: datumMin,
    datumMax: datumMax,
    szenarien: [
      new Szenario({bezeichnung: 'Default'}),
    ],
    buchungsreihen: [],
    buchungen: [],
    konten: [
      new Konto({bezeichnung: 'Girokonto', istExtern: false}),
      new Konto({bezeichnung: 'Gehalt Sophie', istExtern: true}),
      new Konto({bezeichnung: 'Gehalt Richhard', istExtern: true}),
      new Konto({bezeichnung: 'Ausgaben', istExtern: true}),
    ],
};

export default reactive(datastore);
