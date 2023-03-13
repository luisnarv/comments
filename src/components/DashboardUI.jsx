import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileUI from "./ProfileUI";
import Grid from "@mui/material/Grid";
import CategoriesUI from "./CategoriesUI";
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import SamplesUI from "./SamplesUI";

export default function DashboardUI() {
  const role = useSelector((state) => state.role);

  const [option,setOption] = useState()

  let options = [];
  const userOptions = ["orders", "payments"];
  const adminOptions = ["categories","samples" ];

  if (role === "ADMIN") {
    options = adminOptions;
  }else{
    options = userOptions;
  }

  return (
    <Grid container direction="row" sx={{margin:2}}>
        <Grid container direction="column" sx={{width: 360}}>
          <ProfileUI />
          {options.includes("orders") ? <Button onClick={()=>{setOption("orders")}}>Ordenes</Button> : null}
          {options.includes("payments") ? <Button onClick={()=>{setOption("payments")}}>Pagos</Button> : null}
          {options.includes("categories") ? <Button onClick={()=>{setOption("categories")}}>Categorias</Button> : null}
          {options.includes("samples") ? <Button onClick={()=>{setOption("samples")}}>Muestras</Button> : null}
        </Grid>
        <Paper sx={{width: 600, height: 600, overflowX:"hidden", overflowY:"auto", marginLeft: 2}}>
            {option==="orders"?"Ordenes":null}
            {option==="payments"?"Pagos":null}
            {option==="categories"?<CategoriesUI/>:null}
            {option==="samples"?<SamplesUI/>:null}
        </Paper>
    </Grid>
  );

}
