import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
}

const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
}

export default function RecentBookings({ data }) {

   

    return (
        <Card>
            <CardHeader className="flex justify-between items-center mb-4">
                <h3 className="font-semibold underline text-sm text-gray-900">Recent Bookings</h3>
                <Button className=" text-xs font-medium">View All</Button>
            </CardHeader>
                <motion.CardContent
                className='px-2'
                    initial="hidden"
                    animate="show"
                    variants={containerVariants}
                >
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Property</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((booking) => (
                                <motion.tr
                                    key={booking.id}
                                    variants={rowVariants}
                                    whileHover={{ scale: 1.01, backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <TableCell>
                                        <div className="font-medium">{booking.property}</div>
                                        <div className="text-sm text-muted-foreground">{booking.dates}</div>
                                    </TableCell>
                                    <TableCell className="text-sm">{booking.client}</TableCell>
                                    <TableCell className="text-sm">${booking.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={booking.status}>{booking.status}</Badge>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </Table>
                </motion.CardContent>

          
        </Card>
    )
}