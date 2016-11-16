import {Template} from 'meteor/templating';
import {Doador} from '../api/doador.js';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import './html/doador.html';

Template.cliente.rendered=function () {
    $(".dataNascimento").datepicker({
        format:'mm/dd/yyyy'
    });
}


Template.cliente.onCreated(function () {

    this.estadoDaTela = new ReactiveDict();
    this.estadoDaTela.set('novo',false);

    //this.lista = Meteor.http.call('GET','http://localhost:8080/doador/');

    Tracker.autorun(() => {
        Meteor.subscribe('cadastroPorUsuario', Meteor.userId());

    });
});

Template.cliente.helpers({

    isLogado() {return Meteor.userId();},
    listaDoadores(){return Template.instance().lista},
    mostrarForm(){return Template.instance().estadoDaTela.get('novo')},



});


Template.cliente.events({

       'submit .cadastro': function(event,instance){
        event.preventDefault();
        const id =  $('#_id').val();

        if(id) {
            Meteor.call('atualizar',id,Objeto());
        }
        else {
            Meteor.call('salvar', Objeto(),function (error,response) {
                if(error) {
                    //instance.estadoDaTela.set('mensagemErro', error.reason);
                } else {
                    instanciar(false,instance);
                    //instance.estadoDaTela.set('mensagemErro', null);
                    //instance.estadoDaTela.set('mensagemSucesso', 'Criado com sucesso!');
                    limparCampos();
                }
            });

        }


    },

    'click .novo'(event,instance){instance.estadoDaTela.set('novo',true);Meteor.subscribe('listaDoadores',Meteor.userId());rolarTela();},

    'click .js-cancelar-show-form'(event, instance){event.preventDefault();instanciar(false,instance)},

    'click .editar'(){const doador = Doador.findOne({_id: this._id});prepararEditar(doador);},

    'click .excluir'(){Meteor.call('apagar',this._id);},



});

function rolarTela() {
    $('.novo').click(function (event){
        const elemento = $(this).attr('href');
        const deslocamento = $(elemento).offset().top;
        $('html ,body').animate({scrollTop:deslocamento},'slow')
    });
}

function pegarCep() {
    $('#cep').blur(function () {


    const tempCep = $('#cep').val();
    $.getJSON(`http://api.postmon.com.br/v1/cep/`+{tempCep},function (dados) {
        if (!("erro" in dados)) {
            //Atualiza os campos com os valores da consulta.
            $("#rua").val(dados.logradouro);
            $("#bairro").val(dados.bairro);
            $("#cidade").val(dados.cidade);
            $("#uf").val(dados.estado);
            $("#ibge").val(dados.cidade_info.codigo_ibge);
        } //end if.
    });

    });
}


function formatarData(doador) {return moment(doador.dataNascimento).format('DD/MM/YYYY');}

function limparCampos() {$('.cadastro').trigger("reset");}

function instanciar(tipo,instance) {instance.estadoDaTela.set('novo',tipo);}

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

    return doador;}


function prepararEditar(doador) {

    $('#nome').val(doador.nome);
    $("#sobrenome").val(doador.sobrenome);
    $('#email').val(doador.email);
    $('#cpf').val(doador.cpf);
    $('.tipoSangue').val(doador.tipoSangue);
    $('.tipoRede').val(doador.tipoRede);
    $('#idade').val(doador.idade);
    $('.dataNascimento').val(doador.dataNascimento);
    $('#cep').val(doador.cep);
    $('#rua').val(doador.rua);
    $('#bairro').val(doador.bairro);
    $('#numero').val(doador.numero);
    $('#cidade').val(doador.cidade);
    $('#estado').val(doador.estado);
    $('#codigo').val(doador.codigo);
    $('#_id').val(doador._id);}



