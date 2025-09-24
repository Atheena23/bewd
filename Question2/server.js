const express = require ('express')
const fs = require ('fs')
const app = express()
const PORT = 3000
const path = require ('path')

app.use(express.json())
const FRONTEND_FILE = path.join(__dirname, 'frontend_Project1.html');
const FILE = "members.json"

app.get('/', (req, res)=>{
    res.sendFile(FRONTEND_FILE)
})

function readMembers(){
    try{
        const data = fs.readFileSync(FILE, "utf8")
        return JSON.parse(data)
    }catch (err){
        return [];
    }
}

function writeMembers (members){
    fs.writeFileSync(FILE, JSON.stringify(members, null, 2), "utf8")
}

app.post("/api/register", (req, res)=>{
    const { name, email, password } = req.body;

    let members = readMembers();

    const exists = members.find((m)=>m.email === email);
    if (exists){
        return res.status(400).json({error: "Email already registered"})
    }

    const newMember = {
        id: Date.now().toString(),
        name, 
        email,
        password
    };
    members.push(newMember);
    writeMembers(members)
    res.json({message:"Registration successful", memberId: newMember.id, newMember})
})

app.post("/api/login", (req, res)=>{
    const {email, password} = req.body;

    const members = readMembers();
    const member = members.find((m)=> m.email === email && m.password === password)

    if (!member){
        return res.status(401).json({error:"Invalid email and password"})
    }
    res.json({message:"Login Successful", token:member.id, member})
})

app.get("/api/profile",(req, res)=>{
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(401).json({error: "Not logged in"})
    }
    const token = authHeader.split(" ")[1];
    const members = readMembers();
    const member = members.find((m)=> m.id === token)

    if (!member){
        return res.status(404).json({error: "Member not found"})
    }
    res.json({id: member.id, name: member.name, email: member.email})
})

app.post("/api/logout", (req, res)=>{
    res.json({message: "Logged out successfully"});
})

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})