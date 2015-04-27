#Validazione codice fiscale

E' un port parziale di https://github.com/andreausu/CodiceFiscale

Viene validato:

* formato
* checksum
* compatibile con omocodie

    var isCf = require('codice_fiscale_validator');
    isCf('LLEGNN86P23F205T') -> TRUE
    isCf('LSEGNN86p23F205T') -> FALSE

