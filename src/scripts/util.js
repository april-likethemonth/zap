export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export async function apiCall(
  Username,
  Apikey,
  Code,
  Name,
  Op,
  Duration,
  Intensity = -1
) {
  let payload = {};
  if (Intensity === -1) {
    payload = {
      Username: Username,
      Apikey: Apikey,
      Code: Code,
      Name: Name,
      Op: Op,
      Duration: Duration,
    };
  }
  payload = {
    Username: Username,
    Apikey: Apikey,
    Code: Code,
    Name: Name,
    Op: Op,
    Duration: Duration,
    Intensity: Intensity,
  };

  const url = "https://do.pishock.com/api/apioperate/";
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  };
  const res = await fetch(url, options);
  console.log(res);
}
