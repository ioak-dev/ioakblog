import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea, ThemeType } from 'basicui'
import './style.scss';
import { ArticleType } from 'reach';
import { createPost } from './service';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface Props {
}
const Newpost = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);

  const [state, setState] = useState<ArticleType.Article>({
    title: "", description: "", views: 0, createdBy: "1", helpful: 0, notHelpful: 0, id: "", updatedBy: "", tags: [],
    featuredImage: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  });

  const handleChange = (event: any) => {
    setState({...state, [event.currentTarget.name]: event.currentTarget.value});
  }

  const save = () => {
    console.log(state);
    createPost(state, authorization).then((data) => console.log(data))
  }

  const cancel = () => {
    navigate(-1);
  }

  return (
    <div className="newpost">
      <form>
        <Input value={state.title} name="title" label='Title' onInput={handleChange} />
        <Input value={state.featuredImage} name="featuredImage" label='Feature image' onInput={handleChange} />
        <Textarea rows={5} value={state.description} name="description" label='Body' onInput={handleChange} />
        <div className="newpost__action-bar">
          <Button onClick={save} theme={ThemeType.primary}>Create post</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default Newpost;
