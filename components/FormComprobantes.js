import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import {useQuery} from "react-query"



const fetchCfdiRequest = async(Cfdi1)=>{
  const data2={Otro:Cfdi1}
  const response= await fetch('./api/bases/ObtenerCfdi',{
      body:JSON.stringify(data2),
      method:'POST',
      headers:{
          'Content-Type':'application/json',
      },
  })
  const data= await response.json()
  const {Cfdi}=data;
  return Cfdi
}

const fetchFormasRequest = async()=>{
  const response= await fetch('./api/bases/Obtenerformas2',{
      body:JSON.stringify(''),
      method:'POST',
      headers:{
          'Content-Type':'application/json',
      },
  })
  const data= await response.json()
  const {formas}=data;
  return formas
}


export default function FormComprobantes({handleparcialidad,handleimporte,handleformadepago,handleusocfdi,handleselectcomprobante,agregarComprobante,handlecomprobanteinput,guardarComprobante,contador,Comprobanteimporte,Comprobanteformadepago,Comprobantecfdi,Comprobantenumerodeparcialidad,Comprobantenombre}) {
  
  
  const importe=Comprobanteimporte
  const formadepago=Comprobanteformadepago
  const usocfdi=Comprobantecfdi
  const numeroparcialidad=Comprobantenumerodeparcialidad
  const comprobante=Comprobantenombre

  const {data: Cfdi1}=useQuery(["Cfdi",usocfdi],fetchCfdiRequest) 
  const {data:ListaFormas1}=useQuery(["Formas2"],fetchFormasRequest)

  var ListaFormas=[]
  if(ListaFormas1){
      for(let Forma of ListaFormas1){
          ListaFormas.push(Forma)
        }
  }

  const listaCfdi=[]
  if(Cfdi1){
    for(let Cfdi of Cfdi1){
      listaCfdi.push(Cfdi)
    }
  }
  const tamanoh=450
  var auxiliararreglo=[]
  for(var i=0; i<contador;i++){
    auxiliararreglo.push(i)
  }
  
  
  return (
    <div>
      <Paper elevation={24} sx={{bgcolor: "#e1f5fe"}}>        
        {auxiliararreglo.map((auxiliar,i)=>{
          return(
          <div key={"Comprobante"+i}>
            <Box  sx={{padding:3}}>
              <Typography component="h1" variant="h5">
              Información del comprobante {i+1}
              </Typography>
              <br/>
              <FormControl sx={{ width: tamanoh }}>
              <Autocomplete value={comprobante[i]} onChange={handleselectcomprobante(i)} onInputChange={handlecomprobanteinput(i)}  id="combo-box-demo" options={[]} renderInput={(params) => (
                  <><TextField {...params}InputLabelProps={{ shrink: true }}  label="Comprobante" value="Comprobante"/></>)}
              />{" "}
            
              </FormControl>
              <br/>
              <br/>
              <FormControl sx={{ width: tamanoh}}>
              <Autocomplete defaultValue={'1'} value={numeroparcialidad[i]}  onChange={handleparcialidad(i)}  disablePortal  id="EmisorAuto" options={['1','2','3','4','5']}  renderInput={(params) => <TextField {...params} label="Numero de parcialidad"/>}/><br/>
              </FormControl>
              <br/>
              <FormControl sx={{ width: tamanoh }}>
                <InputLabel  id="uso-CFDI">Uso de CFDI</InputLabel>
                <Select  value={usocfdi[i]} label="Uso de CFDI" onChange={handleusocfdi(i)}>
                {listaCfdi.map(aux=>{
                  
                  return(
                      <MenuItem value={aux.cfdi_clave} key={aux.cfdi_clave+i}>{aux.cfdi_clave} - {aux.cfdi_descripcion}</MenuItem>
                  )
                })
                }
                </Select>
              </FormControl>
              <br/>
              <br/>
              <FormControl sx={{ width: tamanoh }} id="forma-pago">
                <InputLabel>Forma de Pago</InputLabel>
                <Select  value={formadepago[i]} label="Forma de Pago" onChange={handleformadepago(i)}>
                {ListaFormas.map(aux2=>{
                  
                  return(
                      <MenuItem value={aux2.forma_clave} key={aux2.forma_clave+i}>{aux2.forma_clave} - {aux2.forma_tipo}</MenuItem>
                  )
                })
                }
       
                </Select>
              </FormControl>
              <br/>
              <br/>
            
              <FormControl sx={{ width: tamanoh }} id="importe">
              <TextField value={importe[i]} type="number"  onChange={handleimporte(i)} label="Monto Aplicable" ></TextField><br/>
              </FormControl>
            </Box>
          </div>
          )
        })}
        <Box sx={{padding:3}}>
        <Button variant="contained"  color="primary" onClick={agregarComprobante('boton')} >Agregar Comprobante</Button>
        </Box>
      </Paper>
    </div>
  );
}