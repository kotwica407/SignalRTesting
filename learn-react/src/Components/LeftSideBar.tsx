import React, { useEffect, useState } from 'react';
import axios from 'axios';
import generateRandomGuid from '../Helpers/Helpers';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const LeftSidebar: React.FC = () => {

const api = axios.create({
    baseURL: 'https://localhost:7194'
})

const [hubConnection, setHubConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    // Establish SignalR connection to the "testHub"
    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:7194/testHub') // URL to SignalR hub
      .withAutomaticReconnect() // Reconnect automatically if disconnected
      .build();

    const startConnection = async () => {
      try {
        await connection.start();
        console.log('SignalR connection to testHub established.');
      } catch (error) {
        console.error('Error starting SignalR connection:', error);
      }
    };

    setHubConnection(connection); // Store the connection
    startConnection(); // Start the connection

    // Clean up the connection when the component is unmounted
    return () => {
      if (hubConnection) {
        hubConnection.stop();
        console.log('SignalR connection to testHub stopped.');
      }
    };
  }, []);

const handleIssuedClick = async () => {
    const randomGuid = generateRandomGuid();

    try {
        await api.post('weatherforecast/issued', { invoiceId: randomGuid });
        console.log(`POST request sent with GUID: ${randomGuid}`);
    } catch (error) {
        console.error('Error sending POST request', error);
    }
    };

  // Handler for the Broadcast button
  const handleBroadcastClick = async () => {
    if (hubConnection) {
      try {
        await hubConnection.invoke('BroadcastMessage', 'Hello from React!');
        console.log('BroadcastMessage method invoked.');
      } catch (error) {
        console.error('Error invoking BroadcastMessage:', error);
      }
    } else {
      console.warn('No SignalR connection to invoke BroadcastMessage.');
    }
  };

  return (
    <div>
      <button className="broadcast-button" onClick={handleBroadcastClick}>Broadcast</button>
      <button className="issued-button" onClick={handleIssuedClick}>Issued</button>
    </div>
  );
};

export default LeftSidebar;