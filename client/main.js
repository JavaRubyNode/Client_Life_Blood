import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


import './main.html';
import '../imports/ui/doador.js';
import '../imports/ui/html/comboSangue.html';
import '../imports/ui/html/comboRede.html';
import '../imports/ui/html/navBar.html';
import '../imports/ui/html/logoDoador.html';
import '../imports/ui/html/cadastroDoador.html';
import '../imports/ui/html/tabelaDoador.html';
import '../imports/ui/accountsConfig.js';



Template.registerHelper('isLogado', function() {
    return Meteor.userId();
});


Meteor.startup(() => {
    T9n.setLanguage('pt');
});

Template.body.events({
    'click .js-sair'(e) {
        e.preventDefault();
        AccountsTemplates.logout();
    }
});


