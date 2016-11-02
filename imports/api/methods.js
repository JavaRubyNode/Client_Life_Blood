import {Meteor} from 'meteor/meteor';
import {Doador} from './doador.js';
import {check} from 'meteor/check';

Meteor.methods({

    salvar(doadorObj){Doador.insert(doadorObj);},
    atualizar(id,doadorObj){alterarDados(id,doadorObj)},
    apagar(){remover(id)}

});



function alterarDados(id,doadorObj) {
    Pessoa.update({_id:id}, {
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



