import Note from "../models/Note.js"

export async function getAllNotes(req,res){
    try{
        const notes = await Note.find().sort({createdAt:-1}); //newest first
        res.status(200).json(notes)
    } catch (error){
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal Server error"})
    }
};

export async function getNotesById(req,res){
    try{
        const notes = await Note.findById(req.params.id);
        if(!notes) return res.status(404).json({message:"Note not Found!"});
        res.status(200).json(notes);
    } catch (error){
        console.error("Error in getting notes by ID ", error);
        res.status(500).json({message:"Internal Server error"})
    }
};

export async function createNote(req,res){
   try{
        const {title, content} = req.body;
        const newNote = new Note({title:title, content:content});
        await newNote.save()
        res.status(201).json({
            title:title,
            content:content,
            message:"Note Created Successfully"
        })
   }
   catch(error){
        console.error("Error in Creating a Note");
        res.status(500).json({message:"Internal Server error"});
    }
}

export async function updateNotes(req,res){
    try{
        const{title,content} = req.body;
      const updatedNote=  await Note.findByIdAndUpdate(req.params.id,{title,content},{new: true,});
       
        if(!updatedNote) return res.status(404).json({message:"Note not Found"}); 
       
        res.status(200).json({message:"Note updated Successfully"});
    } catch(error){
        console.error("Error in Updating a Note");
        res.status(500).json({message:"Internal Server error"});
   }
}

export async function deleteNotes(req,res){
   try{
    const deletedNote=await Note.findByIdAndDelete(req.params.id)
    if(!deletedNote) return res.status(404).json({message:"Note not found"});
    res.status(200).json({message:"Note deleted Successfully!"})

   } catch(error){
        console.error("Error in Updating a Note");
        res.status(500).json({message:"Internal Server error"});
   }
}