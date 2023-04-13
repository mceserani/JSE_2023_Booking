import inquirer from "inquirer";

const events = [];

function main() {
  inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Cosa vuoi fare?',
        choices: [
          'Aggiungi evento',
          'Visualizza eventi',
          'Prenota biglietti',
          'Cancella prenotazione',
          'Esci',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'Aggiungi evento':
          addEvent();
          break;
        case 'Visualizza eventi':
          viewEvents();
          break;
        case 'Prenota biglietti':
          bookTickets();
          break;
        case 'Cancella prenotazione':
          cancelBooking();
          break;
        case 'Esci':
          process.exit();
      }
    });
}

function addEvent() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'titolo',
            message: 'Inserisci il titolo dell\'evento',
            validate: (value) => {
                if (value.length > 0) {
                    return true;
                }
                return 'Inserisci un titolo';
            }
        },
        {
            type: 'input',
            name: 'datetime',
            message: 'Inserisci la data e l\'ora dell\'evento',
            validate: (value) => {
                if (value.length > 0 && value.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4} [0-9]{2}:[0-9]{2}$/)) {
                    return true;
                }
                return 'Inserisci una data e un\'ora nel formato gg/mm/aaaa hh:mm';
            }
        },
        {
            type: 'input',
            name: 'luogo',
            message: 'Inserisci il luogo dell\'evento',
            validate: (value) => {
                if (value.length > 0) {
                    return true;
                }
                return 'Inserisci un luogo';
            }
        },
        {
            type: 'input',
            name: 'posti',
            message: 'Inserisci il numero di posti disponibili',
            validate: (value) => {
                if (value.length > 0 && value.match(/^[0-9]+$/)) {
                    return true;
                }
                return 'Inserisci un numero di posti valido';
            }
        }
    ]).then((event) => {
        event.prenotati = 0;
        events.push(event);
        console.log('Evento aggiunto');
        main();
    });
}

function viewEvents() {
    for (let event of events){
        console.log(`Titolo: ${event.titolo}`);
        console.log(`Data e ora: ${event.datetime}`);
        console.log(`Luogo: ${event.luogo}`);
        console.log(`Posti: ${event.posti}`);
        console.log(`Posti prenotati: ${event.prenotati}`);
    }
    main();
}

function bookTickets() {
    let choices = events.map((event, index) => {
        let disponibili = Number(event.posti) - Number(event.prenotati);
        return `${index + 1}: ${event.titolo} - ${disponibili}`;
    });
    inquirer.prompt([
        {
            type: 'list',
            name: 'eventToBook',
            message: 'Scegli l\'evento per cui vuoi prenotare',
            choices: choices
        },
        {
            type: 'input',
            name: 'howmany',
            message: 'Quanti posti vuoi prenotare',
            validate: (value) => {
                if (value.length > 0 && value.match(/^[0-9]+$/))
                    return true;
                else
                    return 'Inserisci un numero di posti valido'
            }
        }
    ]).then((answers) => {
        let index = Number(answers.eventToBook.split(':')[0]) - 1;
        if (Number(events[index].posti) - events[index].prenotati >= Number(answers.howmany)){
            events[index].prenotati += Number(answers.howmany);
            console.log("Prenotazione effettuata!");
        }else
            console.log("Errore!");
        main(); 
    });
}

function cancelBooking() {
    let choices = events.map((event, index) => {
        return `${index + 1}: ${event.titolo} - ${Number(event.prenotati)}`;
    });
    inquirer.prompt([
        {
            type: 'list',
            name: 'eventToBook',
            message: 'Scegli l\'evento per cui vuoi disdire',
            choices: choices
        },
        {
            type: 'input',
            name: 'howmany',
            message: 'Quanti posti vuoi disdire',
            validate: (value) => {
                if (value.length > 0 && value.match(/^[0-9]+$/))
                    return true;
                else
                    return 'Inserisci un numero di posti valido'
            }
        }
    ]).then((answers) => {
        let index = Number(answers.eventToBook.split(':')[0]) - 1;
        if (Number(events[index].prenotati) >= Number(answers.howmany)){
            events[index].prenotati -= Number(answers.howmany);
            console.log("Disdetta effettuata!");
        }else
            console.log("Errore!");
        main(); 
    });
}

main();