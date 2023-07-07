
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



import MDModal from 'components/MDModal';
import Add from 'layouts/Blog/add';
import Edit from 'layouts/Blog/edit';

import {sweetalertsuccess} from "../../helper/alert";


import Icon from "components/Icon";

const Tables = () => {
 
  const navigate = useNavigate();

  if (!localStorage.getItem('jwtToken')) {
    navigate('/authentication/sign-in');
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
                    

                    <button 
                    style={{padding:10}}
                    onClick={()=>{
                        navigate("/blog_list")
                    }}>
                        Back
                    </button>
                  </div>
                
              </MDBox>
              <MDBox pt={3}>
                <Add close={()=>{}} successAlert={sweetalertsuccess} loadBlogs={()=>{}} />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

    </DashboardLayout>
  );
};

export default Tables;
