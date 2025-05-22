
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

interface DashboardProps {
  showFinancials: boolean;
}

const Dashboard = ({ showFinancials }: DashboardProps) => {
  // Sample data - in real app this would come from state management
  const todayStats = {
    totalFarmers: 5,
    totalCrates: showFinancials ? 250 : '***',
    totalWeight: showFinancials ? '2500 KG' : '*** KG',
    totalRevenue: showFinancials ? 'PKR 1,250,000' : 'PKR ***',
    totalProfit: showFinancials ? 'PKR 125,000' : 'PKR ***',
    pendingPayments: showFinancials ? 'PKR 450,000' : 'PKR ***',
    chequesDueToday: 3,
    truckExpenses: showFinancials ? 'PKR 15,000' : 'PKR ***',
    ownerExpenses: showFinancials ? 'PKR 25,000' : 'PKR ***'
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.totalRevenue}</div>
            <p className="text-xs text-green-100">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        {/* Profit Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Profit</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.totalProfit}</div>
            <p className="text-xs text-blue-100">
              +8% from yesterday
            </p>
          </CardContent>
        </Card>

        {/* Pending Payments */}
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <AlertCircle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.pendingPayments}</div>
            <p className="text-xs text-orange-100">
              5 customers pending
            </p>
          </CardContent>
        </Card>

        {/* Cheques Due */}
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cheques Due Today</CardTitle>
            <Calendar className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{showFinancials ? todayStats.chequesDueToday : '***'}</div>
            <p className="text-xs text-purple-100">
              Follow up required
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Operations Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Farmers</span>
              <span className="text-lg font-bold">{todayStats.totalFarmers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Crates</span>
              <span className="text-lg font-bold">{todayStats.totalCrates}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Weight</span>
              <span className="text-lg font-bold">{todayStats.totalWeight}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Truck Expenses</span>
              <span className="text-lg font-bold text-red-600">{todayStats.truckExpenses}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Owner Expenses</span>
              <span className="text-lg font-bold text-red-600">{todayStats.ownerExpenses}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Net Profit</span>
              <span className="text-lg font-bold text-green-600">{showFinancials ? 'PKR 85,000' : 'PKR ***'}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Ahmed delivered 50 crates to Bilal</span>
              <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Payment received from Hammad - PKR {showFinancials ? '25,000' : '***'}</span>
              <span className="text-xs text-gray-500 ml-auto">3 hours ago</span>
            </div>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span className="text-sm">Cheque due from Ali tomorrow</span>
              <span className="text-xs text-gray-500 ml-auto">Today</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
