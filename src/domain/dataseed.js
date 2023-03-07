export default {
    datumMax: (new Date(Date.now())).setFullYear(2050),
    datumMin: (new Date(Date.now())).setFullYear(2020),
    buchungsintervalle: {
        woechentlich: 'woechentlich',
        monatlich: 'monatlich',
        jaehrlich: 'jaehrlich',
        einzel: 'einzel',
    },
    kontoschemata: [
        {bezeichnung: 'giro', istExtern: false},
        {bezeichnung: 'hauskredit', istExtern: true},
        {bezeichnung: 'ausgaben', istExtern: true},
        {bezeichnung: 'einnahmen', istExtern: true},
    ]
}
