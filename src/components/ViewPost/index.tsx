import { Button } from 'basicui';
import { ArticleType, ArticleViewBodyChildWidget, ArticleViewMetadataChildWidget, ArticleViewTitleChildWidget, ArticleViewWidget } from 'reach';
import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { categories } from '../Home/data/CategoryData';
import { getPostById } from './service';
import './style.scss';

const ViewPost = () => {

    const params = useParams();
    const [post, setPost] = useState<ArticleType.Article>();
    const authorization = useSelector((state: any) => state.authorization);
    const users = useSelector((state: any) => state.user.users);

    useEffect(() => {
        if (params.id && authorization.isAuth) {
            getPostById(params.id).then((data: any) => setPost(data));
        }
    }, [params, authorization]);

    return (
        <div className='view-post'>
            {post && <ArticleViewWidget article={post} categories={categories} users={users}>
                <ArticleViewMetadataChildWidget />
                <ArticleViewTitleChildWidget />
                <ArticleViewBodyChildWidget />
            </ArticleViewWidget>}
        </div>)
}

export default ViewPost;