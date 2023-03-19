let iId = 0;
function generiereId() {return iId++;}

export class Konto {
  constructor(data) {
    this.id = generiereId();
    this.bezeichnung = data.bezeichnung;
    this.beschreibung = data.beschreibung;
    this.istExtern = data.istExtern || false;
    this.kontostandInitial = data.kontostandInitial || 0;
  }
}

export class Szenario {
  constructor(data) {
    this.id = generiereId();
    this.bezeichnung = data.bezeichnung;
    this.beschreibung = data.beschreibung;
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
    this.quellkonto = data.quellkonto;
    this.zielkonto = data.zielkonto;
  }
}

export const ENUM_BUCHUNGSINTERVALLE = {
  woechentlich: 'woechentlich',
  monatlich: 'monatlich',
  jaehrlich: 'jaehrlich',
  einzel: 'einzel',
}
