import React, { useEffect, useState } from 'react';
import './PageView.scss';
import Logo from '../Logo';
import DarkModeIcon from '../DarkModeIcon';
import { ArticleListWidget } from 'reach';
import { categories } from './data/CategoryData';
import { users } from './data/UserData';
import { articles } from './data/ArticlesData';

interface Props {
}
const PageView = (props: Props) => {

  return (
    <div className="home-page-view">
      <ArticleListWidget categories={categories} users={users} articles={articles} />
    </div>
  );
};

export default PageView;
