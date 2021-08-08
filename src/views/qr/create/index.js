import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { set, get } from "../../../views/add/add-medicine/Items";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CContainer,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import QRcode from "qrcode.react";
import { Fab, TextField, TextareaAutosize, Grid } from "@material-ui/core";
import { ArrowBack, GetApp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Index = () => {
  var data = get();
  const [qr, setQr] = useState("CryptoMedTrack");
  const handleChange = (event) => {
    setQr(event.target.value);
  };
  const classes = useStyles();
  const [state, setState] = React.useState("");

  const handleChange2 = (event) => {
    const name = event.target.name;
    setState(event.target.value);
  };
  const downloadQR = () => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "myqr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <CCard>
      <CCardBody>
        <center>
          <div>
            <CContainer>
              <CRow>
                <CCol sm="12">
                  <CForm action="" method="post">
                    <CFormGroup>
                      <CLabel htmlFor="nf-email">
                        <span className="display-3">Create Tag</span>
                      </CLabel>
                      <CFormGroup>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <InputLabel htmlFor="outlined-age-native-simple">
                            Name
                          </InputLabel>
                          <Select
                            native
                            value={state.age}
                            onChange={handleChange2}
                            label="Age"
                            inputProps={{
                              name: "age",
                              id: "outlined-age-native-simple",
                            }}
                          >
                            <option aria-label="None" value="" />
                            {data !== undefined &&
                              data.map((element) => {
                                return (
                                  <option value={element[2]}>
                                    {element[0]}
                                  </option>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </CFormGroup>
                      <div>OR</div>

                      <CInput
                        type="text"
                        id="nf-email"
                        name="nf-email"
                        placeholder="ID . . ."
                        onChange={handleChange2}
                        value={state}
                      />
                      <CFormText className="help-block">
                        Enter medicine serial code
                      </CFormText>
                    </CFormGroup>
                  </CForm>
                  <div>
                    {qr ? (
                      <QRcode
                        id="myqr"
                        value={state}
                        size={320}
                        includeMargin={true}
                      />
                    ) : (
                      <p>No QR code preview</p>
                    )}
                  </div>
                  {qr ? (
                    <Grid container>
                      <Grid item xs={10}></Grid>
                      <Grid item xs={2}>
                        <Fab
                          onClick={downloadQR}
                          style={{ marginLeft: 10 }}
                          color="primary"
                        >
                          <GetApp />
                        </Fab>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </center>
      </CCardBody>
    </CCard>
  );
};

export default Index;
