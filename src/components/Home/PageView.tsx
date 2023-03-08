import React, { useEffect, useState } from 'react';
import './PageView.scss';
import Logo from '../Logo';
import DarkModeIcon from '../DarkModeIcon';
import { ArticleListWidget, ArticleType } from 'reach';
import { categories } from './data/CategoryData';
import { users } from './data/UserData';
import { getAllPosts } from './service';
import { useSelector } from 'react-redux';

interface Props {
}
const PageView = (props: Props) => {

  const [articles, setArticles] = useState<ArticleType.Article[]>([]);
  const authorization = useSelector((state: any) => state.authorization);
  const users = useSelector((state: any) => state.user.users);

  useEffect(() => {
    if (authorization.isAuth) {
      getAllPosts().then((data) => {
        console.log("((", data);
        setArticles(data);
      });
    }
  }, [authorization]);

  useEffect(() => {
    console.log(users)
  }, [users]);

  return (
    <div className="home-page-view">
      <ArticleListWidget categories={categories} users={users} articles={articles} viewArticleBaseUrl={"/#/post/"}/>
    </div>
  );
};

export default PageView;
