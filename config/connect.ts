import mongoose from "mongoose"

class mongoDB {
  constructor() {
    this.connect()
  }
 
    public connect():void{
      const finalserver = 'mongodb+srv://Tiaramuttianingtyas23:tiara2398@cluster0.yhwyg.mongodb.net/tokotiara?authSource=admin&replicaSet=atlas-3np62b-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
        mongoose.connect(process.env.MONGODB_URI || finalserver, {
          useUnifiedTopology: true,
          useFindAndModify: false,
          useNewUrlParser: true,
          useCreateIndex: true,
        }, ()=>{
          console.log("connected to database", finalserver);
        })
      }
    }
    
export default new mongoDB().connect;
      
