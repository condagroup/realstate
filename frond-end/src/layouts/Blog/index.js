
import React,{ useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
// @mui material components
import { Grid, Card } from '@mui/material';
// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import {categories} from 'layouts/Blog/functions'


import MDModal from 'components/MDModal';
import Add from 'layouts/Blog/add';
import Edit from 'layouts/Blog/edit';

import {sweetalertsuccess} from "../../helper/alert";
import axios from 'axios';
import { apiConstants } from 'API/apiConstrants';

import Icon from "components/Icon";

const Tables = () => {
  const [open_add,set_open_add]=useState(false)
  const [open_edit,set_open_edit]=useState(false);
  const [data,set_data]=useState(null)
  const [selected_blog,set_selected_blog]=useState(null);

  const navigate = useNavigate();

  if (!localStorage.getItem('jwtToken')) {
    navigate('/authentication/sign-in');
  }

 
  useEffect(()=>{
    loadBlogs()
  },[])

  const loadBlogs = async () => {
    const result = await axios.get(apiConstants.BLOG, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });
    set_data(result.data)
  };
  
  const delete_blog=async (blog)=>{
    const rep=window.confirm("You are about to delete this blog");
    if(rep==false) return;
    let res=await fetch(apiConstants.DELETE_BLOG+"?id="+blog.id)
    res=await res.json()
    sweetalertsuccess(res.message)
    loadBlogs();
  }

  const edit_blog=async (blog)=>{
    set_selected_blog(blog)
    set_open_edit(true)
  }
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={0}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
               
                >
                  <div style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                  }}>
                    <MDTypography variant="h6" color="white">
                      Blog
                    </MDTypography>

                    <button 
                    style={{padding:10}}
                    onClick={()=>{
                      navigate("/blog_add")
                    }}>
                        Add
                    </button>
                  </div>
                
              </MDBox>
              <MDBox pt={3}>
                {
                  data?.map((item,i)=>{
                    let bg=""
                    if(i%2==0){
                      bg="bg-gray-100"
                    }

                    let cat_name=categories?.filter((cat)=>{
                      return cat.id==item?.category;
                    })[0]?.title ?? '-'
                    return <div key={item?.id} 
                    className={`flex m-1 cursor-pointer hover:bg-blue-50 p-1 text-sm ${bg}`}>
                      <div className="flex flex-1 gap-2">
                        <p>{item?.id}</p>
                        <p className="w-[150px]">{cat_name}</p>
                        <p className="flex-1">{item?.title}</p>
                        <p className="flex-1" dangerouslySetInnerHTML={{__html:item?.description}}/>
                        </div>
                      <div className='flex items-center gap-2'>
                        <button title="Edit" onClick={edit_blog.bind(this,item)}>
                          <Icon name="create-outline"  style={{fontSize:"24px"}} />
                        </button>
                        <button title="Delete" onClick={delete_blog.bind(this,item)}>
                          <Icon name="trash-outline"  style={{fontSize:"24px",color:"indianred"}} />
                        </button>
                        
                      </div>
                    </div>
                  })
                }
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

        {open_add==true && <MDModal 
          should_open={true} 
          content={<Add 
            close={()=>{set_open_add(false)}} 
            successAlert={sweetalertsuccess} 
            loadBlogs={loadBlogs}/>}
          close={()=>set_open_add(false)}
        />}

      {open_edit==true && <MDModal 
          should_open={true} 
          content={<Edit 
            blog={selected_blog}
            close={()=>{set_open_edit(false)}} 
            successAlert={sweetalertsuccess} 
            loadBlogs={loadBlogs}/>}
          close={()=>set_open_edit(false)}
        />}
      
    </DashboardLayout>
  );
};

export default Tables;
