const request = require('supertest');
const app = require('../app.js'); // Substitua pelo caminho para o seu arquivo de configuração do Express

// Funções de validação
const isValidName = (name) => typeof name === 'string' && name.length >= 3 && name.length <= 255;
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidAge = (age) => typeof age === 'number' && age > 0 && age < 120;
const isValidPrice = (price) => typeof price === 'number' && price > 0;
const isValidDate = (date) => {
  const d = new Date(date);
  const minDate = new Date('2000-01-01');
  const maxDate = new Date('2024-06-20');
  return d >= minDate && d <= maxDate;
};

describe('Validation Tests', () => {
  test('Nome válido', () => {
    expect(isValidName('John')).toBe(true);
    expect(isValidName('Jo')).toBe(false);
    expect(isValidName('')).toBe(false);
  });

  test('Email válido', () => {
    expect(isValidEmail('email@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
  });

  test('Idade válida', () => {
    expect(isValidAge(25)).toBe(true);
    expect(isValidAge(-5)).toBe(false);
    expect(isValidAge(130)).toBe(false);
  });

  test('Preço válido', () => {
    expect(isValidPrice(100)).toBe(true);
    expect(isValidPrice(-100)).toBe(false);
  });

  test('Data válida', () => {
    expect(isValidDate('2020-01-01')).toBe(true);
    expect(isValidDate('1999-12-31')).toBe(false);
    expect(isValidDate('2025-01-01')).toBe(false);
  });
});
