import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

/**
 * RenderInfo - плашка со стратегией рендеринга страницы.
 *
 * Отметка времени формируется не в браузере, а в функции получения
 * данных и приходит в props. Для SSR-страницы это момент запроса,
 * для SSG-страницы - момент сборки. Поэтому по исходному коду
 * HTML (Ctrl+U) видно, когда именно была сгенерирована разметка.
 */
function RenderInfo({ strategy, method, label, timestamp }) {
  const isSsr = strategy === 'SSR';

  return (
    <Alert
      variant={isSsr ? 'info' : 'success'}
      className="d-flex flex-wrap align-items-center gap-2 small mb-4"
      data-render-strategy={strategy}
    >
      <strong>{strategy}</strong>
      <span>· {method} ·</span>
      <span>
        {label}: <time data-rendered-at={timestamp}>{timestamp}</time>
      </span>
    </Alert>
  );
}

RenderInfo.propTypes = {
  /** Аббревиатура стратегии: SSR или SSG */
  strategy: PropTypes.oneOf(['SSR', 'SSG']).isRequired,
  /** Имя функции получения данных */
  method: PropTypes.string.isRequired,
  /** Подпись перед отметкой времени */
  label: PropTypes.string.isRequired,
  /** Отметка времени, отформатированная на сервере */
  timestamp: PropTypes.string.isRequired,
};

export default RenderInfo;
