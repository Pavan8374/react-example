interface Config {
    API_URL: string;
  }
  
  const configs: Record<string, Config> = {
    development: {
      API_URL: 'https://neardekhoapi.azurewebsites.net/v1'
    },
    production: {
      API_URL: 'https://neardekhoapi.azurewebsites.net/v1'
    },
    test: {
      API_URL: 'https://neardekhoapi.azurewebsites.net/v1'
    }
  };


  
  const env = process.env.REACT_APP_ENV || 'development';
  export const config = configs[env];