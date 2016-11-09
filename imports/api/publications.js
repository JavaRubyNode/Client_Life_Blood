import {Meteor} from 'meteor/meteor';
import {Doador} from '../api/doador.js';


//Meteor.publish('listaDoadores',function () {return  Doador.find();});

Meteor.publish('cadastroPorUsuario',function (userId) {return Doador.find({ userId: userId});});



