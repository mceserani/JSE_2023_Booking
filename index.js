import inquirer from "inquirer";

const events = [];

function main() {
  inquirer
    .prompt([
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
  
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Titolo dell\'evento:',
      },
      {
        type: 'input',
        name: 'dateTime',
        message: 'Data e ora dell\'evento (es. 01/01/2023 18:00):',
      },
      {
        type: 'input',
        name: 'location',
        message: 'Luogo dell\'evento:',
      },
      {
        type: 'number',
        name: 'maxTickets',
        message: 'Numero massimo di biglietti disponibili:',
      },
    ])
    .then((event) => {
      event.bookedTickets = 0;
      events.push(event);
      console.log('Evento aggiunto con successo!');
      main();
    });

}

function viewEvents() {
events.forEach((event, index) => {
    console.log(`\nEvento ${index + 1}:`);
    console.log(`Titolo: ${event.title}`);
    console.log(`Data e ora: ${event.dateTime}`);
    console.log(`Luogo: ${event.location}`);
    console.log(`Biglietti disponibili: ${event.maxTickets - event.bookedTickets}`);
  });

  main();
}

function bookTickets() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'eventToBook',
        message: 'Per quale evento vuoi prenotare biglietti?',
        choices: events.map((event, index) => `${index + 1}. ${event.title}`),
      },
      {
        type: 'number',
        name: 'tickets',
        message: 'Quanti biglietti vuoi prenotare?',
      },
    ])
    .then((answers) => {
      const eventIndex = parseInt(answers.eventToBook.split('.')[0]) - 1;
      const event = events[eventIndex];
      const availableTickets = event.maxTickets - event.bookedTickets;

      if (answers.tickets <= availableTickets) {
        event.bookedTickets += answers.tickets;
        console.log('Biglietti prenotati con successo!');
      } else {
        console.log('Biglietti insufficienti. Riprova.');
      }

      main();
    });
}

function cancelBooking() {
    inquirer
    .prompt([
      {
        type: 'list',
        name: 'eventToCancel',
        message: 'Per quale evento vuoi cancellare la prenotazione?',
        choices: events.map((event, index) => `${index + 1}. ${event.title}`),
},
{
type: 'number',
name: 'tickets',
message: 'Quanti biglietti vuoi cancellare?',
},
])
.then((answers) => {
const eventIndex = parseInt(answers.eventToCancel.split('.')[0]) - 1;
const event = events[eventIndex];
  if (answers.tickets <= event.bookedTickets) {
    event.bookedTickets -= answers.tickets;
    console.log('Prenotazione cancellata con successo!');
  } else {
    console.log(
      'Il numero di biglietti da cancellare è superiore a quelli prenotati. Riprova.'
    );
  }

  main();
});

}

main();
