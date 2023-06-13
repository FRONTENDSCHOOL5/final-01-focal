import React from 'react';
import UserFollowListItem from '../components/UserItem/UserFollowListItem';
import UserSearchListItem from '../components/UserItem/UserSearchListItem';

export default function FollowingsPage() {
  const user = { accountname: 'eunsu2201', username: '은수' };

  return (
    <>
      <UserFollowListItem user={user} />
      <UserSearchListItem user={user} />
    </>
  );
}
