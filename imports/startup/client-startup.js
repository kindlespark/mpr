console.log("client|meteor|startup");
navigator.serviceWorker
  .register("/sw.js")
  .then(console.log("client|meteor|startup|serviceWorker registered"))
  .catch(error => console.log("ServiceWorker registration failed: ", err));
