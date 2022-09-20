import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Geocode from "react-geocode";
import Select from "react-select";
import LogAbs from "../../components/absensi/LogAbs";
import { getAllNik } from "../../services/CallServiceAbsensi";

const Absensi = () => {
  const [dSelect, setDSelect] = useState([]);
  const [nikSelected, setNikSelected] = useState(null);
  const [date, setDate] = useState(null);
  const [map, setMap] = useState(null);
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB-8DHLNNBV8N0h4y3k95s9fguZrMyDDSo",
  });

  const mapStyles = {
    width: "400px",
    height: "400px",
  };

  const onDate = (e) => {
    setDate(e.target.value);
  };

  const onSubmitDate = (e) => {
    e.preventDefault();
    console.log(date);
  };

  const callServiceGetNik = async () => {
    try {
      const res = await getAllNik();
      const newRes = res.data;
      console.log(newRes);
      if (newRes.length > 0) {
        setDSelect(
          newRes.map(function (e) {
            return { value: e.nik, label: e.nik };
          })
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    callServiceGetNik();
  }, []);

  console.log(date);

  return (
    <div className="absensi">
      <div className="container-fluid m-0 p-0">
        <div className="field-absensi">
          <div className="row">
            <div className="col-lg-12">
              <div className="field-abs">
                <div className="field-search-abs">
                  <h3>Log Absensi</h3>
                  <div className="select-search-abs">
                    <div className="row">
                      <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap">
                        <div className="form-group">
                          <label>Masukkan kata kunci</label>
                          <div className="d-flex align-items-center">
                            <Select
                              isClearable={true}
                              defaultValue={nikSelected}
                              onChange={setNikSelected}
                              className="basic-single"
                              classNamePrefix="select"
                              options={dSelect}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Date:</label>
                          <div className="me-2 d-flex align-items">
                            <input
                              className="form-control ms-1"
                              type="date"
                              style={{
                                padding: "5px 11px",
                                borderRadius: "4px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <LogAbs numberNik={nikSelected} filDate={date} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Absensi;
