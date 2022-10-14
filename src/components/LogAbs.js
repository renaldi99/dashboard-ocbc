import React, { useEffect, useState } from "react";
import { getAllDataOrWithParameter } from "../services/CallServiceAbsensi";
import { BsFillDoorClosedFill, BsFillDoorOpenFill } from "react-icons/bs";

const LogAbs = (props) => {
  const [logs, setLogs] = useState([]);
  const [nik, setNik] = useState(null);

  const { numberNik } = props;

  const callServiceLogs = async () => {
    try {
      const res = await getAllDataOrWithParameter({ nik: nik });
      setLogs(res.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (numberNik != null) {
      setNik(numberNik.value);
    } else {
      setNik(null);
      setLogs([]);
    }
  }, [numberNik]);

  useEffect(() => {
    if (nik != null) {
      callServiceLogs();
    }
  }, [nik]);

  return (
    <div className="element-result-card-abs">
      <div className="row">
        {logs.length !== 0 ? (
          logs.map((item, index) => (
            <div className="card-log-abs" key={index}>
              <div
                className={item.flag === "O" ? "card-flag-o" : "card-flag-i"}
              >
                {item.flag === "O" ? (
                  <BsFillDoorOpenFill className="door-o" />
                ) : (
                  <BsFillDoorClosedFill className="door-i" />
                )}
              </div>
              <div className="card-desc-log">
                <div className="card-text-top">
                  {item.waktu}
                  <span
                    className={
                      item.flag === "O" ? "indikator-o" : "indikator-i"
                    }
                  ></span>
                </div>
                <div className="card-address">
                  {item.address ? item.address : "Alamat null"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  );
};

export default LogAbs;
