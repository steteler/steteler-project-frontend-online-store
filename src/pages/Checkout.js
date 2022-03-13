import React, { Component } from 'react';
import { getFullCart } from '../services/localStorageHandler';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      listOfProducts: getFullCart(),
      total: this.sumTotal(),
      form: {
        fullname: '',
        email: '',
        cpf: '',
        phone: '',
        cep: '',
        address: '',
      },
    };
  }

  sumTotal = () => (
    getFullCart().reduce((total, { product: { price }, quantity }) => {
      const value = price * quantity;
      total += value;
      return total;
    }, 0)
  )

  render() {
    const { listOfProducts, total,
      form: { fullname, email, cpf, phone, cep, address } } = this.state;
    return (
      <div>
        <h1>Checkout</h1>
        <div>
          <h2>Revise seus Produtos</h2>
          {listOfProducts.map(({ product: { thumbnail, title, price, id } }) => (
            <div key={ id }>
              <img src={ thumbnail } alt={ title } />
              <span>{title}</span>
              <span>{`R$ ${price}`}</span>
              <hr />
            </div>
          ))}
          <div>{`Total: ${total}`}</div>
        </div>
        <div>
          <form>
            <fieldset>
              <legend>Dados de pagamento:</legend>
              <input
                name="fullname"
                data-testid="checkout-fullname"
                type="text"
                value={ fullname }
                placeholder="Nome Completo"
              />
              <input
                name="email"
                data-testid="checkout-email"
                type="email"
                value={ email }
                placeholder="Email"
              />
              <input
                name="cpf"
                data-testid="checkout-cpf"
                type="text"
                value={ cpf }
                placeholder="CPF"
              />
              <input
                name="phone"
                data-testid="checkout-phone"
                type="text"
                value={ phone }
                placeholder="Telefone"
              />
              <input
                name="cep"
                data-testid="checkout-cep"
                type="text"
                value={ cep }
                placeholder="CEP"
              />
              <input
                name="address"
                data-testid="checkout-address"
                type="text"
                value={ address }
                placeholder="Endereço"
              />
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}
