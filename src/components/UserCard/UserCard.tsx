import React, { FC, useState } from 'react';
import { User } from '../../types';
import { getTimer } from '../../utils/utils';
import classNames from 'classnames';
import HelmetIcon from '../HelmetIcon/HelmetIcon';
import css from './UserCard.module.css';

const UserCard:FC<User> = ({ color, name, speed, time }) => {

  const [isUserSelected, setIsUserSelected] = useState(false);
  const timer = getTimer(time);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsUserSelected(!isUserSelected);
  };

  const rootClasses = classNames(css.root, {
    [css.selected]: isUserSelected,
  });

  return (
    <div className={rootClasses} onClick={handleClick}>
      <div className={css.avatarWrapper}>
        <HelmetIcon color={color} />
      </div>
      <div className={css.rightSection}>
        <h3 className={css.userName} title={name}>
          {name}
        </h3>
        <div className={css.resultsWrapper}>
          <p>{timer}</p>
          <p>{speed} km/h</p>
        </div>
      </div>
    </div>
  )
};

export default UserCard;
