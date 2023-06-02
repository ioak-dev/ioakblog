import React, { useEffect, useState } from 'react';
import './PageView.scss';
import Logo from '../Logo';
import DarkModeIcon from '../DarkModeIcon';
import { ArticleListWidget, ArticleMinimalListWidget, ArticleType, SpotlightGridWidget } from 'reach';
import { categories } from './data/CategoryData';
import { users } from './data/UserData';
import { getAllPosts, getFeaturedPosts } from './service';
import { useSelector } from 'react-redux';

interface Props {
}
const PageView = (props: Props) => {

  const [articles, setArticles] = useState<ArticleType.Article[]>([]);
  const [featuredArticle, setFeaturedArticle] = useState<ArticleType.Article | null>(null);
  const authorization = useSelector((state: any) => state.authorization);
  const users = useSelector((state: any) => state.user.users);

  useEffect(() => {
    if (authorization.isAuth) {
      getAllPosts().then((data) => {
        setArticles(data);
      });

      getFeaturedPosts().then((data) => {
        setFeaturedArticle(data);
      });
    }
  }, [authorization]);

  return (
    <div className="home-page-view">
      <div className="home-page-view__featured">
        {featuredArticle && <ArticleListWidget categories={categories} users={users} articles={[featuredArticle]} viewArticleBaseUrl={"/#/post/"} fullWidthImage backgroundFill />}
        <div className="home-page-view__featured__list">
          <h5 className="home-page-view__featured__list__title">Recent Posts</h5>
          <ArticleMinimalListWidget categories={categories} users={users} articles={articles} viewArticleBaseUrl={"/#/post/"} />
        </div>
      </div>
      <ArticleListWidget categories={categories} users={users} articles={articles} viewArticleBaseUrl={"/#/post/"} />
    </div>
  );
};

export default PageView;
