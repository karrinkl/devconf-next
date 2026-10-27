import { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Icon from '../Icon/Icon';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * RegistrationForm - форма регистрации из ЛР № 23, перенесена
 * без изменений логики. На сервере форма отрисовывается в исходном
 * состоянии, обработчики событий подключаются в браузере при гидратации.
 */
function RegistrationForm({ helperText = 'Билет придёт на эту почту', onRegister = () => {} }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
    if (error) setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Введите корректный e-mail');
      return;
    }

    setError('');
    setIsRegistered(true);
    onRegister(email.trim());
  };

  if (isRegistered) {
    return (
      <Alert variant="success" className="mb-0">
        <Alert.Heading as="h3" className="h5">
          Заявка принята
        </Alert.Heading>
        Билет отправлен на {email.trim()}
      </Alert>
    );
  }

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="mb-4" controlId="registration-email">
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="ivan@example.com"
          isInvalid={Boolean(error)}
          aria-describedby="registration-email-helper"
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        {!error && <Form.Text id="registration-email-helper">{helperText}</Form.Text>}
      </Form.Group>

      <Button type="submit" variant="primary" className="d-inline-flex align-items-center gap-2">
        Зарегистрироваться
        <Icon src="/icons/icon-arrow-right.svg" size={20} />
      </Button>
    </Form>
  );
}

RegistrationForm.propTypes = {
  helperText: PropTypes.string,
  onRegister: PropTypes.func,
};

export default RegistrationForm;
