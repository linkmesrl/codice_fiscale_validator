#Validazione codice fiscale

E' un port parziale di https://github.com/andreausu/CodiceFiscale

Viene validato:

* formato
* checksum
* compatibile con omocodie

Ho aggiunto:

```javascript
    //ritorna false quando non ci sono errori nel cf, 
    //o la stringa di errore. Senza lanciare eccezioni.

    var r=  isInvalidCF( codiceFiscale )
   
    if( r=== false ) 
        console.log( "nessun errore" )
    else 
        console.log( "msg errore:",r )

    //ratio: trovo scomodo chiamare una funzione di test che lancia eccezioni
    //perche il codice diventa piu complicato del necessario.


    //le dichiarazione delle funzioni vengono esportate tramite module.export se questo esiste,
    //in modo che il codice sia utilizzabile senza modifiche in node.js e nel browser
    //senza librerie esterne (k.i.s.s.)

    //possiamo utilizzarla ad esempio in node tramite
    var Cf = require('codice_fiscale');
    var r= Cf.isInvalidCF( codiceFiscale )

    //ed utilizzare la funzione isCf (che lancia eccezioni quando incontra cf errati)
    //senza modificare il codice esistente
    
    //valido
    try{
        Cf.isCf('LLEGNN86P23F205T'); //-> true
    }
    catch(err){
        //err === null
    }
    
    //non valido - spec per altra documentazione
    try{
        isCf('LSEGNN86p23F205T'); 
    }
    catch(err){
        
        //err instanceof Error
    }
```

app.html mostra una direttiva che usa questo libreria per validare il cf
