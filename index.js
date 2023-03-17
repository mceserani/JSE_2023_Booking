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
  
    // SCRIVI IL TUO CODICE QUI

}

function viewEvents() {

    // SCRIVI IL TUO CODICE QUI

}

function bookTickets() {

    // SCRIVI IL TUO CODICE QUI

}

function cancelBooking() {
    
    // SCRIVI IL TUO CODICE QUI

}

main();
