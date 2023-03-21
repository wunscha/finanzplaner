import { reactive } from "vue";
import datastore from "src/_Data/datastore";

class Datastoremanger {
  constructor(datastore){
    if (!datastore) {throw new Error('Datastore muss angegeben werden!');}
    this.datastore = datastore;
  }

  keys = {
    szenarien: 'szenarien',
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

  ueberschreibeDatastore(datastoreNeu) {
    // Für Laden Datastore aus Datei
    Object.assign(this.datastore, datastoreNeu);
  }

}

export default new Datastoremanger(datastore);
