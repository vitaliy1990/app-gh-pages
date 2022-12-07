import React, { FC, useEffect, useState } from 'react';
import { useStateRef } from '../../hooks/useStateRef';
import { getUsersListType, User } from '../../types';
import { users } from '../../data/users';
import UserCard from '../UserCard/UserCard';
import {ReactComponent as Loader} from '../../images/loader.svg';
import {ReactComponent as UserLoader} from '../../images/userLoader.svg';
import css from './UsersRating.module.css';

const USER_COUNT = 50;
const TIME_OUT_MS = 500;

const UsersRating:FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [usersList, setUsersList, usersListRef] = useStateRef([]);
  const [usersItems, setUsersItems, usersItemsRef] = useStateRef(0);
  const [nextUsersLoading, setNextUsersLoading, nextUsersLoadingRef] = useStateRef(false);

  useEffect(() => {
    const timer = setTimeout(getUsersList, TIME_OUT_MS);
    window.addEventListener('scroll', handleScroll as EventListener);
  
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll as EventListener);
    }
  }, []);

  const getUsersList: getUsersListType = () => {

    // mock request for users
    return new Promise<boolean>((resolve, reject) => {
      setNextUsersLoading(true);

      setTimeout(() => {
        const usersLimit = usersItemsRef.current + USER_COUNT;
        const usersProfile = users.slice(usersItemsRef.current, usersLimit);
        setUsersItems(usersLimit);
        setUsersList([...usersListRef.current, ...usersProfile]);
        resolve(true);
      }, 1000);
    })
    .then(() => {
      if (isLoading) {
        setIsLoading(false)
      }

      setNextUsersLoading(false)
    });
  };
 
  const handleScroll = (): void => {
    if (nextUsersLoadingRef.current) {
      return;
    }

    if (users.length > usersItemsRef.current) {
      const searchResultHeight: number = Math.ceil(document.documentElement.scrollHeight);
      const visibleResultHeight: number = document.documentElement.offsetHeight;
      const userScrollTop: number = document.documentElement.scrollTop;
      const userScroll: number = Math.ceil(visibleResultHeight + userScrollTop) + 50;

      if (userScroll >= searchResultHeight) {
        getUsersList();
      }
    }
  };

  const renderUsersSection: () => JSX.Element = () => {
    if (setUsersList.length) {
      return usersList?.map((user: User, index: number) => (
        <div  key={index} className={css.userCard}>
          <p>{index + 1}</p>
          <UserCard name={user?.name} color={user.color} speed={user.speed} time={user.time}  />
        </div>
      ));
    };

    return null; 
  };

  if (isLoading) {
    return (
     <div className={css.pageLoader}>
        <Loader />
     </div>
    )
  }

  return (
    <div className={css.root}>
      <div className={css.usersWrapper}>
        { renderUsersSection() }
      </div>
      <div className={css.usersLoader}>
        { nextUsersLoading && <UserLoader /> }
      </div>
    </div>
  )
};

export default UsersRating;
