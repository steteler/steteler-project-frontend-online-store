import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  handleFormCheckout = ({ target: { name, value } }) => {
    this.setState(({ form }) => ({ form: { ...form, [name]: value } }));
  }

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
          <div>{`Total: R$ ${total}`}</div>
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
                onChange={ this.handleFormCheckout }
              />
              <input
                name="email"
                data-testid="checkout-email"
                type="email"
                value={ email }
                placeholder="Email"
                onChange={ this.handleFormCheckout }
              />
              <input
                name="cpf"
                data-testid="checkout-cpf"
                type="text"
                value={ cpf }
                placeholder="CPF"
                onChange={ this.handleFormCheckout }
              />
              <input
                name="phone"
                data-testid="checkout-phone"
                type="text"
                value={ phone }
                placeholder="Telefone"
                onChange={ this.handleFormCheckout }
              />
              <input
                name="cep"
                data-testid="checkout-cep"
                type="text"
                value={ cep }
                placeholder="CEP"
                onChange={ this.handleFormCheckout }
              />
              <input
                name="address"
                data-testid="checkout-address"
                type="text"
                value={ address }
                placeholder="Endereço"
                onChange={ this.handleFormCheckout }
              />
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  listOfProducts: PropTypes.array,
  total: PropTypes.number,
  form: PropTypes.shape({
    fullname: PropTypes.string,
    email: PropTypes.string,
    cpf: PropTypes.string,
    phone: PropTypes.string,
    cep: PropTypes.string,
    address: PropTypes.string,
  }),
}.isRequired;
