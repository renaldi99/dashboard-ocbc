import React, { useEffect, useState } from "react";
import {
  FILTER_BY,
  GET_ALL_ABSENSI_OR_WITH_PARAMETER,
} from "../../services/CallServiceAbsensi";
import { DatePicker, Table, Input, Tag, Space } from "antd";
import moment from "moment";
import { EyeOutlined } from "@ant-design/icons";
import { sliceWord } from "../../utils/utilsItem";
import StatusFlag from "../../components/StatusFlag";
import ModalView from "../../components/ModalView";

const Absensi = () => {
  const [dataAbsensi, setDatabsensi] = useState([]);
  const [filterNik, setFilterNik] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const dateFormat = "YYYY-MM-DD";

  const callServiceGetAllAbsensi = async () => {
    setLoading(true);
    try {
      const res = await GET_ALL_ABSENSI_OR_WITH_PARAMETER();
      setDatabsensi(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };

  useEffect(() => {
    setFilterNik("");
    callServiceGetAllAbsensi();
  }, []);

  const clearFilter = () => {
    setFilterNik("");
    setStartDate("");
    setEndDate("");
    callServiceGetAllAbsensi();
  };

  // const handleSearchNik = () => {
  //   if (filterNik !== "") {
  //     const filteredEvents = dataAbsensi.filter(({ nik }) => {
  //       return nik.includes(filterNik);
  //     });
  //     setDatabsensi(filteredEvents);
  //   } else {
  //     callServiceGetAllAbsensi();
  //   }
  // };

  const filterBy = async () => {
    setLoading(true);
    if (filterNik !== "" && startDate === null && endDate === null) {
      try {
        const res = await FILTER_BY({ nik: filterNik });
        setDatabsensi(res.data);
        setLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    } else if (filterNik === "" && startDate !== null && endDate !== null) {
      try {
        const res = await FILTER_BY({ startDate, endDate });
        setDatabsensi(res.data);
        setLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    } else if (filterNik !== "" && startDate !== null && endDate !== null) {
      try {
        const res = await FILTER_BY({ nik: filterNik, startDate, endDate });
        setDatabsensi(res.data);
        setLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    } else {
      callServiceGetAllAbsensi();
    }
  };

  console.log(filterNik);

  const columns = [
    {
      title: "Nik",
      width: 100,
      dataIndex: "nik",
      key: "nik",
      fixed: "left",
    },
    {
      title: "Flag",
      width: 100,
      dataIndex: "flag",
      key: "flag",
      fixed: "left",
      render: (_, { flag }) => (
        <>
          {Array.from(flag).map((item) => {
            let color = "";
            if (item === "I") {
              color = "green";
            } else {
              color = "volcano";
            }
            return (
              <Tag color={color} key={item}>
                {item === "I" ? "Clock In" : "Clock Out"}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Leave Flag",
      dataIndex: "leave_flag",
      key: "leave_flag",
      width: 100,
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      width: 150,
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
      key: "latitude",
      width: 150,
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      key: "longitude",
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
      render: (val) => {
        if (val) return sliceWord(val);
      },
    },
    {
      title: "Waktu",
      dataIndex: "waktu",
      key: "waktu",
      width: 150,
    },
    {
      title: "Hub ID",
      dataIndex: "hub_id",
      key: "hub_id",
      width: 100,
    },
    {
      title: "Device ID",
      dataIndex: "device_id",
      key: "device_id",
      width: 100,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      fixed: "right",
      render: (value, record) => {
        return (
          <Space size="small">
            <ModalView
              title="View Detail"
              meta={{
                columns: 2,
                fields: [
                  { key: "nik", label: "Nik" },
                  { key: "waktu", label: "Tanggal" },
                  {
                    key: "flag",
                    label: "Status",
                    viewWidget(val) {
                      return <StatusFlag flag={val.value} />;
                    },
                  },
                  { key: "leave_flag", label: "Leave Flag" },
                  { key: "address", label: "Alamat" },
                  { key: "keterangan", label: "Keterangan" },
                  { key: "latitude", label: "Latitude" },
                  { key: "longitude", label: "Longitude" },
                  { key: "hub_id", label: "Hub ID" },
                  { key: "device_id", label: "Device ID" },
                ],
              }}
              initialValues={record}
              icon={<EyeOutlined />}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <div className="absensi">
      <div className="container-fluid m-0 p-0">
        <div className="field-absensi">
          <div className="row">
            <div className="col-lg-12">
              <div className="ant-row ant-row-no-wrap ant-row-middle py-3">
                <Input
                  placeholder="Search by nik"
                  className="me-2"
                  style={{ width: "250px" }}
                  allowClear
                  onChange={(e) => setFilterNik(e.target.value)}
                  value={filterNik}
                />
                <div className="me-2">
                  <DatePicker
                    format={dateFormat}
                    placeholder="Start Date"
                    onChange={(val, data) => setStartDate(data)}
                    disabledDate={(date) =>
                      date.isBefore(moment().subtract(3, "month"))
                    }
                  />
                </div>
                <div className="me-2">
                  <DatePicker
                    format={dateFormat}
                    placeholder="End Date"
                    onChange={(val, data) => setEndDate(data)}
                    disabledDate={(date) =>
                      date.isBefore(moment().subtract(3, "month"))
                    }
                  />
                </div>
                <button
                  onClick={filterBy}
                  className="ant-btn"
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    border: "none",
                  }}
                  type="button"
                >
                  Filter
                </button>
                <button
                  className="ant-btn"
                  style={{
                    backgroundColor: "#FFF",
                    color: "#e74c3c",
                    borderColor: "#e74c3c",
                  }}
                  type="button"
                  onClick={clearFilter}
                >
                  Clear Filter
                </button>
              </div>
              <div className="field-abs">
                <div className="field-search-abs ant-card">
                  <Table
                    loading={loading}
                    columns={columns}
                    dataSource={dataAbsensi}
                    scroll={{ x: "max-content", y: 350 }}
                  />
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
