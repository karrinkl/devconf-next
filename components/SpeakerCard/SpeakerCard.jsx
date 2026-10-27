import Link from 'next/link';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Icon from '../Icon/Icon';
import { selectIsFavorite, toggleFavorite } from '../../store/favoritesSlice';

/**
 * SpeakerCard - карточка спикера на компоненте Card из React Bootstrap.
 *
 * По сравнению с ЛР № 23 добавлена ссылка на страницу спикера
 * /speakers/[id]. Ссылка сделана компонентом Link из next/link:
 * переход выполняется на клиенте без перезагрузки страницы,
 * а HTML и данные целевой страницы Next.js подгружает заранее,
 * когда ссылка появляется в области видимости.
 */
function SpeakerCard({ id, name, role, company, topic, photo, photoRetina, date, hall }) {
  const isFavorite = useSelector(selectIsFavorite(id));
  const dispatch = useDispatch();

  return (
    <Card className="h-100 shadow-sm">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={photo}
          srcSet={photoRetina ? `${photo} 1x, ${photoRetina} 2x` : undefined}
          alt={`Фотография спикера: ${name}`}
          loading="lazy"
        />

        <Button
          variant={isFavorite ? 'warning' : 'light'}
          size="sm"
          className="speaker-star position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
          onClick={() => dispatch(toggleFavorite(id))}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Убрать из избранного: ${name}` : `Добавить в избранное: ${name}`}
        >
          <Icon src="/icons/icon-star.svg" size={18} />
        </Button>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title as="h3" className="h5 mb-1">
          <Link href={`/speakers/${id}`} className="stretched-link text-reset text-decoration-none">
            {name}
          </Link>
        </Card.Title>

        <Card.Subtitle className="small text-body-secondary fw-normal mb-3">
          {role} · {company}
        </Card.Subtitle>

        <Card.Text className="mb-0">{topic}</Card.Text>
      </Card.Body>

      <Card.Footer className="bg-transparent d-flex flex-wrap gap-3 small text-body-secondary">
        <span className="d-inline-flex align-items-center gap-2">
          <Icon src="/icons/icon-calendar.svg" size={16} />
          {date}
        </span>
        <span className="d-inline-flex align-items-center gap-2">
          <Icon src="/icons/icon-location.svg" size={16} />
          {hall}
        </span>
      </Card.Footer>
    </Card>
  );
}

SpeakerCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  photoRetina: PropTypes.string,
  date: PropTypes.string.isRequired,
  hall: PropTypes.string.isRequired,
};

export default SpeakerCard;
