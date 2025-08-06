// src/components/BookingPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {  Card, CardHeader,  CardTitle,  CardContent, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Table,TableHeader,TableRow,TableHead,TableBody,TableCell,} from '@/components/ui/table'
import {Select, SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select'
import { Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs'
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Home, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ChevronDown,
  ChevronRight,
  Plus,
  MoreVertical
} from 'lucide-react';

const BookingPage = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample booking data
  const bookings = [
    {
      id: 'BK001',
      guest: 'Michael Johnson',
      property: 'Luxury Ocean Villa',
      checkIn: '2023-06-15',
      checkOut: '2023-06-22',
      nights: 7,
      total: 4200,
      status: 'confirmed',
      bookingDate: '2023-05-10'
    },
    {
      id: 'BK002',
      guest: 'Sarah Williams',
      property: 'Downtown Penthouse',
      checkIn: '2023-06-18',
      checkOut: '2023-06-25',
      nights: 7,
      total: 3850,
      status: 'pending',
      bookingDate: '2023-05-12'
    },
    {
      id: 'BK003',
      guest: 'Robert Chen',
      property: 'Mountain Retreat',
      checkIn: '2023-07-05',
      checkOut: '2023-07-12',
      nights: 7,
      total: 3150,
      status: 'completed',
      bookingDate: '2023-04-20'
    },
    {
      id: 'BK004',
      guest: 'Emma Thompson',
      property: 'Beachfront Paradise',
      checkIn: '2023-06-28',
      checkOut: '2023-07-05',
      nights: 7,
      total: 4900,
      status: 'confirmed',
      bookingDate: '2023-05-01'
    },
    {
      id: 'BK005',
      guest: 'David Wilson',
      property: 'City Luxury Loft',
      checkIn: '2023-07-10',
      checkOut: '2023-07-17',
      nights: 7,
      total: 3500,
      status: 'cancelled',
      bookingDate: '2023-04-15'
    }
  ];

  const statusColors = {
    confirmed: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300',
    pending: 'bg-amber-500/20 text-amber-600 dark:text-amber-300',
    completed: 'bg-blue-500/20 text-blue-600 dark:text-blue-300',
    cancelled: 'bg-rose-500/20 text-rose-600 dark:text-rose-300'
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch = booking.guest.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          booking.property.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Booking Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage all your property bookings in one place
        </p>
      </div>

      {/* Filters and Controls */}
      <Card className="mb-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bookings..."
                className="pl-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-gray-400" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <SelectValue placeholder="Filter by date" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="past">Past Bookings</SelectItem>
                <SelectItem value="all">All Dates</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</p>
                <h3 className="text-2xl font-bold mt-1">24</h3>
              </div>
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-emerald-600 dark:text-emerald-400">
              <span className="font-medium">↑ 12%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                <h3 className="text-2xl font-bold mt-1">$42,560</h3>
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-emerald-600 dark:text-emerald-400">
              <span className="font-medium">↑ 18%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Occupancy Rate</p>
                <h3 className="text-2xl font-bold mt-1">78%</h3>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                <Home className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-rose-600 dark:text-rose-400">
              <span className="font-medium">↓ 3%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending Actions</p>
                <h3 className="text-2xl font-bold mt-1">5</h3>
              </div>
              <div className="bg-rose-100 dark:bg-rose-900/30 p-3 rounded-full">
                <Clock className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="link" className="text-indigo-600 dark:text-indigo-400 p-0 h-auto">
                View details
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bookings Table */}
      <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <CardHeader className="border-b border-gray-200 dark:border-gray-800">
          <CardTitle className="flex items-center">
            <span>Recent Bookings</span>
            <Badge className="ml-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
              {filteredBookings.length} bookings
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-800">
              <TableRow>
                <TableHead className="w-[120px]">Booking ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Nights</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <motion.tr 
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      {booking.guest}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2 text-gray-500" />
                      {booking.property}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>Check-in: {booking.checkIn}</span>
                      <span>Check-out: {booking.checkOut}</span>
                    </div>
                  </TableCell>
                  <TableCell>{booking.nights}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                      {booking.total.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${statusColors[booking.status]} rounded-full px-3 py-1`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button size="icon" className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-800/50">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="icon" className="rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-800/50">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button size="icon" variant="outline" className="rounded-full border-gray-300 dark:border-gray-700">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upcoming Check-ins */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <CardHeader className="border-b border-gray-200 dark:border-gray-800">
            <CardTitle>Upcoming Check-ins</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredBookings.slice(0, 3).map(booking => (
                <motion.div 
                  key={booking.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{booking.property}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {booking.guest} • {booking.checkIn}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                      {booking.nights} nights
                    </Badge>
                    <Button variant="outline" className="rounded-full">
                      Details <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <CardHeader className="border-b border-gray-200 dark:border-gray-800">
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">$8,450</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Expected this month</p>
              </div>
              <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300">
                +15.3% from last month
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Completed</span>
                  <span className="text-sm font-medium">$5,250</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: '62%' }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Pending</span>
                  <span className="text-sm font-medium">$1,800</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full" 
                    style={{ width: '21%' }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Upcoming</span>
                  <span className="text-sm font-medium">$1,400</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full" 
                    style={{ width: '17%' }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default BookingPage;