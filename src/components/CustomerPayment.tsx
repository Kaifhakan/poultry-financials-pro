
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, Calendar as CalendarIcon, Save, Eye, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface CustomerPaymentProps {
  showFinancials: boolean;
}

interface PaymentEntry {
  id: string;
  date: Date;
  customerName: string;
  totalDue: number;
  paymentType: 'cash' | 'cheque' | 'mixed';
  cashAmount: number;
  chequeAmount: number;
  chequeDueDate?: Date;
  pendingAmount: number;
}

const CustomerPayment = ({ showFinancials }: CustomerPaymentProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [customerName, setCustomerName] = useState('');
  const [totalDue, setTotalDue] = useState('');
  const [paymentType, setPaymentType] = useState<'cash' | 'cheque' | 'mixed'>('cash');
  const [cashAmount, setCashAmount] = useState('');
  const [chequeAmount, setChequeAmount] = useState('');
  const [chequeDueDate, setChequeDueDate] = useState<Date>();
  const [entries, setEntries] = useState<PaymentEntry[]>([]);

  const customers = ['Bilal Khan', 'Hammad Ali', 'Usman Sheikh', 'Tariq Ahmad'];

  const calculatePending = () => {
    const due = parseFloat(totalDue) || 0;
    const cash = parseFloat(cashAmount) || 0;
    const cheque = parseFloat(chequeAmount) || 0;
    return due - cash - cheque;
  };

  const handleSubmit = () => {
    if (!customerName || !totalDue) {
      alert('Please fill customer name and total due amount');
      return;
    }

    if (paymentType === 'cheque' && !chequeDueDate) {
      alert('Please select cheque due date');
      return;
    }

    const newEntry: PaymentEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      customerName,
      totalDue: parseFloat(totalDue),
      paymentType,
      cashAmount: parseFloat(cashAmount) || 0,
      chequeAmount: parseFloat(chequeAmount) || 0,
      chequeDueDate,
      pendingAmount: calculatePending()
    };

    setEntries([...entries, newEntry]);
    
    // Reset form
    setCustomerName('');
    setTotalDue('');
    setCashAmount('');
    setChequeAmount('');
    setChequeDueDate(undefined);
    setSelectedDate(new Date());
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Customer Payment Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date Picker */}
            <div className="space-y-2">
              <Label>Payment Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Customer Selection */}
            <div className="space-y-2">
              <Label>Customer Name</Label>
              <Select value={customerName} onValueChange={setCustomerName}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer} value={customer}>
                      {customer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Total Due */}
            <div className="space-y-2">
              <Label>Total Due Amount (PKR)</Label>
              <Input
                type="number"
                placeholder="e.g., 50000"
                value={totalDue}
                onChange={(e) => setTotalDue(e.target.value)}
              />
            </div>
          </div>

          {/* Payment Type */}
          <div className="space-y-4">
            <Label>Payment Type</Label>
            <RadioGroup value={paymentType} onValueChange={(value: 'cash' | 'cheque' | 'mixed') => setPaymentType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Cash Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cheque" id="cheque" />
                <Label htmlFor="cheque">Cheque Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mixed" id="mixed" />
                <Label htmlFor="mixed">Cash + Cheque</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Payment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(paymentType === 'cash' || paymentType === 'mixed') && (
              <div className="space-y-2">
                <Label>Cash Amount (PKR)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 25000"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                />
              </div>
            )}

            {(paymentType === 'cheque' || paymentType === 'mixed') && (
              <>
                <div className="space-y-2">
                  <Label>Cheque Amount (PKR)</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 25000"
                    value={chequeAmount}
                    onChange={(e) => setChequeAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cheque Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !chequeDueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {chequeDueDate ? format(chequeDueDate, "PPP") : <span>Pick due date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={chequeDueDate}
                        onSelect={setChequeDueDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}
          </div>

          {/* Payment Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <Label>Total Due (PKR)</Label>
              <div className="p-3 bg-blue-100 rounded-md text-lg font-bold text-blue-700">
                {showFinancials ? (parseFloat(totalDue) || 0).toLocaleString() : '***'}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Total Paid (PKR)</Label>
              <div className="p-3 bg-green-100 rounded-md text-lg font-bold text-green-700">
                {showFinancials ? ((parseFloat(cashAmount) || 0) + (parseFloat(chequeAmount) || 0)).toLocaleString() : '***'}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Pending Amount (PKR)</Label>
              <div className="p-3 bg-red-100 rounded-md text-xl font-bold text-red-700">
                {showFinancials ? calculatePending().toLocaleString() : '***'}
              </div>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Payment Entry
          </Button>
        </CardContent>
      </Card>

      {/* Entries List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Recent Payment Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">Customer</th>
                  <th className="border border-gray-300 p-2 text-left">Total Due</th>
                  <th className="border border-gray-300 p-2 text-left">Cash</th>
                  <th className="border border-gray-300 p-2 text-left">Cheque</th>
                  <th className="border border-gray-300 p-2 text-left">Cheque Due</th>
                  <th className="border border-gray-300 p-2 text-left">Pending</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="border border-gray-300 p-2">
                      {format(entry.date, "dd/MM/yyyy")}
                    </td>
                    <td className="border border-gray-300 p-2">{entry.customerName}</td>
                    <td className="border border-gray-300 p-2">
                      {showFinancials ? entry.totalDue.toLocaleString() : '***'}
                    </td>
                    <td className="border border-gray-300 p-2 text-green-600">
                      {showFinancials ? entry.cashAmount.toLocaleString() : '***'}
                    </td>
                    <td className="border border-gray-300 p-2 text-blue-600">
                      {showFinancials ? entry.chequeAmount.toLocaleString() : '***'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.chequeDueDate ? format(entry.chequeDueDate, "dd/MM/yyyy") : '-'}
                    </td>
                    <td className="border border-gray-300 p-2 font-bold text-red-600">
                      {showFinancials ? entry.pendingAmount.toLocaleString() : '***'}
                    </td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr>
                    <td colSpan={7} className="border border-gray-300 p-4 text-center text-gray-500">
                      No payment entries yet. Add your first payment entry above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerPayment;
