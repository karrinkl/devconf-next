import Head from 'next/head';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Favorites from '../../components/Favorites/Favorites';
import RenderInfo from '../../components/RenderInfo/RenderInfo';
import SpeakerCard from '../../components/SpeakerCard/SpeakerCard';
import { speakers } from '../../data/speakers';
import { formatTimestamp } from '../../lib/formatDate';

/**
 * Страница «Спикеры» (/speakers). Стратегия: SSG.
 *
 * getStaticProps выполняется один раз при сборке (npm run build).
 * Результат сохраняется в готовый файл .next/server/pages/speakers.html,
 * и сервер отдаёт этот файл всем пользователям без повторных вычислений.
 * Список спикеров утверждается заранее и меняется редко, поэтому
 * пересобирать страницу на каждый запрос незачем.
 *
 * В режиме разработки (npm run dev) Next.js вызывает getStaticProps
 * на каждый запрос, чтобы правки были видны сразу. Разница между SSR
 * и SSG видна только в production-режиме: npm run build и npm run start.
 */
export async function getStaticProps() {
  // В браузер уходят только нужные карточке поля, без биографий
  const list = speakers.map(({ bio, tags, ...card }) => card);

  return {
    props: {
      speakers: list,
      builtAt: formatTimestamp(),
    },
  };
}

export default function SpeakersPage({ speakers: list, builtAt }) {
  return (
    <>
      <Head>
        <title>Спикеры - DEVCONF 2026</title>
        <meta name="description" content="Спикеры конференции DEVCONF 2026 и темы их докладов." />
      </Head>

      <section className="py-5">
        <Container>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
            <h1 className="fw-bold mb-0">Спикеры</h1>
            <Favorites speakers={list} />
          </div>

          <RenderInfo strategy="SSG" method="getStaticProps" label="Страница собрана" timestamp={builtAt} />

          <Row className="g-4">
            {list.map((speaker) => (
              <Col key={speaker.id} xs={12} md={6} xl={3}>
                <SpeakerCard {...speaker} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

SpeakersPage.propTypes = {
  speakers: PropTypes.arrayOf(PropTypes.object).isRequired,
  builtAt: PropTypes.string.isRequired,
};
