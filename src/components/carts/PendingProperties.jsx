import { Card,CardContent,CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'


export default function PendingProperties({data}) {

    return (
        <Card>
            <CardHeader className="flex justify-between items-center ">
                <h3 className="font-semibold text-gray-900 underline">Pending Properties</h3>
                <Button className=" text-sm ">View All</Button>
            </CardHeader>

            <CardContent className="space-y-4">
                {data.map((property) => (
                    <motion.div
                        key={property.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: property.id * 0.1 }}
                    >
                        <div>
                            <h4 className="font-medium text-sm text-gray-900">{property.title}</h4>
                            <p className="text-xs text-gray-500">{property.owner} • ${property.price}/night</p>
                        </div>

                        <div className="flex space-x-2">
                            <Button variant="primary" size="sm">
                                <CheckCircle size={16} className="mr-1" /> Approve
                            </Button>
                            <Button variant="primary" size="sm">
                                <XCircle size={16} className="mr-1" /> Reject
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </CardContent>
        </Card>
    )
}