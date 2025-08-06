import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from 'react-feather';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PropertyCard from '../../components/carts/PropertyCard';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Progress } from "@/components/ui/progress";

const PropertiesPage = () => {
  // Mock property data
  const [properties, setProperties] = useState([
    {
      id: 101,
      title: "Luxury Beach Villa",
      address: "123 Beach Road, Malibu",
      owner: "John Doe",
      type: "villa",
      status: "approved",
      price: 350,
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      rating: 4.8,
      created: "2023-05-14",
      featured: true
    },
    {
      id: 102,
      title: "Downtown Loft Apartment",
      address: "456 City Center, New York",
      owner: "Emily Davis",
      type: "apartment",
      status: "pending",
      price: 180,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      rating: 4.5,
      created: "2023-05-13",
      featured: false
    },
    {
      id: 103,
      title: "Mountain Cabin Retreat",
      address: "789 Forest Lane, Aspen",
      owner: "Michael Brown",
      type: "cabin",
      status: "approved",
      price: 220,
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      rating: 4.9,
      created: "2023-05-12",
      featured: true
    },
    {
      id: 104,
      title: "Modern City Penthouse",
      address: "101 Skyline Blvd, Chicago",
      owner: "Sarah Wilson",
      type: "penthouse",
      status: "rejected",
      price: 480,
      bedrooms: 3,
      bathrooms: 3.5,
      area: 3200,
      rating: 4.7,
      created: "2023-05-11",
      featured: false
    },
    {
      id: 105,
      title: "Suburban Family Home",
      address: "222 Oak Street, Boston",
      owner: "David Taylor",
      type: "house",
      status: "approved",
      price: 190,
      bedrooms: 4,
      bathrooms: 2.5,
      area: 2200,
      rating: 4.6,
      created: "2023-05-10",
      featured: true
    },
    {
      id: 106,
      title: "Lakeside Cottage",
      address: "333 Lakeview Drive, Tahoe",
      owner: "Lisa Anderson",
      type: "cottage",
      status: "approved",
      price: 210,
      bedrooms: 2,
      bathrooms: 1,
      area: 1100,
      rating: 4.9,
      created: "2023-05-09",
      featured: false
    },
    {
      id: 107,
      title: "Urban Studio Apartment",
      address: "444 Downtown Ave, Seattle",
      owner: "James Wilson",
      type: "apartment",
      status: "pending",
      price: 120,
      bedrooms: 1,
      bathrooms: 1,
      area: 800,
      rating: 4.3,
      created: "2023-05-08",
      featured: false
    },
    {
      id: 108,
      title: "Historic Townhouse",
      address: "555 Heritage Lane, Charleston",
      owner: "Emma Garcia",
      type: "townhouse",
      status: "approved",
      price: 280,
      bedrooms: 3,
      bathrooms: 2,
      area: 2400,
      rating: 4.8,
      created: "2023-05-07",
      featured: true
    }
  ]);

  // State for filtering and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [sortField, setSortField] = useState('created');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6);

  // Available filters
  const statuses = ['all', 'approved', 'pending', 'rejected'];
  const types = ['all', 'house', 'apartment', 'villa', 'cabin', 'penthouse', 'cottage', 'townhouse'];
  const featuredOptions = ['all', 'featured', 'not-featured'];

  // Filter and sort properties
  const filteredProperties = properties
    .filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
      const matchesType = typeFilter === 'all' || property.type === typeFilter;

      let matchesFeatured = true;
      if (featuredFilter === 'featured') {
        matchesFeatured = property.featured;
      } else if (featuredFilter === 'not-featured') {
        matchesFeatured = !property.featured;
      }

      return matchesSearch && matchesStatus && matchesType && matchesFeatured;
    })
    .sort((a, b) => {
      let comparison = 0;

      if (sortField === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortField === 'price') {
        comparison = a.price - b.price;
      } else if (sortField === 'rating') {
        comparison = a.rating - b.rating;
      } else if (sortField === 'created') {
        comparison = new Date(a.created) - new Date(b.created);
      } else if (sortField === 'bedrooms') {
        comparison = a.bedrooms - b.bedrooms;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

  // Pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle delete property
  const deleteProperty = (propertyId) => {
    setProperties(properties.filter(property => property.id !== propertyId));
  };

  // Toggle property status
  const toggleStatus = (propertyId, newStatus) => {
    setProperties(properties.map(property =>
      property.id === propertyId ? { ...property, status: newStatus } : property
    ));
  };

  // Toggle featured status
  const toggleFeatured = (propertyId) => {
    setProperties(properties.map(property =>
      property.id === propertyId ? { ...property, featured: !property.featured } : property
    ));
  };

  // Get sort indicator
  const getSortIndicator = (field) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
    }
    return null;
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusClasses = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800"
    };

    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white  rounded-xl shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-lg underline font-bold ">Properties Management</h2>
          <p className="text-gray-500 text-xs dark:text-gray-400 ">
            Manage all properties on the platform ({filteredProperties.length} properties found)
          </p>
        </div>
        <Button className='text-xs' variant='secondary'>
          <Plus size={16} className="" />
          Add New Property
        </Button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 items-end">
        <div className="relative h-fit col-span-2">
          <Search size={16} className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by title, address or owner..."
            className="w-full px-6 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <Label>Status</Label>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                >
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='flex flex-col gap-1'>
          <Label>Type</Label>
          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                >
                  {type === 'all' ? 'All Types' : (
                    <span className="capitalize">
                      {type.replace(/-/g, ' ')}
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='flex flex-col gap-1'>
          <Label >Featured</Label>
          <Select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {featuredOptions.map(option => (
                <SelectItem key={option} value={option}>
                  {option === 'all' ? 'All' :
                    option === 'featured' ? 'Featured Only' : 'Not Featured'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentProperties.map(property => (
            <PropertyCard key={property.id} property={property} toggleFeatured={toggleFeatured} toggleStatus={toggleStatus} deleteProperty={deleteProperty} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-12 text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Home size={24} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No properties found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            No properties match your current filters. Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredProperties.length > propertiesPerPage && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {indexOfFirstProperty + 1} to {Math.min(indexOfLastProperty, filteredProperties.length)} of {filteredProperties.length} properties
          </div>
          <div className="flex space-x-2">
            <Button
              className={` ${currentPage === 1
                ? 'bg-gray-100  text-gray-400 cursor-not-allowed'
                : 'bg-gray-100  text-gray-700 dark:text-gray-300 hover:bg-gray-200 '
                }`}
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              <ChevronLeft size={16} />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <Button
                key={number}
                className={`  ${currentPage === number
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100  text-gray-700 dark:text-gray-300 hover:bg-gray-200 '
                  }`}
                onClick={() => paginate(number)}
              >
                {number}
              </Button>
            ))}

            <Button
              className={`${currentPage === totalPages
                ? 'bg-gray-100  text-gray-400 cursor-not-allowed'
                : 'bg-gray-100  text-gray-700 dark:text-gray-300 hover:bg-gray-200 '
                }`}
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card className="bg-indigo-50 gap-0 border-indigo-100 justify-center h-fit p-2">
          <CardHeader className="text-indigo-800  font-medium p-0">Total Properties</CardHeader>
          <CardContent className="text-xl font-bold text-gray-900 p-0">{properties.length}</CardContent>
          <CardFooter className="flex items-center text-green-600 p-0 m-0">
            <span className="text-xs m-0">+15.3% from last month</span>
          </CardFooter>
        </Card>

        <Card className="bg-green-50 gap-0 justify-center h-fit p-2 border-green-100">
          <CardHeader className="text-green-800 p-0 font-medium">Approved Properties</CardHeader>
          <CardContent className="text-xl font-bold text-gray-900  p-0">
            {properties.filter(p => p.status === 'approved').length}
          </CardContent>
          <CardFooter className="flex items-center text-green-600 m-0 p-0">
            <span className="text-xs">+8.2% from last month</span>
          </CardFooter>
        </Card>

        <Card className="bg-yellow-50  border-yellow-100 gap-0 justify-center h-fit p-2">
          <CardHeader className="text-yellow-800 p-0 font-medium">Pending Approval</CardHeader>
          <CardContent className="text-xl font-bold text-gray-900  p-0">
            {properties.filter(p => p.status === 'pending').length}
          </CardContent>
          <CardFooter className="flex items-center text-red-600 p-0 m-0">
            <span className="text-xs">-3.5% from last month</span>
          </CardFooter>
        </Card>

        <Card className="bg-purple-50  border-purple-100 gap-0 justify-center h-fit p-2">
          <CardHeader className="text-purple-800 p-0 font-medium">Featured Properties</CardHeader>
          <CardContent className="text-xl font-bold text-gray-900  p-0">
            {properties.filter(p => p.featured).length}
          </CardContent>
          <CardFooter className="flex items-center text-green-600 m-0 p-0">
            <span className="text-xs">+22.7% from last month</span>
          </CardFooter>
        </Card>
      </div>

      {/* Property Types Distribution */}
      <Card className="mt-8 bg-gray-50 p-2">
        <h3 className="text-lg font-bold text-gray-900  mb-4">Property Types Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {types.filter(t => t !== 'all').map(type => {
            const count = properties.filter(p => p.type === type).length;
            const percentage = (count / properties.length) * 100;

            return (
              <Card className="p-2   border-gray-200  bg-white ">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900  capitalize text-base">
                    {type.replace(/-/g, ' ')}
                  </span>
                  <span className="text-sm font-bold bg-indigo-100  text-indigo-600 px-2.5 py-1 rounded-full">
                    {count}
                  </span>
                </div>

                <div className="space-y-2">
                  <Progress
                    value={percentage}
                    className="h-2 rounded-full bg-gray-200  [&>div]:bg-gradient-to-r [&>div]:from-indigo-500 [&>div]:to-indigo-600"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Distribution
                    </span>
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default PropertiesPage;