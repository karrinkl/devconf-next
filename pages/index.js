import Head from 'next/head';
import Link from 'next/link';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

import Icon from '../components/Icon/Icon';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import { faqItems } from '../data/faq';

/**
 * Главная страница (/).
 *
 * Это бывший App.jsx из ЛР № 23 без блока спикеров: спикеры
 * и расписание вынесены на отдельные страницы /speakers и /schedule.
 *
 * У страницы нет ни getServerSideProps, ни getStaticProps, поэтому
 * Next.js применяет автоматическую статическую оптимизацию: HTML
 * формируется один раз при сборке, как у SSG-страницы без данных.
 */
export default function HomePage() {
  const defaultFaqKey = String(faqItems.findIndex((item) => item.defaultOpen));

  return (
    <>
      <Head>
        <title>DEVCONF 2026 - конференция инженеров и разработчиков</title>
        <meta
          name="description"
          content="DEVCONF 2026: конференция инженеров и разработчиков в Минске, 18-19 мая 2026 года."
        />
      </Head>

      <header className="hero py-5 text-white">
        <Container>
          <Stack gap={4} className="align-items-start">
            <img className="hero-logo" src="/icons/logo-devconf-full-inverse.svg" alt="DEVCONF 2026" />

            <h1 className="display-5 fw-bold lh-sm mb-0" style={{ maxWidth: '18em' }}>
              Конференция инженеров и разработчиков, 18 мая 2026
            </h1>

            <p className="lead text-white-50 mb-0">
              Минск · 24 доклада · 6 воркшопов · онлайн-трансляция бесплатно
            </p>

            <Stack direction="horizontal" gap={3} className="flex-wrap">
              <Button as={Link} href="/speakers" variant="primary" size="lg">
                Спикеры конференции
              </Button>
              <Button
                as={Link}
                href="/schedule"
                variant="outline-light"
                size="lg"
                className="d-inline-flex align-items-center gap-2"
              >
                <Icon src="/icons/icon-microphone.svg" size={20} />
                Смотреть программу
              </Button>
            </Stack>
          </Stack>
        </Container>
      </header>

      <section className="py-5 bg-white border-bottom" id="faq">
        <Container>
          <Row>
            <Col xs={12} lg={8}>
              <h2 className="h1 fw-bold mb-4">Частые вопросы</h2>
              <Accordion defaultActiveKey={defaultFaqKey}>
                {faqItems.map((item, index) => (
                  <Accordion.Item eventKey={String(index)} key={item.id}>
                    <Accordion.Header>{item.question}</Accordion.Header>
                    <Accordion.Body>{item.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5" id="registration">
        <Container>
          <Row>
            <Col xs={12} md={8} xl={5}>
              <h2 className="h1 fw-bold mb-4">Регистрация</h2>
              <RegistrationForm onRegister={(email) => console.log('Зарегистрирован участник:', email)} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
