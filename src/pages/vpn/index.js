import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { GET_LOG_VPN } from "../../services/CallServiceAbsensi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { DatePicker, Input } from "antd";
import moment from "moment";

var filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("-");
    var cellDate = new Date(
      Number(dateParts[0]),
      Number(dateParts[1]) - 1,
      Number(dateParts[2])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

const btn = (props) => {
  const viewLocation = () => {
    const { latitude, longitude } = props.data;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${latitude}%2C${longitude}`,
      "_blank"
    );
  };
  return (
    <button
      className="btn btn-blue"
      style={{ padding: "5px 10px" }}
      onClick={viewLocation}
      data-bs-toggle="tooltip"
      data-bs-placement="right"
      data-bs-title="View Location"
    >
      <FaMapMarkerAlt />
    </button>
  );
};

const Vpn = () => {
  const [rowData, setRowData] = useState();
  const [searchNik, setSearchNik] = useState("");
  const [rangeDate, setRangeDate] = useState({
    startDate: "",
    endDate: "",
  });
  const gridRef = useRef();
  const dateFormat = "YYYY-MM-DD";
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "nik",
      filterParams: {
        buttons: ["clear"],
      },
    },
    {
      field: "latitude",
      filterParams: {
        buttons: ["clear"],
      },
    },
    {
      field: "longitude",
      filterParams: {
        buttons: ["clear"],
      },
    },
    {
      field: "waktu",
      filter: "agDateColumnFilter",
      filterParams: filterParams,
    },
    {
      field: "action",
      filter: null,
      sortable: null,
      cellRenderer: btn,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      flex: 1,
      minWidth: 150,
    };
  }, []);

  const onGridReady = async () => {
    try {
      const res = await GET_LOG_VPN();
      setRowData(res.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById("page-size").value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv(onPageSizeChanged);
  }, []);

  const onSearchNik = useCallback(() => {
    if (searchNik !== "") {
      var nikFilterComponent = gridRef.current.api.getFilterInstance("nik");
      nikFilterComponent.setModel({
        type: "startsWith",
        filter: searchNik,
      });
      gridRef.current.api.onFilterChanged();
    }
  }, [searchNik]);

  const onSearchDate = () => {
    var dateFilterComponent = gridRef.current.api.getFilterInstance("waktu");
    dateFilterComponent.setModel({
      type: "inRange",
      dateFrom: rangeDate.startDate,
      dateTo: rangeDate.endDate,
    });
    gridRef.current.api.onFilterChanged();
  };

  return (
    <div className="log-vpn">
      <div className="container-fluid m-0 p-0">
        <div className="field-vpn">
          <div className="row py-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex">
                <Input
                  className=" me-2"
                  style={{ width: "250px" }}
                  allowClear
                  onChange={(e) => setSearchNik(e.target.value)}
                  value={searchNik}
                  placeholder="Masukkan Nik"
                />
                <div className="me-2">
                  <DatePicker
                    format={dateFormat}
                    onChange={(date, dateString) =>
                      setRangeDate({ ...rangeDate, startDate: dateString })
                    }
                    placeholder="Start Date"
                    disabledDate={(date) => date.isAfter(moment())}
                  />
                </div>
                <div className="me-2">
                  <DatePicker
                    format={dateFormat}
                    onChange={(date, dateString) =>
                      setRangeDate({ ...rangeDate, endDate: dateString })
                    }
                    placeholder="End Date"
                    disabledDate={(date) => date.isBefore(rangeDate.startDate)}
                  />
                </div>
                <button
                  className="ant-btn btn-export"
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    border: "none",
                  }}
                  type="button"
                  onClick={onSearchNik}
                >
                  Filter
                </button>
              </div>
              <button
                onClick={onBtExport}
                className="ant-btn ant-btn ms-2 btn-export-csv"
                data-placement="right"
                title="Export CSV"
              >
                Export CSV
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="field-table-vpn">
                <div style={{ width: "100%", height: "450px" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                    }}
                    className="ag-theme-alpine"
                  >
                    <AgGridReact
                      ref={gridRef}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                      pagination={true}
                      sideBar={true}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vpn;
