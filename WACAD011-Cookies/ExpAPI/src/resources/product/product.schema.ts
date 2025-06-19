import Joi from "joi";

export const productSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(0).required(),
  stockQuantity: Joi.number().min(0).integer().required(),
});

export const productIdSchema = Joi.object().keys({
  id: Joi.string().guid({ version: 'uuidv4' }).required(),
});


/*
Check validation

const televisao = {
  name: "Smart TV",
  price: 1500,
  stockQuantity: 10,
}
const resultTelevisao = productSchema.validate(televisao);
console.log(resultTelevisao);

const celular = {
  id: "b3b8f6e2-3c7a-4e2a-9c1a-2f8e4b6a9d2f",
}
const resultCelular = productIdSchema.validate(celular);
console.log(resultCelular);
*/