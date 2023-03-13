let iId = 0;
function generiereId() {return iId++;}

export class Kontoschema {
  constructor(data) {
    this.id = generiereId();
    this.bezeichnung = data.bezeichnung;
    this.beschreibung = data.beschreibung;
    this.istExtern = data.istExtern || false;
  }
}

export class Konto {
  constructor(data) {
    this.id = generiereId();
    this.bezeichnung = data.bezeichnung;
    this.beschreibung = data.beschreibung;
    this.istExtern = data.istExtern || false;
    this.sollInitial = data.sollInitial || 0;
    this.habenInitial = data.habenInitial || 0;

    this.kontoschema = data.kontoschema;
    this.szenario = data.szenario;
  }
}

export class Szenario {
  constructor(data) {
    this.id = generiereId();
    this.bezeichnung = data.bezeichnung;
    this.beschreibung = data.beschreibung;
  }

  // Gehört wsl. nicht in Domain-Layer, wegen Abhängigkeiten ==> verschieben
  seedeKonten(datastoremanager, datastore) {
    for (let kontoschema of datastore.kontoschemata) {
      // shallow Copy
      let dataKonto = {
        bezeichnung: kontoschema.bezeichnung && `${kontoschema.bezeichnung}`,
        beschreibung: kontoschema.beschreibung && `${kontoschema.beschreibung}`,
        istExtern: !!kontoschema.istExtern,
        szenario: this,
        kontoschema: kontoschema,
      }
      datastoremanager.create(new Konto(dataKonto), 'konten', datastore);
    }
  }
}

export class Buchungsreihe {
  constructor(data) {
    this.id = generiereId();
    this.bezeichnung = data.bezeichnung;
    this.beschreibung = data.beschreibung;
    this.buchungsintervall = data.buchungsintervall;
    this.betrag = data.betrag;
    this.datumAnfang = data.datumAnfang;
    this.datumEnde = data.datumEnde;

    this.szenario = data.szenario;
    this.sollkonto = data.sollkonto;
    this.habenkonto = data.habenkonto;
  }
}

export class Buchung {
  constructor(data) {
    this.id = generiereId();
    this.datum = data.datum;
    this.betrag = data.betrag;

    this.buchungsreihe = data.buchungsreihe;
    this.szenario = data.szenario;
    this.sollkonto = data.sollkonto;
    this.habenkonto = data.habenkonto;
  }
}
