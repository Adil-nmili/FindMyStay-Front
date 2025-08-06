import { Card, CardContent, CardHeader,CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function OpenComplaints({data}) {
    return(
        <Card>
              <CardHeader className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-sm underline text-gray-900">Open Complaints</h3>
                <Button className=" text-xs font-medium">View All</Button>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {data.map((complaint) => (
                  <Card key={complaint.id} className=" bg-gray-50 ">
                    <CardContent className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm underline text-gray-900">{complaint.type}</h4>
                        <p className="text-xs text-gray-500">
                          {complaint.reporter} → {complaint.reported}
                        </p>
                        <p className="text-sm mt-1">Property: {complaint.property}</p>
                      </div>
                      <div>
                        <Badge variant={complaint.status}>{complaint.status.replace('_', ' ')}</Badge>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-end mt-3">
                      <Button variant="default" className='text-xs' size="sm">View Details</Button>
                      <Button variant="outline" size="sm" className="ml-2 text-xs">Resolve</Button>
                    </CardFooter>
                  </Card>
                ))}
              </CardContent>
            </Card>
    )
}