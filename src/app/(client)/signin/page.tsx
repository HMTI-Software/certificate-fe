'use client'

import { IUserData } from "@/lib/Interface"
import { Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"


const page = () => {

  interface ISigninField {
    name: string
    id: string
    placeholder: string
    type: string
  }

  const SigninField: ISigninField[] = [
    {
      name: "Email",
      id: "user_email",
      placeholder: "user@gmail.com",
      type: "text"
    },
    {
      name: "password",
      id: "user_password",
      placeholder: "***********",
      type: "password"
    },
  ]

  const [ showPassword, setShowPassword ] = useState<boolean>(false)
  const [ userAllData, setUserAllData ] = useState<IUserData[]>([])
  const [ errorMsg,  setErrorMsg ] = useState<string>("")

  

  useEffect(() => {
    const fetchData = async () => { 
      const res = await fetch("/static/UserData.json")
      const data = await res.json()
      setUserAllData(data)
    }

    fetchData()
  }, [])

  const openPassword = () => {
    setShowPassword(!showPassword)
  }

  const router = useRouter()
  const handleSignIn = (e: React.MouseEvent <HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email    = Object.fromEntries(formData.entries()).user_email
    const password = Object.fromEntries(formData.entries()).user_password
    console.log(email)
    const user     = userAllData.find((user: IUserData) => user.email == email)

    if (user) {
      const userPassword = user.password
      if( userPassword === password ) {
        router.push('/dashboard')
      } else {
        setErrorMsg("password incorrect")
      }
    } else {
      setErrorMsg("user not found")
    }
  } 

  return (
    <div className="w-full px-40 min-h-screen flex flex-col items-center justify-center">
      <div className="min-w-md flex flex-col border-black p-4 rounded-lg items-center">
        <form onSubmit={handleSignIn} action="" className="w-full max-w-sm flex flex-col gap-4">
          <div className="mb-6">
            <b className="text-xl">Halo user</b>
            <p>tolong login untuk melanjutkan</p>
          </div>
          {errorMsg ? (
            <div className="w-full text-center bordered rounded-md bg-redd">{errorMsg}</div>
          ) : (
            null
          )}
          {SigninField.map((field) => (
            <div className="w-full flex flex-col" key={field.id}>
              <label htmlFor={field.id} className="mb-2">{field.name}</label>
              {field.type === "password" ? (
                <div className="flex-col flex gap-2">
                  <div className="flex gap-2 items-stretch">
                    <input type={showPassword ? "text" : field.type} name={field.id} className="bordered rounded-md w-full" id={field.id} placeholder={field.placeholder} />
                    <div onClick={openPassword} className="bg-purplee h-full aspect-square bordered rounded-md flex justify-center items-center">
                      <Eye/>
                    </div>
                  </div>
                  <Link href="/" className="w-full text-end underline ">forget password?</Link>
                </div>
              ) : (
                <input type={field.type} name={field.id} className="bordered rounded-md w-full" id={field.id} placeholder={field.placeholder} />
              )}
            </div>
          ))}
          <button className="bordered bg-purplee rounded-md">Sign In</button>
        </form>
        <div className="flex gap-2 w-full items-center max-w-sm py-6">
          <div className="border border-black w-full"></div>
          <p className="whitespace-nowrap">or login using</p>
          <div className="border border-black w-full"></div>
        </div>
        <div className="flex gap-2 w-full max-w-sm">
          <button className="bordered rounded-md w-full justify-center bg-yelloww flex items-center gap-2 text-sm">
            <FcGoogle/>
            Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default page