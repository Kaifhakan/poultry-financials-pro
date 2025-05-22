
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Eye, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface BillGenerationProps {
  showFinancials: boolean;
}

const BillGeneration = ({ showFinancials }: BillGenerationProps) => {
  const [selectedBillType, setSelectedBillType] = useState<'farmer' | 'customer'>('farmer');
  const [selectedPerson, setSelectedPerson] = useState('');

  const farmers = ['Ahmed Khan', 'Muhammad Ali', 'Hassan Sheikh', 'Bilal Ahmad'];
  const customers = ['Bilal Khan', 'Hammad Ali', 'Usman Sheikh', 'Tariq Ahmad'];

  // Sample data - in real app this would come from state management
  const sampleFarmerBill = {
    name: 'Ahmed Khan',
    date: new Date(),
    entries: [
      { date: '2024-01-15', crates: 100, weight: 1000, rate: 500, total: 500000 },
      { date: '2024-01-16', crates: 80, weight: 800, rate: 510, total: 408000 },
    ],
    totalAmount: 908000,
    paidAmount: 500000,
    pendingAmount: 408000
  };

  const sampleCustomerBill = {
    name: 'Bilal Khan',
    date: new Date(),
    entries: [
      { date: '2024-01-15', crates: 20, weight: 200, profit: 10, total: 2000, deductions: 100, final: 1900 },
      { date: '2024-01-16', crates: 15, weight: 150, profit: 12, total: 1800, deductions: 50, final: 1750 },
    ],
    totalAmount: 3650,
    paidAmount: 2000,
    pendingAmount: 1650
  };

  const generateBill = () => {
    if (!selectedPerson) {
      alert('Please select a person to generate bill');
      return;
    }
    
    // In real app, this would generate and download PDF
    alert(`${selectedBillType === 'farmer' ? 'Farmer' : 'Customer'} bill generated for ${selectedPerson}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Bill Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bill Type</label>
              <Select value={selectedBillType} onValueChange={(value: 'farmer' | 'customer') => setSelectedBillType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bill type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">Farmer Bill</SelectItem>
                  <SelectItem value="customer">Customer Bill</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {selectedBillType === 'farmer' ? 'Select Farmer' : 'Select Customer'}
              </label>
              <Select value={selectedPerson} onValueChange={setSelectedPerson}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${selectedBillType}`} />
                </SelectTrigger>
                <SelectContent>
                  {(selectedBillType === 'farmer' ? farmers : customers).map((person) => (
                    <SelectItem key={person} value={person}>
                      {person}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={generateBill} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Generate Bill
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bill Preview */}
      {selectedPerson && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Bill Preview - {selectedBillType === 'farmer' ? 'Farmer' : 'Customer'} Bill
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 bg-white p-6 border rounded-lg">
              {/* Header */}
              <div className="text-center border-b pb-4">
                <h2 className="text-2xl font-bold">🐓 ARSHAD POULTRY</h2>
                <p className="text-lg">Supply Service</p>
                <p className="text-sm text-gray-600">Complete Poultry Solutions</p>
              </div>

              {/* Bill Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {selectedBillType === 'farmer' ? 'Farmer' : 'Customer'} Bill
                  </h3>
                  <p><strong>Name:</strong> {selectedPerson}</p>
                  <p><strong>Date:</strong> {format(new Date(), "dd/MM/yyyy")}</p>
                </div>
                <div className="text-right">
                  <p><strong>Bill #:</strong> {selectedBillType.toUpperCase()}-{Date.now().toString().slice(-6)}</p>
                  <p><strong>Status:</strong> <span className="text-orange-600">Pending</span></p>
                </div>
              </div>

              {/* Bill Details */}
              {selectedBillType === 'farmer' ? (
                <div className="space-y-4">
                  <h4 className="font-semibold">Purchase Details:</h4>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-2 text-left">Date</th>
                        <th className="border border-gray-300 p-2 text-left">Crates</th>
                        <th className="border border-gray-300 p-2 text-left">Weight (KG)</th>
                        <th className="border border-gray-300 p-2 text-left">Rate/KG</th>
                        <th className="border border-gray-300 p-2 text-left">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleFarmerBill.entries.map((entry, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 p-2">{entry.date}</td>
                          <td className="border border-gray-300 p-2">{showFinancials ? entry.crates : '***'}</td>
                          <td className="border border-gray-300 p-2">{showFinancials ? entry.weight : '***'}</td>
                          <td className="border border-gray-300 p-2">{showFinancials ? entry.rate : '***'}</td>
                          <td className="border border-gray-300 p-2 font-bold">
                            PKR {showFinancials ? entry.total.toLocaleString() : '***'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="font-semibold">Distribution Details:</h4>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-2 text-left">Date</th>
                        <th className="border border-gray-300 p-2 text-left">Crates</th>
                        <th className="border border-gray-300 p-2 text-left">Weight (KG)</th>
                        <th className="border border-gray-300 p-2 text-left">Profit/KG</th>
                        <th className="border border-gray-300 p-2 text-left">Deductions</th>
                        <th className="border border-gray-300 p-2 text-left">Final Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleCustomerBill.entries.map((entry, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 p-2">{entry.date}</td>
                          <td className="border border-gray-300 p-2">{showFinancials ? entry.crates : '***'}</td>
                          <td className="border border-gray-300 p-2">{showFinancials ? entry.weight : '***'}</td>
                          <td className="border border-gray-300 p-2">{showFinancials ? entry.profit : '***'}</td>
                          <td className="border border-gray-300 p-2 text-red-600">
                            {showFinancials ? entry.deductions : '***'}
                          </td>
                          <td className="border border-gray-300 p-2 font-bold text-green-600">
                            PKR {showFinancials ? entry.final.toLocaleString() : '***'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-lg font-bold">
                      PKR {showFinancials ? (selectedBillType === 'farmer' ? sampleFarmerBill.totalAmount : sampleCustomerBill.totalAmount).toLocaleString() : '***'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Paid Amount</p>
                    <p className="text-lg font-bold text-green-600">
                      PKR {showFinancials ? (selectedBillType === 'farmer' ? sampleFarmerBill.paidAmount : sampleCustomerBill.paidAmount).toLocaleString() : '***'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending Amount</p>
                    <p className="text-lg font-bold text-red-600">
                      PKR {showFinancials ? (selectedBillType === 'farmer' ? sampleFarmerBill.pendingAmount : sampleCustomerBill.pendingAmount).toLocaleString() : '***'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-sm text-gray-600 border-t pt-4">
                <p>Thank you for your business!</p>
                <p>For queries, contact: +92-XXX-XXXXXXX</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BillGeneration;
