
const greet = nombre => `Hello ${nombre}!`;

greet.prototype = {
  nombre: String
};

export { greet };