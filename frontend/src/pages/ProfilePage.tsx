"use client"

import { useUser } from "@/context/UserContext"
import type React from "react"
import { useState } from "react"
import useUpdateProfile from "@/hooks/useUpdateProfile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Toaster, toast }  from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const ProfilePage: React.FC = () => {
  const { user } = useUser()
  const { updateProfile, loading, error } = useUpdateProfile()

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    profilePicture: null as File | null,
  })

  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.profilePicture || null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData((prev) => ({ ...prev, profilePicture: file }))
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    
    const data = new FormData()
    data.append("username", formData.username)
    data.append("email", formData.email)
    if (formData.password) {
      data.append("password", formData.password)
    }
    if (formData.profilePicture) {
      data.append("profilePicture", formData.profilePicture)
    }

    try {
      await updateProfile(data)
      toast.success("Profile updated" )
      setIsDialogOpen(false)
    } catch (error) {
      toast.error("Error updating profile")
      console.error("Error updating profile:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={previewUrl || user?.profilePicture} alt={user?.username} />
              <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user?.username}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2 flex-col md:flex-row ">
                <div className="space-y-2 w-full">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="space-y-2 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                </div>
            </div>

            <div className="flex gap-2 flex-col md:flex-row ">
                <div className="space-y-2 w-full">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="provide new for update else leave"
                    />
                </div>
                <div className="space-y-2 w-full">
                    <Label htmlFor="profilePicture">Profile Picture</Label>
                    <Input
                        id="profilePicture"
                        name="profilePicture"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        />
                </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Update Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Profile Update</DialogTitle>
                <DialogDescription>
                  Are you sure you want to update your profile? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Confirm Update"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default ProfilePage

