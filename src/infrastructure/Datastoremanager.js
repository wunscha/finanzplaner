export default class Datastoremanger {
  constructor(datastore, opt = {}){
    // if (!datastore) {throw new Error('Datencontainer muss angegeben werden!');}
    // this.datastore = datastore;
  }

  create(objectNew, nameModel, datastore) {
    if (this.read(objectNew.id, nameModel, datastore)) {
      console.warn(`Objekt ${nameModel} mit Id ${objectNew.id} ist bereits vorhanden und wird überschrieben`);
      this.replace(objectNew, nameModel, datastore);
    }
    else {
      // this.datastore[nameModel].push(objectNew);
      datastore[nameModel].push(objectNew);
    }
    return objectNew;
  }

  read(id, nameModel, datastore) {
    // let object = this.datastore[nameModel].find(obj => obj.id == id);
    let object = datastore[nameModel].find(obj => obj.id == id);
    return object;
  }

  update(objectUpdate, nameModel, datastore) {
    let object = this.read(objectUpdate.id, nameModel, datastore);
    Object.assign(object, objectUpdate);
    return object;
  }

  delete(id, nameModel, datastore) {
    let object = this.read(id, nameModel, datastore);
    datastore[nameModel] = datastore[nameModel].filter(obj => obj.id != id);
    return object;
  }

  replace(object, nameModel, datastore) {
    this.delete(object.id, nameModel, datastore);
    this.create(object, nameModel, datastore);
  }

  replaceAll(arrObjects, nameModel, datastore) {
    datastore[nameModel] = arrObjects;
  }
}
