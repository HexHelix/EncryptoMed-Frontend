import React, { useState, useEffect } from "react";
import { set, get } from "../views/add/add-medicine/Items";
import QrScan from "react-qr-reader";
import { Scan } from "./Scan";

const Scanqr = () => {
  var data = get();
  const [qrscan, setQrscan] = useState("");
  // const [found, setFound] = useState("");
  // const [element, setElement] = useState("");
  const handleScan = (d) => {
    if (d) {
      console.log("scanHandle ran");
      setQrscan(d);
    }
  };
  // useEffect(()=>{
  //     if(qrscan!==''){
  //         data.forEach(element => {
  //             if (element[0].toString() === qrscan) {
  //                 setFound(true);
  //                 console.log(element)
  //             }
  //             else setFound(false);

  //         }
  //         );
  //     }
  //     return ()=>{setFound('');}
  // },[qrscan])

  const handleError = (err) => {
    console.error(err);
  };

  var info = Scan(data, qrscan);
  //setElement(Scan(data,qrscan));

  return (
    <div>
    <center>
    {info !== "" ? info : console.log("Not found")}
  </center>
      <center>
        <div style={{ marginTop: 30 }}>
          <QrScan
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            style={{ height: 240, width: 320 }}
          />
        </div>
      </center>
      
    </div>
  );
};

export default Scanqr;
