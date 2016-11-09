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



Template.registerHelper('isLogado', function() {
    return Meteor.userId();
});