import { reactive } from "vue";

export default class Datastoremanger {
  constructor(datastore){
    if (!datastore) {throw new Error('Datastore muss angegeben werden!');}
    this.datastore = datastore;
  }

  keys = {
    szenarien: 'szenarien',
    kontoschemata: 'kontoschemata',
    konten: 'konten',
    buchungsreihen: 'buchungsreihen',
    buchungen: 'buchungen'
  }

  create(objectNew, keyModel) {
    if (this.read(objectNew.id, keyModel)) {
      console.warn(`Objekt ${keyModel} mit Id ${objectNew.id} ist bereits vorhanden und wird überschrieben`);
      this.replace(objectNew, keyModel);
    }
    else {
      this.datastore[keyModel].push(objectNew);
    }
    return objectNew;
  }

  read(id, keyModel) {
    let object = this.datastore[keyModel].find(obj => obj.id == id);
    return object;
  }

  update(objectUpdate, keyModel) {
    let object = this.read(objectUpdate.id, keyModel);
    Object.assign(object, objectUpdate);
    return object;
  }

  delete(id, keyModel) {
    let object = this.read(id, keyModel);
    this.datastore[keyModel] = this.datastore[keyModel].filter(obj => obj.id != id);
    return object;
  }

  replace(object, keyModel) {
    this.delete(object.id, keyModel);
    this.create(object, keyModel);
  }

  ladeDatastoreAusDatei(file) {
    let filereader = new FileReader();
    filereader.onload = evt => {
      let fileAlsString = evt.target.result;
      let fileAlsJSON = JSON.parse(fileAlsString);
      this.datastore = reactive(fileAlsJSON);
      console.log("datastore aus Datei geladen");
    };
    filereader.readAsText(file);
  }

  downloadeDatastoreAlsDatei() {
    // siehe: https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
    let datastoreAlsString = JSON.stringify(datastore);
    let aTmp = document.createElement('a');
    aTmp.setAttribute('href', 'data:text/plain;charset=utf8,' + encodeURIComponent(datastoreAlsString));
    aTmp.setAttribute('download', 'datastore.json');
    document.body.appendChild(aTmp);
    aTmp.click();
    document.body.removeChild(aTmp);
  }

}
