import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import AddAssistant from "@/components/forms/AddAssistant"



const AssistantsPage = () => {

    const [assistants, setAssistans] = useState([])


  return (
    <Card className="px-4">
        <CardDescription className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold underline text-gray-900 dark:text-white">Assistants Management</h2>
                  <p className="text-gray-500 text-xs">
                    Manage all assistants of the platform ({assistants.length} assistants found)
                  </p>
                </div>
                <AddAssistant>
                <Button
                  variant='outline'
                  className="text-xs">
                  <Plus size={12} className="mr-1" />
                  Add New Assistant
                </Button>
                </AddAssistant>
              </CardDescription>
    </Card>
  )
}

export default AssistantsPage