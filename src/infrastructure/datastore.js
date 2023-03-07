import { reactive } from "vue"

let datastore = {
    objekteAktuell: {
      szenario: undefined,
      buchungsintervall: undefined,
    },
    szenarien: [],
    buchungsreihen: [],
    buchungen: [],
    konten: [],
    kontoschemata: [],
};

export default reactive(datastore);
