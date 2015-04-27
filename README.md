#Validazione codice fiscale

E' un port parziale di https://github.com/andreausu/CodiceFiscale

Viene validato:

* formato
* checksum
* compatibile con omocodie

```javascript
    var isCf = require('codice_fiscale_validator');
    
    //valido
    try{
        isCf('LLEGNN86P23F205T'); //-> true
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
