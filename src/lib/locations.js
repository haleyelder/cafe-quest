import Papa from 'papaparse';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTmMSDJq81HT336dB_YCbdYFFK-19mtMpkGMAcpN_ezfBjA8EgjlwJsYm5L7WHEjId2yPnC1hZC-0Ms/pub?gid=0&single=true&output=csv';

export async function getLocations() {
  const res = await fetch(SHEET_URL);
  const csv = await res.text();
  const { data } = Papa.parse(csv, { header: true, skipEmptyLines: true });
  return data;
}
