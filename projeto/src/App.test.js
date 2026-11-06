import { render, screen, within } from '@testing-library/react';
import App from './App';

test('apresenta a página inicial e os três desafios futuros', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Mais privacidade.');
  const cards = screen.getAllByRole('article');
  expect(cards).toHaveLength(3);
  ['Tornar a conta privada', 'Desativar anúncios personalizados', 'Revisar marcações no perfil'].forEach((title, index) => {
    expect(within(cards[index]).getByRole('heading', { name: title })).toBeInTheDocument();
    expect(within(cards[index]).getByText('Em breve')).toBeInTheDocument();
  });
  const link = screen.getByRole('link', { name: 'Conheça os desafios' });
  expect(document.querySelector(link.getAttribute('href'))).toHaveAccessibleName('Uma escolha de cada vez.');
});
