import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea, ThemeType } from 'basicui'
import './style.scss';
import { ArticleType } from 'reach';
import { createPost } from './service';

interface Props {
}
const Newpost = (props: Props) => {

  const [state, setState] = useState<ArticleType.Article>({
    title: "", description: "", views: 0, createdBy: "1", helpful: 0, notHelpful: 0, id: "", updatedBy: "", tags: []
  });

  const handleChange = (event: any) => {
    setState({...state, [event.currentTarget.name]: event.currentTarget.value});
  }

  const save = () => {
    console.log(state);
    createPost(state).then((data) => console.log(data))
  }

  const cancel = () => {

  }

  return (
    <div className="newpost">
      <form>
        <Input value={state.title} name="title" label='Title' onInput={handleChange} />
        <Textarea value={state.description} name="description" label='Body' onInput={handleChange} />
        <div className="newpost__action-bar">
          <Button onClick={save} theme={ThemeType.primary}>Create post</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default Newpost;
