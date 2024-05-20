import React from 'react'

export default function useIpAddress() {
    const [ipAddress, setIpAdress] = React.useState("");
    const FetchIPAddress = async () => {
      const response = await fetch("https://api.ipify.org/?format=json", {
        method: "GET",
      });
      if (!response.ok) {
        console.log("eerr");
      }
  
      const { ip } = await response.json();
      setIpAdress(ip);
    };
  
    React.useEffect(() => {
      FetchIPAddress()
    }, []);
  
    return {
      ipAddress
    }
}
