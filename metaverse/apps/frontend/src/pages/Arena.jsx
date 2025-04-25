// import { useEffect, useState } from "react";
// import Phaser from "phaser";
// import GameScene from "../game/scenes/GameScene";
// import { gameConfig } from "../game/config/GameConfig";
// import { useParams } from "react-router-dom";
// import OptionsUIBar from "../components/OptionsUIBar";

// export const Arena = () => {
//   const { spaceId } = useParams();
//   const [showUIBar, setShowUIBar] = useState(false);
//   const [groupToken, setGroupToken] = useState(null);
//   const [ws, setWs] = useState(null);
//   const [routerRtpCapabilities, setRouterRTPCapabilities] = useState(null);

//   useEffect(() => {
//     if (!spaceId) {
//       console.error("Space ID is missing");
//       return;
//     }

//     const config = {
//       ...gameConfig,
//       parent: 'phaser-game',
//       scene: [GameScene],
//       scale: {
//         mode: Phaser.Scale.FIT,
//         parent: 'phaser-game',
//         width: 800,
//         height: 600,
//       },
//     };

//     const game = new Phaser.Game(config);
//     game.registry.set('spaceId', spaceId);

//     const wsConnection = new WebSocket('ws://localhost:3001');
//     setWs(wsConnection);

//     wsConnection.onopen = () => {
//       console.log("FROM frontend: Connected to WebSocket successfully");
//       wsConnection.send(JSON.stringify({ type: "routerRTPCapabilities" }));
//     };

//     wsConnection.onmessage = (event) => {
//       try {
//         const message = JSON.parse(event.data);
//         switch (message.type) {
//           case 'rtpCapabilities':
//             setRouterRTPCapabilities(message.payload.rtpCapabilities);
//             console.log(`rtpCapabilities :- ${JSON.stringify(message.payload.rtpCapabilities)}`);
//             break;
//           default:
//             break;
//         }
//       } catch (error) {
//         console.error("Error parsing message: ", error);
//       }
//     };

//     const handleProximityGroupUpdate = (event) => {
//       const { token, groupId, members, action } = event.detail;
//       if (groupToken) {
//         console.log("got groupToken");
//       }
//       console.log(`Proximity group update received: token - ${token} \n groupId - ${groupId} \n members - ${members} \n action - ${action}`);
//       if (token) {
//         setShowUIBar(true);
//         setGroupToken(token);
//       } else {
//         console.log('Token not received');
//       }
//     };

//     window.addEventListener('proximity-group-update', handleProximityGroupUpdate);

//     return () => {
//       game.destroy(true);
//       window.removeEventListener('proximity-group-update', handleProximityGroupUpdate);
//     };
//   }, [spaceId]);

//   return (
//     <div className="game-container">
//       <div>Arena page</div>
//       <div id="phaser-game" />
//       <style>{`
//         .game-container {
//           display: flex;
//           flex-direction: column;
//           align-items: start;
//           width: 100%;
//           height: 100vh;
//         }
//         #phaser-game {
//           width: 1080px;
//           height: 720px;
//         }
//       `}</style>
//       <div>
//         <OptionsUIBar show={showUIBar} />
//       </div>
//     </div>
//   );
// };


export const Arena = ()=>{
  return <div>This is Arena</div>
}