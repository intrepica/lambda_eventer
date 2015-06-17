'use strict';

var expect = require('expect.js');
var sinon = require('sinon');
var _ = require('lodash');
var proxyquire = require('proxyquire').noPreserveCache();

var mock = sinon.mock;


describe('lambda_eventer', function(){
    var requireStubs, lambda, sqsEvent, context, message;

    beforeEach(function(){
        requireStubs = { request: mock() };      
        context = { succeed: function() {}, fail: function() {} };
        message = { test_message:true };
        sqsEvent = { Records:[ { Sns: { Message:JSON.stringify(message) } } ] };  
        lambda = proxyquire('../', requireStubs);        
    });

    describe('.handler', function() {

        it('calls request with exports.options with json set to the parsed sqs message', function(done) {
            var options = _.clone(lambda.options);
            options.json = message;          
            requireStubs.request.withArgs(options);
            lambda.handler(sqsEvent);     
            requireStubs.request.verify();
            done();                
        });

        describe('when request returns statusCode in the 200\'s', function() {                    
            it('calls succeed on context', function(done) {                             
                requireStubs.request.yields(null, { statusCode:200 });                               
                context.succeed = mock().once();                
                lambda.handler(sqsEvent, context);                
                context.succeed.verify();                        
                done();              
            });

            it('calls succeed on context', function(done) {                             
                requireStubs.request.yields(null, { statusCode:202 });                               
                context.succeed = mock().once();                
                lambda.handler(sqsEvent, context);                
                context.succeed.verify();                        
                done();              
            });
        });   

        describe('when request returns statusCode != 200', function() {
            beforeEach(function() {
                requireStubs.request.yields(null, { statusCode:400 });
            });

            it('calls fail on context', function(done) {                                                            
                context.fail = mock().once();                
                lambda.handler(sqsEvent, context);                
                context.fail.verify();                        
                done();              
            });

            it('passes the response as an error to the fail callback', function(done) {                                                                            
                lambda.handler(sqsEvent, {
                    fail: function(err) {
                        expect(err).to.eql(new Error({ statusCode:400 }));
                        done(); 
                    }
                });                                            
            });            
        });   

        describe('when request returns an error', function() {
            it('passes the response as an error to the fail callback', function(done) {                                                                            
                requireStubs.request.yields('some error');
                lambda.handler(sqsEvent, {
                    fail: function(err) {
                        expect(err).to.eql('some error');
                        done(); 
                    }
                });                                            
            });            
        });  
    });
});