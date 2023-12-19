import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@material-ui/core";
import styles from '../../style.module.css';

import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import axios from 'axios'


const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#ffffff7a',
    },
  },
}))(Button);




export const ImageUpload = (prop) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState('potato');
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  

  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);

      let res = await axios.post(process.env.REACT_APP_API_URL+selectedPlant, formData);
      if (res.status === 200) {
        console.log("OK!");
        setData(res.data);
        // console.log(res.data);
      }
      setIsloading(false);
    }
  }

  const handleMapClick = (event) => {
    setCoordinates(prop);
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
  
    
    <div className={styles.DropImage}>
        <div className={classes.mainContainer}>
            <Grid item xs={12}>
              {!image &&
              <div className={styles.choosePlant}>
                <div className={styles.plant} onClick={() => setSelectedPlant('potato')}>
                  <p>POTATO</p>
                </div>
                <div className={styles.plant} onClick={() => setSelectedPlant('tomato')}>
                  <p>TOMATO</p>
                </div>
                <div className={styles.plant} onClick={() => setSelectedPlant('pepper')}>
                  <p>PEPPER</p>
                </div>
              </div>}
              <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
                {image && <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={preview}
                    component="image"
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
                }
                {!image && <CardContent className={classes.content}>
                  <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText={"Drag and drop an image of a "+ selectedPlant +" plant leaf to process"}
                    onChange={onSelectFile}
                  />
                </CardContent>}
                {data && <CardContent className={classes.detail}>
                  <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} size="small" aria-label="simple table">
                      <TableHead className={classes.tableHead}>
                        <TableRow className={classes.tableRow}>
                          <TableCell className={classes.tableCell1}>Label:</TableCell>
                          <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className={classes.tableBody}>
                        <TableRow className={classes.tableRow}>
                          <TableCell component="th" scope="row" className={classes.tableCell}>
                            {data.class}
                          </TableCell>
                          <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>}
                {isLoading && <CardContent className={classes.detail}>
                  <CircularProgress color="secondary" className={classes.loader} />
                  <Typography className={classes.title} variant="h6" noWrap>
                    Processing
                  </Typography>
                </CardContent>}
              </Card>
            

            {data &&
              <Grid item className={classes.buttonGrid} >

                <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                  Clear
                </ColorButton>
              </Grid>}
          </Grid >
        </div >
        {image &&
        <div className={styles.mainlocation}>
            <div className={styles.location}>
                <label for="Name">latitude:</label>
                <input type="text" name="latitude" value={coordinates.lat} onChange={(e) => setCoordinates({ ...coordinates, lat: e.target.value })} />
                <label for="Name">longitude:</label>
                <input type="text" name="longitude" value={coordinates.lng} onChange={(e) => setCoordinates({ ...coordinates, lng: e.target.value })} />
            </div>
            <div className={styles.locabox}>
                <div className={styles.loca} onClick={handleMapClick}>
                    <p>Choose from map</p>
                </div>
                <div className={styles.loca}>
                    <p>OK!</p>
                </div>
            </div>
        </div>}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "100%",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '300',
    width: '500',
  },
  imageCard: {
    margin: "auto",
    maxWidth: '100%',
    height: '80%',
    backgroundColor: 'transparent',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  imageCardEmpty: {
    height: 'auto',

  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '20px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  text: {
    color: 'white !important',
    textAlign: 'center',
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbar: {
    background: '#be6a77',
    boxShadow: 'none',
    color: 'white'
  },
  loader: {
    color: '#be6a77 !important',
  }
}));