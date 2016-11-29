import {Template} from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import './html/doador.html';



Template.cliente.onCreated(function () {

    this.estadoDaTela = new ReactiveDict();
    this.estadoDaTela.set('novo',false);
    this.estadoDaTela.set('ObjDoador',null);
    this.estadoDaTela.set('GetlistDoadores',null);

    buscarDoacao(this);





    Tracker.autorun(() => {
        Meteor.subscribe('cadastroPorUsuario', Meteor.userId());

    });
});

Template.cliente.events({

       'submit .cadastro': function(event,instance){
        event.preventDefault();
        const id =  $('#_id').val();

           const doadorSet = instance.estadoDaTela.get('ObjDoador');

        if(id) {

            //PUT


            Meteor.call('atualizar',setDoadorRest(doadorSet),(error,response)=>{
                instanciar(false,instance);
                limparCampos();
                buscarDoacao(instance);
            });

        } else {

            //POST

            Meteor.call('salvar',Objeto() ,function (error,response) {
                if(error) {
                    //instance.estadoDaTela.set('mensagemErro', error.reason);
                } else {
                    console.log(Objeto());
                    instanciar(false,instance);
                    limparCampos();
                    buscarDoacao(instance);
                }
            });

        }


    },

    'click .novo'(event,instance){
           instance.estadoDaTela.set('novo',true);

       },

    'click .js-cancelar-show-form'(event, instance){event.preventDefault();instanciar(false,instance)},

    'click .editar'(event, instance){
        const doador = this;
        instance.estadoDaTela.set('ObjDoador',doador);
        instanciar(true,instance)
    },

    'click .excluir'(event, instance){
        Meteor.call('apagar',this.id,()=>{
            buscarDoacao(instance);
        })
        ;},



});


Template.cliente.helpers({


    listDoadores(){return Template.instance().estadoDaTela.get('GetlistDoadores');},
    mostrarForm(){return Template.instance().estadoDaTela.get('novo')},
    doador(){return Template.instance().estadoDaTela.get('ObjDoador')}



});

function buscarDoacao(instance) {

    Meteor.call('buscarDoacaoRest',(error,response)=>{
        if(error){
            console.log(error)
        } else {
            console.log(response);
            instance.estadoDaTela.set('GetlistDoadores',response);
        }
    });
}








function limparCampos() {
    $('.cadastro').trigger("reset");
}

function instanciar(tipo,instance) {

    instance.estadoDaTela.set('novo',tipo);
}


function Objeto() {

    const nome =$('#nome').val();
    const sobrenome = $("#sobrenome").val();
    const email = $('#email').val();
    const cpf = $('#cpf').val();
    const tipoSangue =$('.tipoSangue').val();
    const tipoRede = $('.tipoRede').val();
    const idade = $('#idade').val();
    const dataNascimento = $('.dataNascimento').val();
    const cep = $('#cep').val();
    const rua =  $('#rua').val();
    const bairro =  $('#bairro').val();
    const numero = $('#numero').val();
    const cidade = $('#cidade').val();
    const estado = $('#estado').val();
    const codigo = $('#codigo').val();


    const doador = {nome, sobrenome, email, cpf, tipoSangue, tipoRede, idade, dataNascimento, cep, rua, bairro, numero, cidade, estado, codigo}

    return doador;
}


function setDoadorRest(doador) {

    doador.nome =$('#nome').val();
    doador.sobrenome = $("#sobrenome").val();
    doador.email = $('#email').val();
    doador.cpf = $('#cpf').val();
    doador.tipoSangue =$('.tipoSangue').val();
    doador.tipoRede = $('.tipoRede').val();
    doador.idade = $('#idade').val();
    doador.dataNascimento = $('.dataNascimento').val();
    doador.cep = $('#cep').val();
    doador.rua =  $('#rua').val();
    doador.bairro =  $('#bairro').val();
    doador.numero = $('#numero').val();
    doador.cidade = $('#cidade').val();
    doador.estado = $('#estado').val();
    doador.codigo = $('#codigo').val();

    return doador;
}





