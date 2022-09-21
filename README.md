# Prova Tecnica
### Prova tecnica per [Hastega Srl](https://www.hastega.it "Hastega website")

La prova tecnica è stata sviluppata con le tecnologie richieste e in particolare:

### Frontend
* Angular CLI: 14.2.2
* Node: 18.8.0 (Unsupported)
* Package Manager: npm 8.19.1 

### Backend
* Laravel Framework 9.31.0
* PHP 8.1.10


---

## Introduzione
Implementare una semplice applicazione web per gestire la propria libreria. Gli utenti
possono aggiungere, modificare e rimuovere libri dalla propria libreria. Inoltre, ogni utente
vuole tenere traccia del numero di letture per ogni libro.

## Descrizione delle risorse

### Books
Ogni libro è identificato da i seguenti attributi:
| Column | Type | Comment |
|-------------|-------------|-----|
| id | bigint unsigned | AutoIncrement PK |
| title | varchar(255) | |
| author | varchar(255) | |
| isbn | varchar(13) | |
| dataAggiunta | date | NN |
| dataRimozione | date | |
| trama | text | |
| numeroLetture | int | |
| iconPath | varchar(255) | |
| userId | bigint unsiged | FK |

### Users
Ogni utente è identificato da i seguenti attributi:
| Column | Type | Comment |
|-------------|-------------|-----|
| id | bigint unsigned | AutoIncrement PK |
| name | varchar(255) | |
| surname | varchar(255) | |
| email | varchar(255) | |
| password | varchar(64) | |
| iconPath | varchar(255) | |


## Specifiche Tecniche
L’applicazione si compone di una parte server(BE) e una parte client (FE). Il Frontend si compone solamente di tre schermate:
* login (vedi il primo punto della lista seguente);
* la lista dei libri in possesso dell’utente loggato;
* la pagina di dettaglio del libro, in cui è possibile visualizzare tutte le informazioni.


Il Backend espone alcune APIs che consentono al Frontend di accedere ai dati memorizzati nel database.
Dal punto di vista tecnico:
* Non è richiesta autenticazione, è sufficiente prevedere solamente una schermata da cui poter selezionare l’utente che utilizza l’applicazione;
* Versionamento su repository GIT;

Tecnologie accettate per il Backend:
* SpringBoot
* Laravel
* NodeJs

Tecnologie accettate per il Frontend:
* Angular
* VueJS
* React

Database Accettati:
* MySQL
* PostgreSQL
* MariaDB
Per tutto quello che non è esplicitamente richiesto, puoi procedere nel modo che ritieni migliore.


Sono considerati punti extra:
* Utilizzo di Docker
* UIX curata
* Applicazione ampliata oltre le richieste
* Deploy su server (Server fornito da Hastega, richiedere le credenziali SSH)
Puoi svolgere l’esercizio come meglio credi, al colloquio ti verrà richiesto di esporre quanto fatto e il
ragionamento che ha portato i risultati ottenuti.

