import { useEditor } from '@tiptap/react';
import { Button, Input, Textarea, ThemeType } from 'basicui';
import { ArticleType, ArticleViewBodyChildWidget, ArticleViewMetadataChildWidget, ArticleViewTitleChildWidget, ArticleViewWidget, AuthorProfile } from 'reach';
import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getEditorConfig } from '../../utils/EditorUtils';

import {
    Editor,
    Bold,
    Italic,
    Strikethrough,
    Underline as UnderlineComponent,
    HeadingDropdown,
    AlignmentDropdown,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    AddImage,
    AddTable,
    AddYoutubeVideo,
    BlockQuote,
    BulletList,
    ClearFormatting,
    Code,
    CodeBlock,
    FontColor,
    HighlightColor,
    HorizontalRule,
    OrderedList
} from 'writeup';
import EditorComponent from '../EditorComponent';
import { categories } from '../Home/data/CategoryData';
import { getPostById } from '../ViewPost/service';
import { updatePost } from './service';
import './style.scss';

const EditPost = () => {
    const editor = getEditorConfig();
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
            getPostById(params.id).then((data: any) => {
                setState(data);
                // editor?.commands.setContent(data.description)
            });
        }
    }, [params, authorization]);

    useEffect(() => {
        console.log("***");
        editor?.commands.setContent(state.description)
    }, [state.description]);

    const save = () => {
        if (params.id) {
            updatePost(params.id, { ...state, description: editor?.getHTML() }).then((data) => console.log(data));
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
                {/* <Textarea rows={5} value={state.description} name="description" label='Body' onInput={handleChange} /> */}
                <Editor editor={editor}>
                    <Bold editor={editor} />
                    <Italic editor={editor} />
                    <UnderlineComponent editor={editor} />
                    <Strikethrough editor={editor} />
                    <AlignLeft editor={editor} />
                    <AlignCenter editor={editor} />
                    <AlignRight editor={editor} />
                    <AlignJustify editor={editor} />
                    <HeadingDropdown editor={editor} />
                    <AlignmentDropdown editor={editor} />
                    <BulletList editor={editor} />
                    <OrderedList editor={editor} />
                    <BlockQuote editor={editor} />
                    <Code editor={editor} />
                    <CodeBlock editor={editor} />
                    <FontColor editor={editor} />
                    <HighlightColor editor={editor} />
                    <HorizontalRule editor={editor} />
                    <ClearFormatting editor={editor} />
                    <AddImage editor={editor} imageUploadMethod="POST" imageUploadParam='file'
                        imageUploadURL={`${process.env.REACT_APP_API_URL}/upload`} />
                    <AddTable editor={editor} />
                    <AddYoutubeVideo editor={editor} />
                </Editor>
                <div className="edit-post__action-bar">
                    <Button onClick={save} theme={ThemeType.primary}>Save changes</Button>
                    <Button onClick={cancel}>Cancel</Button>
                </div>
            </form>
        </div>)
}

export default EditPost;