import { Plus, Send, Trash, X } from 'lucide-react'
import React, { useState } from 'react'

const AddUser = ({showAddUser, setShowAddUser}: {showAddUser: boolean, setShowAddUser: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [ participantCounter, setParticipantCounter ] = useState<number>(1);

  const addParticipantHandle = (e: React.MouseEvent <HTMLButtonElement>) => {
    e.preventDefault()
    setParticipantCounter(participantCounter + 1);
  }

  const handleSubmit = (e: React.FormEvent <HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    for(let i = 0; i < participantCounter; i++) {
      console.log(Object.fromEntries(formData.entries())['participant' + i]);
    }

    const fileName = Object.fromEntries(formData.entries()).file_name
    console.log(fileName)
  }
  
  return (
    <div className='w-full fixed top-0 left-0 z-50 white backdrop-blur-xl h-screen flex justify-center items-center'>
      <div className="gap-4 bg-white w-full max-w-3xl mx-auto rounded-md flex flex-col bordered-nonhover px-3">
        <div className='w-full flex justify-between'>
          <div>
            <h1 className='text-xl font-bold'>Add new user</h1>
            <p>silahkan input manual atau menggunakan excel</p>
          </div>
          <button onClick={() => setShowAddUser(!showAddUser)} className='cursor-pointer'>
            <X />
          </button>
        </div>
        <form  onSubmit={handleSubmit} className='w-full justify-between flex gap-2 items-stretch'>
          <div className="flex-1 gap-2 flex flex-col">
            <div className="bordered-nonhover bg-yelloww rounded-md pt-8 ">
              <h1 className="font-bold -mb-1 text-xl">Import File</h1>
              <p className='text-sm'>import excel file(.xlsx)</p>
            </div>
            <input type="file" className='bordered bg-white w-full rounded-md'/>
          </div>
          <hr className='border border-black h-full'/>
          <div className="flex-1 gap-2 flex flex-col">
            <div className="bordered-nonhover bg-purplee rounded-md pt-8 ">
              <h1 className="font-bold -mb-1 text-xl">Input Manual</h1>
              <p className='text-sm'>masukan nama participant</p>
            </div>
            <div className='w-full'>
              {Array.from({ length: participantCounter }, (_, i) => (
                <div className="flex items-stretch gap-2" key={i}>
                  <input name="file_name" placeholder='nama participant' type="text" className='bordered bg-white w-full rounded-md' name={'participant' + i}/>
                  <button className='bordered bg-redd aspect-square rounded-md flex items-center justify-center' onClick={(e) => {e.preventDefault(); setParticipantCounter(participantCounter - 1)}}>
                    <Trash size={16}/>
                  </button>
                </div>
              ))}
              <div className="w-full flex justify-end pt-2 gap-2">
                <button onClick={addParticipantHandle} className='flex-1 bordered bg-yelloww justify-center rounded-md flex gap-1 items-center'><Plus size={16}/> add participant</button>
                <button type='submit' className='flex-1 bordered bg-greenn justify-center rounded-md flex gap-1 items-center'><Send size={16}/> submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUser