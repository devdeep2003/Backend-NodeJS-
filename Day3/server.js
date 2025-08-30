const EventEmitter = require("events")
const fs = require("fs")

const args_obj = [{
    name : 'GaganDeep',
    item_name : 'Laptop',
    field : 'Profile Picture'
}] //custom object

const emitter = new EventEmitter() //Creates an object of the class EventEmitter required from events library


//counter object

const counter = {
    login:0,
    logout:0,
    purchase:0,
    profile:0
}

const LogFile = './activityLogs.json'

if(fs.existsSync(LogFile)){
    const data  = fs.readFileSync(LogFile, 'utf-8')
    Object.assign(counter , JSON.parse(data));
}

//emitter on codes



const recordCounts = () => {
    fs.writeFileSync(LogFile , JSON.stringify(counter))
}


emitter.on("Login" , (args)=>{
    console.log(`User logged in : name : ${args.name}`)
    counter.login++;
    recordCounts();
})


emitter.on("Logout" , (args)=>{
    console.log(`User has logged out. Logged out user : ${args.name}`)
    counter.logout++;
    recordCounts();
})

emitter.on("Purchase" , (args)=>{
    console.log(`User : ${args.name} has purchased item : ${args.item_name}`)
    counter.purchase++;
    recordCounts();         
})

emitter.on("Profile" , (args)=>{
    console.log(`User : ${args.name} has changed profile information. Field of change : ${args.field}`)
    counter.profile++;
    recordCounts();
})


//Emitter emits code

emitter.emit("Login" , args_obj[0]);
emitter.emit("Purchase" , args_obj[0], args_obj[1]);
emitter.emit("Profile" , args_obj[0] , args_obj[2]);
emitter.emit("Logout" , args_obj[0]);


console.log(`\n\n**********Activity Summary**********\nLogin : ${counter.login}\nLogout : ${counter.logout}\nPurchase : ${counter.purchase}\nProfile : ${counter.profile}`)