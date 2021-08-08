import React, { useState } from "react";
import { Scan } from "../../../component/Scan";
import {
  CAlert,
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import QrScan from "react-qr-reader";
import { Fab, TextareaAutosize } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { set, get } from "../../../views/add/add-medicine/Items";

const Index = () => {
  var data = get();

  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);

  const [qrscan, setQrscan] = useState("");

  const successFound = () => {
    setSuccess(!success);
  };
  const successNotFound = () => {
    setWarning(!warning);
  };

  const handleScan = (d) => {
    if (d) {
      console.log("scanHandle ran");
      setQrscan(d);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  var { info, bool } = Scan(data, qrscan);

  return (
    <div>
      {data !== undefined ? (
        <CCard>
          <div>
            <center>
              <span className="display-3">Verify Tag</span>
            </center>

            <center>
              <div style={{ marginTop: 30 }}>
                <QrScan
                  delay={600}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ height: 240, width: 320 }}
                />
              </div>
            </center>
            <center>
              <TextareaAutosize
                style={{
                  fontSize: 18,
                  width: 320,
                  height: 100,
                  marginTop: 100,
                }}
                rowsMax={4}
                defaultValue={qrscan}
                value={qrscan}
              />
            </center>
            
          </div>

          <center>
            {" "}
            {bool === true && info !== "" ? (
              <CButton
                color="success"
                onClick={() => setSuccess(!success)}
                className="mr-1"
              >
                Medicine is Genuine!
              </CButton>
            ) : (
              ""
            )}
          </center>
          <center>
            {" "}
            {bool === false && info === "0" ? (
              <CButton
                color="warning"
                onClick={() => setWarning(!warning)}
                className="mr-1"
              >
                Fake Medicine Detected!
              </CButton>
            ) : (
              ""
            )}
          </center>

          <CModal
            show={success}
            onClose={() => setSuccess(!success)}
            color="success"
          >
            <CModalHeader >
              <CModalTitle><span className="display-4">Details</span></CModalTitle>
            </CModalHeader>
            <CModalBody>
              
              <div className="container">
                <div className="row">
                  <div className="col"><h3>Name  :</h3></div>
                  <div className="col"><CButton block variant="outline" color="info">{info[0]}</CButton></div>
                  <div className="w-100"></div>
                  <div className="col"><h3>Manufacturer  :</h3></div>
                  <div className="col"><CButton block variant="outline" color="info">{info[7]} , {info[6]} </CButton></div>
                </div>
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setSuccess(!success)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>

          <CModal
            show={warning}
            onClose={() => setWarning(!warning)}
            color="warning"
          >
            <CModalHeader >
              <CModalTitle>
                <h1>Warning!</h1>
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <center>
                <h2 className="warning">Potentially fake medicine detected!</h2>
                <p>Medicine id "{qrscan}" does not match any records.</p>
                <p>
                  Please initiate a refund with the seller as soon as possible!!
                </p>
                <CFormText className="help-block"></CFormText>
              </center>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setWarning(!warning)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>
        </CCard>
      ) : (
        <h1>Please refresh Table in Add Medicine Section</h1>
      )}
    </div>
  );
};

export default Index;
