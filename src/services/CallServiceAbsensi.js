import client from "./Client";

export const GET_ALL_ABSENSI_OR_WITH_PARAMETER = async (params) => {
  const response = await client.get("api/InventoryAbsensi/ListAbsensi", {
    params,
  });
  return response;
};

export const GET_ALL_NIK = async () => {
  const response = await client.get("api/InventoryAbsensi/SearchAllNik");
  return response;
};

export const FILTER_BY = async (params) => {
  const response = await client.get("api/InventoryAbsensi/filter/Search", {
    params,
  });
  return response;
};

export const GET_LOG_VPN = async () => {
  const response = await client.get("api/LogVpn/ListVpn");
  return response;
};

export const LOGIN_USER = async (data) => {
  const response = await client.post("api/User/LoginUser", data);
  return response;
};
