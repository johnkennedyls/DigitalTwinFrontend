if (typeof window !== 'undefined') {
  window.global = window;
}
import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from 'stompjs/lib/stomp.min';

export const MyComponent = () => {

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/websocket');
    const stompClient = Client.over(socket);

    stompClient.connect({}, function(frame) {
      console.log('Connected: ' + frame);

      stompClient.subscribe('/topic/message', function(messageOutput) {
        console.log('Received: ' + messageOutput.body);
      });
    });

    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
      console.log("Disconnected");
    };

  }, []);

  return (
    <div>
      {/* tu contenido del componente */}
    </div>
  );
};
