import { apiConstants } from 'API/apiConstrants';
import React, { useState } from 'react';
import {setReadingTime,categories} from 'layouts/Blog/functions';

import CKEditor from 'components/CKEditor/index';


function AddBlogForm({close,successAlert,loadBlogs}) {
  const [picture, setPicture] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [section, setSection] = useState('');
  const [readTime, setReadTime] = useState('');
  const [file,set_file]=useState(null);
  const [sending,set_sending]=useState(false)
  const [categorie,set_categorie]=useState(1)
  const [tags,set_tags]=useState("")

  const  handleSubmit=async (event) =>{
    event.preventDefault();
    set_sending(true)
  
    let method;
    method = 'POST';
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    
    
    var fd=new FormData()
    fd.append('picture',file)
    fd.append('title',title)
    fd.append('description',description)
    fd.append('section',section)
    fd.append('readTime',readTime)
    fd.append("categorie",categorie)
    fd.append("tags",tags)

    var requestOptions = {
      method: method,
      body: fd
    };

    console.log("the data is ",fd)

    fetch(apiConstants.ADD_BLOG, requestOptions).then(async (response) => {
        const res=await response.json();
        console.log("the response is",res)
        setPicture('');
        setTitle('');
        setDescription('');
        setSection('');
        setReadTime('');
        set_categorie('')
        set_tags('')
        close()
        successAlert("Hi it is done")
        loadBlogs()
        set_sending(false)
    })

    
    
  }

  function handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === 'picture') {
      setPicture(value);
    } else if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
      const {time}=setReadingTime(value)
      setReadTime(time);
    } else if (name === 'section') {
      setSection(value);
    }
  }

  const file_changed=(event)=>{
    const files=event.target.files;
    if(files.length==0) return;

    const file=files[0];
    set_file(file)
  }

  const description_changed=(text)=>{
    setDescription(text)
    const {time}=setReadingTime(text)
    setReadTime(time);
  }

  const section_changed=(text)=>{
    setSection(text)
  }

  

  return (
    <div className="ml-4 mr-4">
<form onSubmit={handleSubmit} className="text-sm">
      

      <div className="flex flex-col mb-4">
        <label htmlFor="picture" className="font-bold">Category:</label>
        <select className="p-2 bg-white border"
        value={categorie}
        onChange={(e)=>set_categorie(e.target.value)}
        >
          <option value="">Please chose a category</option>
          {categories?.map((item)=>{
            return (
              <option key={item?.id} value={item?.id}>{item?.title}</option>
            )
          })}
        </select>
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="picture" className="font-bold">Picture:</label>
        <input
            type="file"
            id="picture"
            name="picture"
            onChange={file_changed}
        />
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="title" className="font-bold">Title:</label>
        <input
            className='border p-1 outline-none'
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleInputChange}
        />
      </div>
      
        <div className="flex flex-col mb-4">
        <label htmlFor="description" className="font-bold">Blog description:</label>
       

        <CKEditor
            value={description}
            changed={description_changed}  
        />
        </div>
      
        <div className="flex flex-col mb-4">
        <label htmlFor="section" className="font-bold">Section:</label>
        <CKEditor
            value={section}
            changed={section_changed}  
        />
        </div>

        <div className="flex flex-col mb-4">
        <label htmlFor="title" className="font-bold">Tags:</label>
        <input
            className='border p-1 outline-none'
            type="text"
            id="tags"
            name="tags"
            placeholder='tag1,tag2,tag3,...'
            value={tags}
            onChange={(e)=>{set_tags(e.target.value)}}
        />
      </div>
      
        <div className="flex flex-col mb-4">
        <label htmlFor="read-time" className="font-bold">Read time:</label>
        <input
            className='border-none p-1 outline-none'
            type="text"
            id="read-time"
            name="read-time"
            value={readTime}
            readOnly
        />
        </div>
      
        <div className='flex justify-end'>
        <button type="submit"
        disabled={sending}
        className="bg-blue-500 p-2 w-[100px] rounded-md hover:opacity-80 cursor-pointer text-white font-bold"
        >
          {sending==true ? 'Wait...':'Add'}
        </button>
        </div>
      
    </form>
    </div>
    
  );
}

export default AddBlogForm;
