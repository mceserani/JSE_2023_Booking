# JSE_2023_Booking
Creazione di un sistema di prenotazione di biglietti per eventi con Node.js e Inquirer

## Obiettivo: 
Creare un'applicazione a riga di comando per gestire un sistema di prenotazione di biglietti per eventi. L'applicazione dovrebbe permettere di aggiungere eventi, visualizzare eventi, prenotare biglietti e cancellare prenotazioni. Gli utenti interagiranno con l'applicazione utilizzando Inquirer.

## Struttura dell'applicazione:

1. Visualizza un menu principale con le seguenti opzioni:
Aggiungi evento
Visualizza eventi
Prenota biglietti
Cancella prenotazione
Esci

2. Implementa una funzione **addEvent()** che permette di inserire un nuovo evento con i seguenti attributi:
Titolo
Data e ora
Luogo
Numero massimo di biglietti disponibili
Numero di biglietti prenotati (valore iniziale 0)

3. Implementa una funzione **viewEvents()** che visualizza l'elenco degli eventi con tutti i loro dettagli.

4. Implementa una funzione **bookTickets()** che permette di prenotare un numero specifico di biglietti per un evento selezionato. In pratica la funzione incrementa il numero di biglietti prenotati per l'evento. Il numero di biglietti prenotati non deve superare il numero massimo di biglietti disponibili. Se l'utente tenta di prenotare più biglietti di quelli disponibili, l'applicazione deve visualizzare un messaggio di errore.

5. Implementa una funzione **cancelBooking()** che consente di cancellare una prenotazione esistente per un evento specifico. In pratica la funzione decrementa il numero di biglietti prenotati per l'evento.