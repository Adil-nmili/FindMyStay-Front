import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  User
} from 'react-feather';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Card, CardContent, CardHeader, CardFooter, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'



const UsersPage = () => {
  // Mock user data with properties count
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "owner", status: "active", joined: "2023-05-15", properties: 12 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "client", status: "active", joined: "2023-05-14", properties: 0 },
    { id: 3, name: "Robert Johnson", email: "robert@example.com", role: "client", status: "pending", joined: "2023-05-13", properties: 0 },
    { id: 4, name: "Emily Davis", email: "emily@example.com", role: "owner", status: "active", joined: "2023-05-12", properties: 8 },
    { id: 5, name: "Michael Brown", email: "michael@example.com", role: "assistant", status: "active", joined: "2023-05-11", properties: 0 },
    { id: 6, name: "Sarah Wilson", email: "sarah@example.com", role: "admin", status: "active", joined: "2023-05-10", properties: 0 },
    { id: 7, name: "David Taylor", email: "david@example.com", role: "owner", status: "inactive", joined: "2023-05-09", properties: 5 },
    { id: 8, name: "Lisa Anderson", email: "lisa@example.com", role: "client", status: "active", joined: "2023-05-08", properties: 0 },
    { id: 9, name: "James Wilson", email: "james@example.com", role: "owner", status: "active", joined: "2023-05-07", properties: 15 },
    { id: 10, name: "Emma Garcia", email: "emma@example.com", role: "admin", status: "active", joined: "2023-05-06", properties: 0 },
  ]);

  // State for filtering and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [propertyFilter, setPropertyFilter] = useState('any');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  // Available roles and property count filters
  const roles = ['all', 'admin', 'owner', 'assistant', 'client'];
  const propertyOptions = [
    { value: 'any', label: 'Any' },
    { value: '0', label: 'No properties' },
    { value: '1-5', label: '1-5 properties' },
    { value: '6-10', label: '6-10 properties' },
    { value: '10+', label: '10+ properties' },
  ];

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;

      let matchesProperty = true;
      if (propertyFilter !== 'any') {
        if (propertyFilter === '0') {
          matchesProperty = user.properties === 0;
        } else if (propertyFilter === '1-5') {
          matchesProperty = user.properties >= 1 && user.properties <= 5;
        } else if (propertyFilter === '6-10') {
          matchesProperty = user.properties >= 6 && user.properties <= 10;
        } else if (propertyFilter === '10+') {
          matchesProperty = user.properties > 10;
        }
      }

      return matchesSearch && matchesRole && matchesProperty;
    })
    .sort((a, b) => {
      let comparison = 0;

      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'role') {
        comparison = a.role.localeCompare(b.role);
      } else if (sortField === 'properties') {
        comparison = a.properties - b.properties;
      } else if (sortField === 'joined') {
        comparison = new Date(a.joined) - new Date(b.joined);
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status);
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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

  // Handle delete user
  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // Get sort indicator
  const getSortIndicator = (field) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
    }
    return null;
  };

  return (
    <Card className="px-4">
      <CardDescription className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-lg font-bold underline text-gray-900 dark:text-white">Users Management</h2>
          <p className="text-gray-500 text-xs">
            Manage all users of the platform ({filteredUsers.length} users found)
          </p>
        </div>
        <Button
          variant='outline'
          className="text-xs">
          <Plus size={12} className="mr-1" />
          Add New User
        </Button>
      </CardDescription>

      {/* Filters Section */}
      <CardHeader className="grid grid-cols-1 md:grid-cols-4 gap-4  items-end">
        <div className="relative">
          <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            className="w-full px-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</Label>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Properties</Label>
          <Select value={propertyFilter} onValueChange={setPropertyFilter}>
            <SelectTrigger className="w-full px-4 py-2">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              {propertyOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            variant='secondary'
            className="w-full "
            onClick={() => {
              setSearchTerm('');
              setRoleFilter('all');
              setPropertyFilter('any');
            }}
          >
            <Filter size={16} className="mr-2" />
            Reset Filters
          </Button>
        </div>
      </CardHeader>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <Table className="min-w-full">
      <TableHeader className="bg-gray-50 dark:bg-gray-800">
        <TableRow>
          <TableHead 
            className="cursor-pointer"
            onClick={() => handleSort('name')}
          >
            <div className="flex items-center">
              User
              <span className="ml-1">{getSortIndicator('name')}</span>
            </div>
          </TableHead>
          <TableHead 
            className="cursor-pointer"
            onClick={() => handleSort('role')}
          >
            <div className="flex items-center">
              Role
              <span className="ml-1">{getSortIndicator('role')}</span>
            </div>
          </TableHead>
          <TableHead 
            className="cursor-pointer"
            onClick={() => handleSort('properties')}
          >
            <div className="flex items-center">
              Properties
              <span className="ml-1">{getSortIndicator('properties')}</span>
            </div>
          </TableHead>
          <TableHead 
            className="cursor-pointer"
            onClick={() => handleSort('status')}
          >
            <div className="flex items-center">
              Status
              <span className="ml-1">{getSortIndicator('status')}</span>
            </div>
          </TableHead>
          <TableHead 
            className="cursor-pointer"
            onClick={() => handleSort('joined')}
          >
            <div className="flex items-center">
              Joined
              <span className="ml-1">{getSortIndicator('joined')}</span>
            </div>
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white dark:bg-gray-900">
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <motion.tr
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <TableCell>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                    <User size={16} className="text-indigo-800 dark:text-indigo-200" />
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    user.role === 'admin' ? 'default' :
                    user.role === 'owner' ? 'secondary' :
                    user.role === 'assistant' ? 'outline' : 'destructive'
                  }
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Progress 
                    value={Math.min(100, user.properties * 10)} 
                    className="w-24 mr-3 h-2"
                  />
                  <span className="font-medium">{user.properties}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    user.status === 'active' ? 'default' :
                    user.status === 'pending' ? 'secondary' : 'destructive'
                  }
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {user.joined}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button className=" "
                  variant='secondary'
                  >

                    <Eye size={16} />
                  </Button>
                  <Button
                  variant='outline'
                  className="">

                    <Edit size={16} />
                  </Button>
                  <Button
                    className=" "
                    variant='destructive'
                    onClick={() => deleteUser(user.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </motion.tr>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              <div className="text-muted-foreground">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Users size={24} className="text-gray-400" />
                </div>
                No users found matching your criteria
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
      </div>

      {/* Pagination */}
      {filteredUsers.length > usersPerPage && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          <div className="flex space-x-2">
            <Button
              className={` ${currentPage === 1
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              <ChevronLeft size={16} />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <Button
                key={number}
                className={` ${currentPage === number
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                onClick={() => paginate(number)}
              >
                {number}
              </Button>
            ))}

            <Button
              className={` ${currentPage === totalPages
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
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
        <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 border border-indigo-100 dark:border-indigo-800">
          <div className="text-indigo-800 dark:text-indigo-200 font-medium">Total Users</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{users.length}</div>
          <div className="flex items-center text-green-600 dark:text-green-400 mt-2">
            <span className="text-sm">+12.3% from last month</span>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
          <div className="text-blue-800 dark:text-blue-200 font-medium">Property Owners</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {users.filter(u => u.role === 'owner').length}
          </div>
          <div className="flex items-center text-green-600 dark:text-green-400 mt-2">
            <span className="text-sm">+8.7% from last month</span>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border border-green-100 dark:border-green-800">
          <div className="text-green-800 dark:text-green-200 font-medium">Active Users</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {users.filter(u => u.status === 'active').length}
          </div>
          <div className="flex items-center text-green-600 dark:text-green-400 mt-2">
            <span className="text-sm">+5.2% from last month</span>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
          <div className="text-purple-800 dark:text-purple-200 font-medium">Total Properties</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {users.reduce((sum, user) => sum + user.properties, 0)}
          </div>
          <div className="flex items-center text-green-600 dark:text-green-400 mt-2">
            <span className="text-sm">+15.8% from last month</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UsersPage;