import { motion } from "framer-motion";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import {  Button } from "@/components/ui/button";
import {  Badge } from "@/components/ui/badge";
import { 
  Star, 
  MapPin, 
  Bed, 
  Bath, 
  Ruler, 
  Check, 
  X, 
  Edit, 
  Trash2 
} from "lucide-react";

const PropertyCard = ({ property, toggleStatus, toggleFeatured, deleteProperty }) => {
  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      approved: { label: "Approved", className: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300" },
      pending: { label: "Pending", className: "bg-amber-500/20 text-amber-600 dark:text-amber-300" },
      rejected: { label: "Rejected", className: "bg-rose-500/20 text-rose-600 dark:text-rose-300" },
    };
    
    return (
      <Badge className={`absolute top-4 right-4 rounded-full px-3 py-1 font-medium ${statusConfig[status]?.className}`}>
        {statusConfig[status]?.label}
      </Badge>
    );
  };

  return (
    <motion.div
      key={property.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{transitionDuration:300, ease:'easeInOut'}}
      className="overflow-hidden"
    >
      <Card className=" bg-gradient-to-br pt-0 overflow-hidden">
        {/* Property Header - Image & Badges */}
        <div className="relative mt-0 h-42 bg-gradient-to-r from-indigo-600 to-purple-700">
          {property.featured && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 ">
              <Star size={12} className="mr-1" />
              Featured
            </Badge>
          )}
          <StatusBadge status={property.status} />
        </div>
        
        {/* Property Content */}
        <CardHeader className="pb-0 px-2">
          <div className="flex justify-between gap-1 items-start">
            <CardTitle className="text-md font-bold text-gray-900 dark:text-white tracking-tight">
              {property.title}
            </CardTitle>
            <Badge variant="secondary" className="px-3 py-1 bg-indigo-100/50 ">
              <Star size={12} className="text-amber-500  fill-amber-500" />
              <span className="font-medium">{property.rating}</span>
            </Badge>
          </div>
          
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <MapPin size={14} className="mr-1.5 text-indigo-600" />
            <span className="text-xs truncate">{property.address}</span>
          </div>
        </CardHeader>
        
        <CardContent className="px-2 py-0">
          <div className="flex justify-between items-center">
            <div className="flex items-baseline">
              <span className="text-md font-bold text-gray-900 dark:text-white">${property.price}</span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">/night</span>
            </div>
            <div className="text-xs text-gray-500  bg-gray-100 px-3 py-1 rounded-full">
              Owner: {property.owner}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-2 pt-2 border-t border-gray-200">
            <div className="flex flex-col items-center">
              <div className="p-2.5 rounded-full bg-indigo-100 mb-1">
                <Bed size={16} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-xs text-gray-600 ">{property.bedrooms} beds</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-2.5 rounded-full bg-indigo-100  mb-1">
                <Bath size={16} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-sm text-gray-600 ">{property.bathrooms} baths</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-2.5 rounded-full bg-indigo-100  mb-1">
                <Ruler size={16} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-sm text-gray-600 ">{property.area} sqft</span>
            </div>
          </div>
        </CardContent>
        
        {/* Property Footer - Actions */}
        <CardFooter className="pt-2 border-t px-2 border-gray-200 ">
          <div className="flex justify-between w-full">
            <div className="flex space-x-2">
              {property.status === 'pending' && (
                <>
                  <Button 
                    size="icon"
                    className="rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600  h-9 w-9"
                    onClick={() => toggleStatus(property.id, 'approved')}
                  >
                    <Check size={16} />
                  </Button>
                  <Button 
                    size="icon"
                    className="rounded-full bg-rose-500/15 hover:bg-rose-500/25 text-rose-600  h-9 w-9"
                    onClick={() => toggleStatus(property.id, 'rejected')}
                  >
                    <X size={16} />
                  </Button>
                </>
              )}
              <Button 
                size="icon"
                className="rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-600  h-9 w-9"
                onClick={() => toggleFeatured(property.id)}
              >
                {property.featured ? (
                  <X size={16} className="text-rose-500" />
                ) : (
                  <Star size={16} className="fill-amber-500 text-amber-500" />
                )}
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                size="icon"
                variant="outline"
                className="rounded-full border-indigo-500/30 text-indigo-600  bg-white  h-9 w-9"
              >
                <Edit size={16} />
              </Button>
              <Button 
                size="icon"
                className="rounded-full bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-400 h-9 w-9"
                onClick={() => deleteProperty(property.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;