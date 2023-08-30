import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PostCard from '../Common/PostCard/PostCard';
import { feedAPI } from '../../api/apis/post';

const Feed = styled.section`
  height: 100%;

  & > article {
    padding-bottom: 40px;
  }
`;

const Target = styled.div`
  height: 1px;
`;

export default function PostsFeed({
  setIsLoading,
  setPostDatas,
  postDatas,
  openMenu,
  setPostId,
}) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const contentRef = useRef(null);
  const LIMIT_VALUE = 10;

  useEffect(() => {
    const getInitialPosts = async () => {
      const posts = await feedAPI(LIMIT_VALUE, 0);
      setPostDatas(posts);
      setIsLoading(false);
    };
    getInitialPosts();
  }, []);

  const getMorePosts = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    const newPosts = await feedAPI(LIMIT_VALUE, page * LIMIT_VALUE);
    if (newPosts.length === 0) return;
    setPostDatas((prevPosts) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
    setIsLoadingMore(false);
  };

  const handleScroll = (entries) => {
    if (entries[0].isIntersecting && entries[0].intersectionRatio > 0) {
      getMorePosts();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.5,
    });
    if (contentRef.current && !isLoadingMore) {
      observer.observe(contentRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [contentRef.current, isLoadingMore]);
  return (
    <Feed>
      {postDatas.length > 0 &&
        postDatas.map((data) => (
          <PostCard
            key={data.id}
            post={data}
            setIsMenuOpen={openMenu}
            setPostId={setPostId}
          />
        ))}
      <Target ref={contentRef}></Target>
    </Feed>
  );
}