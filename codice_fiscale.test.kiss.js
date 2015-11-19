'use strict';

var cfLib = require('./codice_fiscaleB.js');

// a simple test function:
// callbacke with parameter agaiunst it's expected value
// not external dependecy, 
function kissTest( describeTest ,callback, parameter ,expectedReturnValue ){ 
    var returnedValue

	try
	{
		returnedValue= callback(parameter)
        if( returnedValue === expectedReturnValue )
            console.log( describeTest, "passed" )
        else
            console.log( describeTest, "Error:",expectedReturnValue ,"<>" ,returnedValue )            
	}
    catch(e)
    {
    	console.log( describeTest,e )  
	}
}


kissTest( 'cf test isInvalidCF on good cf',cfLib.isInvalidCF,'LLEGNN86P23F205T',false  )
kissTest( 'cf test isInvalidCF on good cf',cfLib.isInvalidCF,'MLLSNT82P65Z404U',false  )
kissTest( 'cf test isInvalidCF on good cf',cfLib.isInvalidCF,'MRTMTT25D09F205Z',false  )

kissTest( 'cf test omocodia 0 ',cfLib.getOmocodiaProgressiveNumber,'MLLSNT82P65Z404U',0  )
kissTest( 'cf test omocodia 0 ',cfLib.getOmocodiaProgressiveNumber,'MRTMTT25D09F205Z',0  )
kissTest( 'cf test omocodia 64',cfLib.getOmocodiaProgressiveNumber,'MLLSNTU2P65Z404U',64  )