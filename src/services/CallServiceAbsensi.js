import client from "./Client";

export const getAllDataOrWithParameter = async (params) => {
  const response = await client.get("api/InventoryAbsensi/ListAbsensi", {
    params,
  });
  return response;
};

export const getAllNik = async () => {
  const response = await client.get("api/InventoryAbsensi/SearchAllNik");
  return response;
};

export const getAllLogVpn = async () => {
  const response = await client.get("api/LogVpn/ListVpn");
  return response;
};
