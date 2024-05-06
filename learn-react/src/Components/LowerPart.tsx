import React, { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const LowerPart: React.FC = () => {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [hubConnection, setHubConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<string[]>([]); // Store messages

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  useEffect(() => {
    if (isSwitchOn) {
      // Establish SignalR connection
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:7194/testhub') // URL to SignalR hub
        .withAutomaticReconnect() // Auto-reconnect on disconnection
        .build();

      setHubConnection(connection);

      const startConnection = async () => {
        try {
          await connection.start();
          console.log('SignalR connection established.');

          // Register the handler for "InvoiceIssued"
          connection.on('InvoiceIssued', (receivedMessage: string) => {
            setMessages((prevMessages) => [...prevMessages, receivedMessage]); // Add message to the list
          });
        } catch (error) {
          console.error('Error starting SignalR connection:', error);
        }
      };

      startConnection();
    } else {
      // Disconnect SignalR when switch is off
      if (hubConnection) {
        hubConnection.stop();
        console.log('SignalR connection stopped.');
        setHubConnection(null);
      }
      setMessages([]); // Reset messages when the switch is off
    }
  }, [isSwitchOn]); // React when switch changes and when the hub connection is updated

  return (
    <div className="lower-part">
      <input type="checkbox" checked={isSwitchOn} onChange={handleSwitchChange} />
      <label>Lower Switch</label>
      <div>
        {messages.length > 0 ? (
          messages.map((msg, index) => <p key={index}>{msg}</p>) // Print messages one by one
        ) : (
          <p>No messages received yet</p>
        )}
      </div>
    </div>
  );
};

export default LowerPart;