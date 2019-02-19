export const isTest = String(process.env.NODE_ENV) === "test";
export const isProd = String(process.env.NODE_ENV) === "production";
export const isDev = String(process.env.NODE_ENV) === "development";

export const googleMapsKey = "AIzaSyBSOw1Yu3D1WzfLZItDcBP0KPpPlx23l_k";
export const weatherAPI = "e81bac36636ec65c6c078f2b889d0e92";
//http://api.openweathermap.org/data/2.5/weather?lat=-41.3&lon=174.8&appid=f14a688d68d5774020efbb16d5bee4df

// weatherAPI1= f14a688d68d5774020efbb16d5bee4df
// weatherAPI2= e81bac36636ec65c6c078f2b889d0e92
export const loginRoute = (): string => {
  if (isDev) {
    return "http://localhost:59853/react/login";
  } else if (isProd) {
    return "https://reactcore20181208112428.azurewebsites.net/react/login";
  } else return "";
};

export const Route = (): string => {
  if (isDev) {
    return "http://localhost:59853";
  } else if (isProd) {
    return "https://reactcore20181208112428.azurewebsites.net";
  } else return "";
};
