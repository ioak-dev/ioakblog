import React, { useEffect, useState } from 'react';
import { Input, Textarea } from 'basicui'
import './style.scss';
import { ArticleType } from 'reach';

interface Props {
}
const Newpost = (props: Props) => {

  const [state, setState] = useState<ArticleType.Article>({
    title: "", description: "", views: 0, createdBy: "1", helpful: 0, notHelpful: 0, id: "", updatedBy: "", tags: []
  });

  return (
    <div className="newpost">
      <form>
        <Input value={state.title} name="title" label='Title' />
        <Textarea value={state.description} name="description" label='Body' />
      </form>
    </div>
  );
};

export default Newpost;
