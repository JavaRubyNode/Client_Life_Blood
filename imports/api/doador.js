import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import './methods';
const Doador = new Mongo.Collection("doador");

const ObjDoador = new SimpleSchema({

    nome: {type: String , label:"Nome do doador"},
    sobrenome: {type: String , label:"Sobrenome do doador"},
    email: {type: String , label:"Email do doador"},
    cpf: {type: String , label:"CPF do doador"},
    idade: {type: Number , label:"Idade do doador"},
    cep: {type: String , label:"CEP do doador"},
    rua: {type: String , label:"Rua do doador"},
    bairro: {type: String , label:"Bairro do doador"},
    numero: {type: String , label:"Numero do doador"},
    cidade: {type: String , label:"Cidade do doador"},
    estado: {type: String , label:"Estado do doador"},
    codigo: {type: String , label:"Codigo do doador"}
});

Doador.schema = SimpleSchema({
   doador:{type:ObjDoador},
   userId:{type: Number,regEx:SimpleSchema.RegEx.Id}
});

export {Doador};




