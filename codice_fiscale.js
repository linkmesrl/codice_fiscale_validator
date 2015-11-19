'use strict';

var REGEX_CODICEFISCALE =/^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})|([0-9]{11})$/;

//var CHR_WOMEN = 'F';
//var CHR_MEN = 'M';

var listDecOmocodia = {'A':'!','B':'!','C':'!','D':'!','E':'!','F':'!','G':'!','H':'!','I':'!','J':'!','K':'!','L':'0','M':'1','N':'2','O':'!','P':'3','Q':'4','R':'5','S':'6','T':'7','U':'8','V':'9','W':'!','X':'!','Y':'!','Z':'!'};

var listSostOmocodia = [6,7,9,10,12,13,14];

var listEvenChar = {'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'I':8,'J':9,'K':10,'L':11,'M':12,'N':13,'O':14,'P':15,'Q':16,'R':17,'S':18,'T':19,'U':20,'V':21,'W':22,'X':23,'Y':24,'Z':25};

var listOddChar = {'0':1,'1':0,'2':5,'3':7,'4':9,'5':13,'6':15,'7':17,'8':19,'9':21,'A':1,'B':0,'C':5,'D':7,'E':9,'F':13,'G':15,'H':17,'I':19,'J':21,'K':2,'L':4,'M':18,'N':20,'O':11,'P':3,'Q':6,'R':8,'S':12,'T':14,'U':16,'V':10,'W':22,'X':25,'Y':24,'Z':23};

var listCtrlCode = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

//var listDecMonth = {'A':'01','B':'02','C':'03','D':'04','E':'05','H':'06','L':'07','M':'08','P':'09','R':'10','S':'11','T':'12'};

var listError = { 0 : 'Empty code', 1 : 'Len error', 2 : 'Code with wrong char', 3 : 'Code with wrong char in omocodia', 4 : 'Wrong code'};

/*
return the error description of cf, or false if the codiceFiscale is correct
*/
//module.exports.isInvalidCF = function (codiceFiscale){

function isInvalidCF(codiceFiscale){


    if(!codiceFiscale){
        return listError[0];
    }

    if(codiceFiscale.length !== 16){
        return listError[1];
    }

    if(!codiceFiscale.match(REGEX_CODICEFISCALE)){
        return listError[2];
    }

    var cfCharList = codiceFiscale.toUpperCase().split('');

    listSostOmocodia.forEach( function(omocodiaIndex){

        var charAtIndex = cfCharList[omocodiaIndex];

        if ( isNaN(charAtIndex)  && listDecOmocodia[charAtIndex] ==='!'){

            return listError[3];
        }
    });

    var pari = 0;

    var dispari = listOddChar[cfCharList[14]];

    for(var i=0; i<13; i+=2){

        dispari += listOddChar[cfCharList[i]];
        pari += listEvenChar[cfCharList[i+1]];
    }

    var checksum = listCtrlCode[ (pari+dispari) % 26 ];

    if( checksum !== cfCharList[15] ){

        return listError[4];
    }

    return false;
};


//for backward compatibility
//it raise error on wrong codes
//and return true on rigth one
function checkCf(codiceFiscale)
{
    var r= isInvalidCF(codiceFiscale);

    if( r=== false ) 
        return true;

    throw new Error( r );
}



/*
check for identify an omocodia,
is possible detece the progressive number identifing a fiscal code
for each code could be one strigth fiscal code with no omocodia,
and at maximum 128 code rimapped encoding the number in the fiscal code with string

this  function return an integer, 0 mean no omocodia, 
4 mean that this code is 4omocodic fiscal code (pointing to the straigth version)
and so on 
*/

//module.exports.getOmocodiaProgressiveNumber = function ( sCf )

function getOmocodiaProgressiveNumber( sCf )
{
    if( !sCf )
        return 0

    var reOmocode = /[lmnpqrstuv]/ig;

    var tmp

    var iOmocodia= 0;
    var aOmocodiaPosition=[ 14,13,12,10,9,7,6 ]

    /*if the cf is shorter than expected we would calculate anyway 
    if the cf sound omocodic*/
    var iMax=sCf.length
    var tmp=[]
    var i
    for( i=0; i<aOmocodiaPosition.length; i++ )
    {
        if(aOmocodiaPosition[i]<iMax)
            tmp.push( aOmocodiaPosition[i] )
    }   
    aOmocodiaPosition= tmp;

    /*
    There is an omocodia when a fiscal code is not unique
    in other words there are distinct people with the the same fiscal code,
    In computer slang we could say that when we call "omocodia" when there is a the fiscal hash collapse.
    to solve this condition the italian tax bureau 
    must replace the numbers with letter (from left to right).
    Because there are 7 numbers that can be replaced with a corrispondent number
    this is the map of the encoding  with omocodia:
    0->L    5->R
    1->M    6->S
    2->N    7->T
    3->P    8->U
    4->Q    9->V

    there could be 2^7 combination of the same fiscal code.
    Omocodia a rare, but on average year there are ~1400 new omocodia.
      */
    for( var i=0; i<aOmocodiaPosition.length; i++ )
    {       
        //tmp= sCf[ aOmocodiaPosition[i] ]
        //if( reOmocode.test( tmp ) )
        if( reOmocode.test( sCf[ aOmocodiaPosition[i] ] ) )
        {
            iOmocodia+= Math.pow(2,i)
        }
    }

    return iOmocodia;
}

//for backward compatibilty with node module export
try{
if(module)
{

module.exports.isInvalidCF = isInvalidCF
module.exports.getOmocodiaProgressiveNumber = getOmocodiaProgressiveNumber
module.exports.checkCf= checkCf
}    
}
catch(e)
{
    console.log( "error",e )  
}
