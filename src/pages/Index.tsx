
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Plus, Calendar, Users, Truck, DollarSign, FileText, PieChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FarmerInventory from '@/components/FarmerInventory';
import CustomerDistribution from '@/components/CustomerDistribution';
import CustomerPayment from '@/components/CustomerPayment';
import ChequeManagement from '@/components/ChequeManagement';
import TruckExpense from '@/components/TruckExpense';
import OwnerExpense from '@/components/OwnerExpense';
import StaffModule from '@/components/StaffModule';
import BillGeneration from '@/components/BillGeneration';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [showFinancials, setShowFinancials] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🐓 ARSHAD POULTRY</h1>
              <p className="text-lg text-gray-600">Supply Service Management System</p>
            </div>
            <Button
              onClick={() => setShowFinancials(!showFinancials)}
              variant={showFinancials ? "default" : "outline"}
              className="flex items-center gap-2 px-6 py-3 text-lg"
            >
              {showFinancials ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              {showFinancials ? 'Hide Financials' : 'Show Financials'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1 bg-white shadow-sm p-1">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 text-sm">
              <PieChart className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="farmer" className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              Farmers
            </TabsTrigger>
            <TabsTrigger value="customer" className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="cheque" className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4" />
              Cheques
            </TabsTrigger>
            <TabsTrigger value="truck" className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4" />
              Truck
            </TabsTrigger>
            <TabsTrigger value="owner" className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4" />
              Owner
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              Staff
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard showFinancials={showFinancials} />
          </TabsContent>

          <TabsContent value="farmer">
            <FarmerInventory showFinancials={showFinancials} />
          </TabsContent>

          <TabsContent value="customer">
            <CustomerDistribution showFinancials={showFinancials} />
          </TabsContent>

          <TabsContent value="payment">
            <CustomerPayment showFinancials={showFinancials} />
          </TabsContent>

          <TabsContent value="cheque">
            <ChequeManagement showFinancials={showFinancials} />
          </TabsContent>

          <TabsContent value="truck">
            <TruckExpense showFinancials={showFinancials} />
          </TabsContent>

          <TabsContent value="owner">
            <OwnerExpense showFinancials={showFinancials} />
          </TabsContent>

          <TabsContent value="staff">
            <StaffModule showFinancials={showFinancials} />
          </TabsContent>
        </Tabs>

        {/* Bills Section */}
        <div className="mt-8">
          <BillGeneration showFinancials={showFinancials} />
        </div>
      </div>
    </div>
  );
};

export default Index;
