import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'
import { Card,CardContent,CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
//   LayoutDashboard, 
  Users, 
  Home, 
  Calendar, 
  AlertCircle, 
  Settings,
  TrendingUp,
  UserCheck,
  Star,
  DollarSign,
  ChevronRight,
  MoreHorizontal,
  CheckCircle,
  XCircle
} from 'react-feather';
import { OverviewChart } from '../../components/charts/OverviewChart';
import { ChartPieLabel } from '../../components/charts/TypeChart';
import PendingProperties from '../../components/carts/PendingProperties';
import RecentUsers from '../../components/carts/RecentUsers';
import RecentBookings from '../../components/carts/RecentBookings';
import OpenComplaints from '../../components/carts/OpenComplaints';
// Mock data for demonstration
const dashboardData = {
  stats: [
    { id: 1, title: "Total Users", value: "1,254", icon: <Users size={20} />, trend: "+12.3%", color: "bg-blue-500" },
    { id: 2, title: "Properties", value: "567", icon: <Home size={20} />, trend: "+5.2%", color: "bg-green-500" },
    { id: 3, title: "Bookings", value: "324", icon: <Calendar size={20} />, trend: "+18.7%", color: "bg-purple-500" },
    { id: 4, title: "Revenue", value: "$84,250", icon: <DollarSign size={20} />, trend: "+22.4%", color: "bg-amber-500" },
  ],
  recentUsers: [
    { id: 1, name: "John Doe", email: "john@example.com", role: "owner", joined: "2023-05-15", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "client", joined: "2023-05-14", status: "active" },
    { id: 3, name: "Robert Johnson", email: "robert@example.com", role: "client", joined: "2023-05-13", status: "pending" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", role: "owner", joined: "2023-05-12", status: "active" },
  ],
  pendingProperties: [
    { id: 101, title: "Luxury Beach Villa", owner: "John Doe", price: 350, submitted: "2023-05-14", status: "pending" },
    { id: 102, title: "Downtown Loft Apartment", owner: "Emily Davis", price: 180, submitted: "2023-05-13", status: "pending" },
    { id: 103, title: "Mountain Cabin Retreat", owner: "Michael Brown", price: 220, submitted: "2023-05-12", status: "pending" },
  ],
  recentBookings: [
    { id: 1001, property: "Beach Villa", client: "Alex Turner", dates: "Jun 15-22, 2023", amount: 2450, status: "confirmed" },
    { id: 1002, property: "City Apartment", client: "Sarah Miller", dates: "Jun 18-25, 2023", amount: 1260, status: "completed" },
    { id: 1003, property: "Mountain Cabin", client: "David Wilson", dates: "Jun 20-27, 2023", amount: 1540, status: "pending" },
  ],
  openComplaints: [
    { id: 501, reporter: "Mark Johnson", reported: "John Doe", property: "Beach Villa", type: "Property Condition", status: "open" },
    { id: 502, reporter: "Lisa Anderson", reported: "Emily Davis", property: "Downtown Loft", type: "Payment Issue", status: "in_progress" },
  ],
};


const AdminDashboard = () => {

  return (
    <div className="min-h-screen ">
      <div className="w-full">
        <main className=" ">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
            {dashboardData.stats.map((stat) => (
              <Card key={stat.id} className='py-2 px-4'>
                <CardContent className="flex p-0 justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">{stat.title}</p>
                    <h3 className="text-md font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-green-600 text-[10px] font-medium mt-1 flex items-center">
                      <TrendingUp size={12} className="" /> {stat.trend}
                    </p>
                  </div>
                  <Button className={`${stat.color}  rounded-lg text-white`}>
                    {stat.icon}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Charts and Data */}
          <div className="w-full flex items-center gap-6 mb-6">
            <OverviewChart />
            <ChartPieLabel />
          </div>
          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PendingProperties data={dashboardData.pendingProperties} />
            <RecentUsers data={dashboardData.recentUsers} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <RecentBookings data={dashboardData.recentBookings}/>
            <OpenComplaints data={dashboardData.openComplaints}/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;