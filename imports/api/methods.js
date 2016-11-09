import {Meteor} from 'meteor/meteor';
import {Doador} from './doador.js';
import {check} from 'meteor/check';
import {HTTP} from 'meteor/http';

Meteor.methods({

    salvar(doadorObj){Doador.insert(doadorObj);},
    atualizar(id,doadorObj){alterarDados(id,doadorObj)},
    apagar(id){remover(id)},
    listar(){obterListaApi()}

});



function alterarDados(id,doadorObj) {
    Doador.update({_id:id}, {
        $set:{
            'nome':doadorObj.nome,
            'sobrenome':doadorObj.sobrenome,
            'email':doadorObj.email,
            'cpf':doadorObj.cpf,
            'tipoSangue':doadorObj.tipoSangue,
            'tipoRede':doadorObj.tipoRede,
            'idade':doadorObj.idade,
            'dataNascimento':doadorObj.dataNascimento,
            'cep':doadorObj.cep,
            'rua':doadorObj.rua,
            'bairro':doadorObj.bairro,
            'numero':doadorObj.numero,
            'cidade':doadorObj.cidade,
            'estado':doadorObj.estado,
            'codigo':doadorObj.codigo
        }
    })}

function remover(id) {Doador.remove({_id:id});}

function removerApi(id) {HTTP.delete(`http://localhost:8080/doador/`+id,function (error,response) {if (error){console.log(error)}else{response}});}

function atualizarApi(id) {HTTP.put(`http://localhost:8080/doador`+id,function (error,response) {if (error){console.log(error)}else{console.log(response)}});}

function obterListaApi() {HTTP.get( 'http://localhost:8080/doador',function( error, response ) {if ( error ) {console.log( error );} else {JSON.parse(response.content)}});}