import {Meteor} from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({

    salvar(doador){inserirDoadorRest(doador)},
    atualizar(doador){atualizarDoadorRest(doador)},
    apagar(id){removerDoadorRest(id)},
    buscarDoacaoRest() {if(Meteor.isServer) {this.unblock();const URL = "http://localhost:8080/doador/";return Meteor.wrapAsync(restCall)(URL);}}


});


const restCall = function(URL, callback) {try {const result = HTTP.get(URL);callback(null, result.data);} catch(e) {console.log(e);callback(500, 'Erro ao acessar API');}};

function removerDoadorRest(id) {
    if(Meteor.isServer) {
        try {
            const URL = `http://localhost:8080/doador/${id}`;
            HTTP.del(URL, function (error, response) {if (error) {console.log(error);} else {console.log(response);}});
        } catch (e) {console.log(e);}
    }
}

function inserirDoadorRest(doador) {
    if(Meteor.isServer) {
        try {
            const URL = `http://localhost:8080/doador/`;
            HTTP.post(URL, {data: doador}, function (error, response) {
                if (error) {console.log(error);} else {console.log(response);}});
        } catch (e) {console.log(e);}
    }
}


function atualizarDoadorRest(doador){
    if(Meteor.isServer) {
        try {
            const URL = `http://localhost:8080/doador/${doador.id}`;
            HTTP.put(URL, {data: doador}, function (error, response) {
                if (error) {console.log(error);}else {console.log(response);}});
        } catch (e) {console.log(e);}
    }
}
