const EventEmitter = require("events")

const emitter = new EventEmitter()

emitter.on("Greet_func" , (args)=>{
    console.log(`Hey  my respected Brother ${args.bro_name}, Give me some Oats brother , I AM STARVING!!`);
})

emitter.emit("Greet_func" , {
    bro_name : 'Rohan'
})


// Emitter notes :
// 1. The EventEmitter class is used to create an event-driven architecture in Node.js.
// 2. The 'on' method is used to register an event listener for a specific event.
// 3. The 'emit' method is used to trigger an event and call all registered listeners for that event.
// 4. You can pass arguments to the event listeners when emitting an event.
// 5. You can have multiple listeners for the same event.
// 6. You can remove listeners for a specific event using the 'removeListener' method.
// 7. The EventEmitter class is part of the 'events' module in Node.js.