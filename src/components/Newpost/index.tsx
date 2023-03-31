import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea, ThemeType } from 'basicui'
import './style.scss';
import { ArticleType } from 'reach';
import { createPost } from './service';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

interface Props {
}
const Newpost = (props: Props) => {
  const editor = getEditorConfig();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);

  const [state, setState] = useState<ArticleType.Article>({
    title: "", description: "", views: 0, createdBy: "1", helpful: 0, notHelpful: 0, id: "", updatedBy: "", tags: [],
    featuredImage: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  });

  const handleChange = (event: any) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  }

  const save = () => {
    createPost({ ...state, description: editor?.getHTML() }, authorization).then((data) => console.log(data))
  }

  const cancel = () => {
    navigate(-1);
  }

  return (
    <div className="newpost">
      <form>
        <Input value={state.title} name="title" label='Title' onInput={handleChange} />
        <Input value={state.featuredImage} name="featuredImage" label='Feature image' onInput={handleChange} />
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
        <div className="newpost__action-bar">
          <Button onClick={save} theme={ThemeType.primary}>Create post</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default Newpost;
