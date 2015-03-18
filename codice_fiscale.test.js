'use strict';

var cfCheck = require('./codice_fiscale.js');
var expect = require('chai').expect;

describe('The codice fiscale validator', function(){

    it('accepts a valid CF', function(){

        expect(cfCheck('LLEGNN86P23F205T')).to.be.ok;
    });

    it('refuses an invalid control code', function(){

        try { cfCheck('LLEGNN86P23F205S'); }
        catch(e){

            expect(e.message).to.equal('Wrong code');
        }
    });

});
