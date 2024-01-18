// // interactionsWorker.js

// const interactionCounts = {};

// self.onmessage = (event) => {
//   const { type, data } = event.data;

//   if (type === 'interaction') {
//     const { volunteerId, interactionType } = data;

//     if (!interactionCounts[volunteerId]) {
//       interactionCounts[volunteerId] = {};
//     }

//     interactionCounts[volunteerId][interactionType] =
//       (interactionCounts[volunteerId][interactionType] || 0) + 1;

//     self.postMessage({ type: 'updateStats', data: { interactionCounts } });
//   }
// };

// attempted implementation. unsure of how to fully apply