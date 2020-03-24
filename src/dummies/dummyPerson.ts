import IPerson from '../models/IPerson';

export const dummyList: IPerson[] = [
  { name: 'Mario', surname: 'Rossi', role: 'Cassa' },
  { name: 'Carlo', surname: 'Benvenuti', role: 'Bar' },
  { name: 'Elena', surname: 'Sacchi', role: 'Bar' },
  { name: 'Sara', surname: 'Finale', role: 'Pulizie' },
  { name: 'Luigi', surname: 'Verdi', role: 'Management' },
  { name: 'Marco', surname: 'Sassi', role: 'Panini' },
  { name: 'Dario', surname: 'Lampa', role: 'Cassa' },
  { name: 'Maria', surname: 'Pina', role: 'Panini' },
  { name: 'Paolo', surname: 'Bianchi', role: 'Pulizie' },
  { name: 'Ettore', surname: 'Primo', role: 'Management' },
  { name: 'Fabio', surname: 'Conte', role: 'Management' },
  { name: 'Erica', surname: 'Nasi', role: 'Panini' },
  { name: 'Andre', surname: 'Ciurro', role: 'Bar' }
];

export const dummyPerson: IPerson = {
  name: 'Pierluigi',
  surname: 'Panilli',
  role: 'Panini',
  active: true
};
