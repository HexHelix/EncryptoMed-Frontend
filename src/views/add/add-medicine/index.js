import React from "react";
import {set,get} from './Items';
import QRcode from "qrcode.react";
import { Fab, TextField, TextareaAutosize, Grid } from "@material-ui/core";
import { ArrowBack, GetApp } from "@material-ui/icons";
import "./table.css";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
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
import { ethers } from "ethers";
import SimpleStorage from "../../../contracts/SimpleStorage.json";

//         string MedicineName;
//         uint MedicineId;
//         string Patchno;
//         address Creator;
//         string Productiondate;
//         uint Rate;
//         string ManfucturerLocation;
//         string ManfucturerInfo;

const Index = () => {
  const CONTRACT_ADDRESS = SimpleStorage.networks["5777"].address;

  const [MedicineName, setMedicineName] = React.useState("");
  const [MedicineId, setMedicineId] = React.useState("");
  const [Patchno, setPatchno] = React.useState("");
  const [Productiondate, setProductiondate] = React.useState("");
  const [Rate, setRate] = React.useState("");
  const [ManfucturerLocation, setManfucturerLocation] = React.useState("");
  const [ManfucturerInfo, setManfucturerInfo] = React.useState("");
  const [load, setLoad] = React.useState(false);
  const [items, setItems] = React.useState("");
  const [medicineList, setMedicineList] = React.useState([]);
  set(medicineList);
  console.log(get());

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function setValue() {
    //setQr(numValue);
    if (MedicineName === "") return;
    if (typeof window.ethereum !== "undefined") {
      setLoad(true);
      await requestAccount();
      setLoad(false);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        SimpleStorage.abi,
        signer
      );
      const transaction = await contract.AddManf(
        Rate,
        MedicineId,
        MedicineName,
        Patchno,
        Productiondate,
        ManfucturerLocation,
        ManfucturerInfo
      );
      setMedicineName("");
      setMedicineId("");
      setPatchno("");
      setProductiondate("");
      setRate("");
      setManfucturerLocation("");
      setManfucturerInfo("");

      await transaction.wait();
      getValue();
    }
  }

  async function getValue() {
    setLoad(true);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        SimpleStorage.abi,
        provider
      );

      const item = await contract.items();
      setItems(item.toNumber());

      //const myObj = JSON.parse(data);
      console.log("items: ", items);

      var a = [];

      for (let i = 0; i <= item.toNumber(); i++) {
        try {
          const data = await contract.CheckManf(i);
          //console.log(data);

          const parsedData = [
            data[0],
            data[1].toNumber(),
            data[2],
            data[3],
            data[4],
            data[5].toNumber(),
            data[6],
            data[7],
          ];
          if (data[1].toNumber() !== 0) a = [...a, parsedData];
          console.log(a);

          //const myObj = JSON.parse(data);
          //console.log("items: ", items.toNumber());
          //console.log("data: ", data[0].toNumber(), data[1]);
          //console.log(medicineList)
        } catch (err) {
          console.log("Error: ", err);
        }
      }
      setMedicineList(a);
    }
    setLoad(false);
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <h2 className="row justify-content-md-center">
            Enter medicine to BlockChain{" "}
            <CIcon size={"xl"} name={"cil-credit-card"} />
          </h2>
        </CCardHeader>
        <CCardBody>
          <CForm
            action=""
            method="post"
            encType="multipart/form-data"
            className="form-horizontal"
          >
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Medicine Name</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Medicine Name"
                  onChange={(e) => setMedicineName(e.target.value)}
                  value={MedicineName}
                  type="text"
                  required
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">MedicineId</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="MedicineId"
                  onChange={(e) => setMedicineId(e.target.value)}
                  value={MedicineId}
                  type="number"
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Patch no</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Patch no"
                  onChange={(e) => setPatchno(e.target.value)}
                  value={Patchno}
                  type="text"
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">Production Date</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="date"
                  id="date-input"
                  name="date-input"
                  placeholder="date"
                  onChange={(e) => {
                    setProductiondate(e.target.value);
                  }}
                  value={Productiondate}
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Rate</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Rate"
                  onChange={(e) => setRate(e.target.value)}
                  value={Rate}
                  type="number"
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Manufacture Location</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Location"
                  onChange={(e) => setManfucturerLocation(e.target.value)}
                  value={ManfucturerLocation}
                  type="text"
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="textarea-input">Manufacture Info</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CTextarea
                  name="textarea-input"
                  id="textarea-input"
                  rows="3"
                  placeholder="Content..."
                  onChange={(e) => setManfucturerInfo(e.target.value)}
                  value={ManfucturerInfo}
                  type="text"
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel>Upload Licence</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInputFile
                  id="file-multiple-input"
                  name="file-multiple-input"
                  multiple
                  custom
                />
                <CLabel htmlFor="file-multiple-input" variant="custom-file">
                  Choose Files...
                </CLabel>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>

        <CCardFooter>
          <Button variant="contained" color="primary" onClick={setValue}>
            <CIcon name="cil-scrubber" /> Submit
          </Button>
          <Button variant="contained" color="secondary"
            type="reset"
            
            onClick={() => {
              setMedicineName("");
              setMedicineId("");
              setPatchno("");
              setProductiondate("");
              setRate("");
              setManfucturerLocation("");
              setManfucturerInfo("");
            }}
          >
            <CIcon name="cil-ban" /> Reset
          </Button>
        </CCardFooter>
      </CCard>
      <CCard>
        <CCardHeader>
          <CButton type="submit" size="sm" color="info" onClick={getValue}>
            <CIcon name="cil-scrubber" /> Refresh Table
          </CButton>
          <h2 className="row justify-content-md-center">View Medicine</h2>
        </CCardHeader>
        <CCardBody>
          <table className="fl-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Medicine Id</th>
                <th>Patch no</th>
                <th>Manufacture Account ID</th>
                <th>Production Date</th>
                <th>Rate</th>
                <th>Manfucturer Location</th>
                <th>Manfucturer Info</th>
                <th>QR Code</th>
              </tr>
            </thead>
            {medicineList.map((med, key) => {
              return (
                <tr>
                  <td key="{med[0]}">
                    <Typography variant="button" display="block" gutterBottom>
                      {med[0]}
                    </Typography>
                  </td>
                  <td key="{med[1]}"><Typography variant="button" display="block" gutterBottom>
                  {med[1]}
                </Typography></td>
                  <td key="{med[2]}"><Typography variant="button" display="block" gutterBottom>
                  {med[2]}
                </Typography></td>
                  <td key="{med[3]}">
                    <CButton block variant="outline" color="success">
                      {med[3]}
                    </CButton>
                  </td>
                  <td key="{med[4]}"><CButton  block variant="outline" color="info">{med[4]}</CButton></td>
                  <td key="{med[5]}">{med[5]}</td>
                  <td key="{med[6]}">{med[6]}</td>
                  <td key="{med[7]}">{med[7]}</td>
                  <td>
                    <QRcode
                      id={med[2]}
                      value={med[2].toString()}
                      size={50}
                      onClick={() => {
                        const canvas = document.getElementById(med[2]);
                        const pngUrl = canvas
                          .toDataURL("image/png")
                          .replace("image/png", "image/octet-stream");
                        let downloadLink = document.createElement("a");
                        downloadLink.href = pngUrl;
                        downloadLink.download = "myqr.png";
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                      }}
                      includeMargin={true}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Index;
