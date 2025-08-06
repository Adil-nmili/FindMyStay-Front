import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'

export default function RecentUsers({data}) {
    return (
        <Card>
              <CardHeader className="flex justify-between items-center ">
                <h3 className="font-semibold underline text-gray-900">Recent Users</h3>
                <Button className=" text-sm ">View All</Button>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {data.map((user) => (
                  <motion.div 
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: user.id * 0.1 }}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="font-medium text-gray-700">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">{user.name}</h4>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <Badge variant={user.status}>{user.role}</Badge>
                      <span className="text-xs text-gray-500 mt-1">{user.joined}</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
    )
}