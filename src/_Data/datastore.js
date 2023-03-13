import { reactive } from "vue"

const datumMin = new Date();
const datumMax = (new Date(datumMin)).setFullYear(2040);

let datastore = {
    datumMin: datumMin,
    datumMax: datumMax,
    szenarien: [],
    buchungsreihen: [],
    buchungen: [],
    konten: [],
    kontoschemata: [],
};

export default reactive(datastore);
