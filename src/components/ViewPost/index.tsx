import { Button } from 'basicui';
import { ArticleType, ArticleViewBodyChildWidget, ArticleViewMetadataChildWidget, ArticleViewTitleChildWidget, ArticleViewWidget, AuthorProfile } from 'reach';
import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { categories } from '../Home/data/CategoryData';
import { getPostById } from './service';
import './style.scss';

const ViewPost = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState<ArticleType.Article>();
    const authorization = useSelector((state: any) => state.authorization);
    const users = useSelector((state: any) => state.user.users);

    useEffect(() => {
        if (params.id && authorization.isAuth) {
            getPostById(params.id).then((data: any) => setPost(data));
        }
    }, [params, authorization]);

    const goToEditPage = () => {
        navigate(`/post/${params.id}/edit`);
    }

    return (<>
        {post && <div className='view-post'>
            <div>
                <ArticleViewWidget article={post} categories={categories} users={users}>
                    <ArticleViewMetadataChildWidget>
                        <Button onClick={goToEditPage}>Edit post</Button>
                    </ArticleViewMetadataChildWidget>
                    <ArticleViewTitleChildWidget />
                    <ArticleViewBodyChildWidget />
                </ArticleViewWidget>
            </div>
            <div>
                <AuthorProfile user={users.find((item: any) => item.id === post.createdBy)} />
            </div>
        </div>}
    </>)
}

export default ViewPost;