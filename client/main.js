import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Meteor} from 'meteor/meteor';

import './main.html';
import '../imports/ui/doador.js';
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


