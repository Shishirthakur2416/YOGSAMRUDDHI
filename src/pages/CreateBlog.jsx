import React from 'react';
import BlogForm from '../components/BlogForm';

function CreateBlog() {
  return (
    <div>
      <BlogForm isEdit={false} data={{}} />
    </div>
  );
}

export default CreateBlog;
