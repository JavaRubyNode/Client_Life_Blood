import {Template} from 'meteor/templating';
import {Doador} from '../api/doador.js'
import '/public/css/site.css';
import './doador.html';
import './cep.js'


Template.cliente.events({

    //--------------------ação do botão SALVAR-----------------------

    "submit .cadastro": function(event){
        event.preventDefault();

        const id =  $('#_id').val();

        if(id) {Meteor.call('atualizar',id,Objeto());}
        else {Meteor.call('salvar', Objeto());}

        limparCampos();
    },

    //------------------------------------------------------------------



    // --------------------ação de editar do botao EDITAR---------------

    'click .editar'(){

        const doador = Doador.findOne({_id: this._id});
        prepararEditar();},

    //---------------------------------------------------------------------


    //---------------------ação de excluir do botão EXCLUIR-----------------

    'click .excluir'(){Meteor.call('apagar',this._id);},

    //----------------------------------------------------------------------
});

Template.cliente.helpers({

    isLogado() {return Meteor.userId();},
    listaDoadores(){return Doador.find();}
});

    //------função para limpar campos usando JQuery-------------------------------

     function limparCampos() {$('.cadastro').trigger("reset");}

   //------------------------------------------------------------------------------


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


    const doador = {
        nome:nome,
        sobrenome:sobrenome,
        email:email,
        pf:cpf,
        tipoSangue:tipoSangue,
        ipoRede:tipoRede,
        idade:idade,
        dataNascimento:dataNascimento,
        cep:cep,
        rua:rua,
        bairro:bairro,
        numero:numero,
        cidade:cidade,
        estado:estado,
        codigo:codigo}

    return doador;
}


function prepararEditar() {

    const doador = Objeto();

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
    $('#_id').val(doador._id);
}

