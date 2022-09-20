import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getAllLogVpn } from "../../services/CallServiceAbsensi";
import { FaMapMarkerAlt } from "react-icons/fa";

var filterParams = {
  debounceMs: 500,
  suppressAndOrCondition: true,
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("/");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
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
  inRangeFloatingFilterDateFormat: "M D YYYY",
};

const btn = (props) => {
  const viewLocation = () => {
    console.log(props.data);
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
  const [searchNik, setSearchNik] = useState(null);
  const gridRef = useRef();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "nik",
      filterParams: {
        buttons: ["clear"],
      },
      suppressMenu: true,
    },
    {
      field: "latitude",
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["clear"],
      },
    },
    {
      field: "longitude",
      filter: "agNumberColumnFilter",
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
      filter: true,
    };
  }, []);

  const onGridReady = async () => {
    try {
      const res = await getAllLogVpn();
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
    var nikFilterComponent = gridRef.current.api.getFilterInstance("nik");
    if (searchNik == null) {
      nikFilterComponent.setModel(null);
    } else {
      nikFilterComponent.setModel(searchNik);
    }
    gridRef.current.api.onFilterChanged();
  }, [searchNik]);

  const beforeDate = useCallback(() => {
    var dateFilterComponent = gridRef.current.api.getFilterInstance("waktu");
    dateFilterComponent.setModel({
      type: "graterThan",
      dateFrom: "2022-09-01",
      dateTo: null,
    });
    gridRef.current.api.onFilterChanged();
  }, []);

  return (
    <div className="log-vpn">
      <div className="container-fluid m-0 p-0">
        <div className="field-vpn">
          <div className="row py-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  onChange={onSearchNik}
                  value={searchNik}
                  placeholder="Masukkan Nik"
                />
                <div className="me-2">
                  <input className="form-control ms-1" type="date" />
                </div>
                <div className="me-2">
                  <input className="form-control ms-1" type="date" />
                </div>
              </div>
              <button
                onClick={onBtExport}
                style={{ fontWeight: "bold" }}
                className="btn btn-soft-green ms-2"
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
                    {/* <div className="example-wrapper">
                      <div className="example-header">
                        Page Size:
                        <select onChange={onPageSizeChanged} id="page-size">
                          <option value="10" selected={true}>
                            10
                          </option>
                          <option value="100">100</option>
                          <option value="500">500</option>
                          <option value="1000">1000</option>
                        </select>
                      </div>
                    </div> */}
                    <AgGridReact
                      ref={gridRef}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                      pagination={true}
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
