import { Button, Input, Textarea, ThemeType } from 'basicui';
import { ArticleType, ArticleViewBodyChildWidget, ArticleViewMetadataChildWidget, ArticleViewTitleChildWidget, ArticleViewWidget, AuthorProfile } from 'reach';
import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { categories } from '../Home/data/CategoryData';
import { getPostById } from '../ViewPost/service';
import { updatePost } from './service';
import './style.scss';

const EditPost = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [state, setState] = useState<ArticleType.Article>({
        title: "", description: "", views: 0, createdBy: "1", helpful: 0, notHelpful: 0, id: "", updatedBy: "", tags: [],
        featuredImage: ""
    });
    const authorization = useSelector((state: any) => state.authorization);
    const users = useSelector((state: any) => state.user.users);

    useEffect(() => {
        if (params.id && authorization.isAuth) {
            getPostById(params.id).then((data: any) => setState(data));
        }
    }, [params, authorization]);

    const save = () => {
        if (params.id) {
            updatePost(params.id, state).then((data) => console.log(data));
        }
    }

    const cancel = () => {
        navigate(-1);
    }

    const handleChange = (event: any) => {
        setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
    }

    return (
        <div className="edit-post">
            <form>
                <Input value={state.title} name="title" label='Title' onInput={handleChange} />
                <Input value={state.featuredImage} name="featuredImage" label='Feature image' onInput={handleChange} />
                <Textarea rows={5} value={state.description} name="description" label='Body' onInput={handleChange} />
                <div className="edit-post__action-bar">
                    <Button onClick={save} theme={ThemeType.primary}>Save changes</Button>
                    <Button onClick={cancel}>Cancel</Button>
                </div>
            </form>
        </div>)
}

export default EditPost;