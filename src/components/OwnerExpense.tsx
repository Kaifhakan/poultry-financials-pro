
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DollarSign, Calendar as CalendarIcon, Save, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface OwnerExpenseProps {
  showFinancials: boolean;
}

interface OwnerExpenseEntry {
  id: string;
  date: Date;
  businessWithdrawal: number;
  miscellaneous: number;
  description: string;
  totalExpense: number;
}

const OwnerExpense = ({ showFinancials }: OwnerExpenseProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [businessWithdrawal, setBusinessWithdrawal] = useState('');
  const [miscellaneous, setMiscellaneous] = useState('');
  const [description, setDescription] = useState('');
  const [entries, setEntries] = useState<OwnerExpenseEntry[]>([]);

  const calculateTotal = () => {
    const withdrawal = parseFloat(businessWithdrawal) || 0;
    const misc = parseFloat(miscellaneous) || 0;
    return withdrawal + misc;
  };

  const handleSubmit = () => {
    if (!businessWithdrawal && !miscellaneous) {
      alert('Please enter at least one expense amount');
      return;
    }

    const newEntry: OwnerExpenseEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      businessWithdrawal: parseFloat(businessWithdrawal) || 0,
      miscellaneous: parseFloat(miscellaneous) || 0,
      description,
      totalExpense: calculateTotal()
    };

    setEntries([...entries, newEntry]);
    
    // Reset form
    setBusinessWithdrawal('');
    setMiscellaneous('');
    setDescription('');
    setSelectedDate(new Date());
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Owner Expense Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date Picker */}
            <div className="space-y-2">
              <Label>Date</Label>
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

            {/* Business Withdrawal */}
            <div className="space-y-2">
              <Label>Business Withdrawal (PKR)</Label>
              <Input
                type="number"
                placeholder="e.g., 25000"
                value={businessWithdrawal}
                onChange={(e) => setBusinessWithdrawal(e.target.value)}
              />
            </div>

            {/* Miscellaneous Expenses */}
            <div className="space-y-2">
              <Label>Miscellaneous Expenses (PKR)</Label>
              <Input
                type="number"
                placeholder="e.g., 5000"
                value={miscellaneous}
                onChange={(e) => setMiscellaneous(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2 lg:col-span-3">
              <Label>Description (Optional)</Label>
              <Input
                placeholder="e.g., Personal use, office supplies, etc..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Total Calculation */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Owner Expense:</span>
              <span className="text-2xl font-bold text-red-600">
                PKR {showFinancials ? calculateTotal().toLocaleString() : '***'}
              </span>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Owner Expense
          </Button>
        </CardContent>
      </Card>

      {/* Entries List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Recent Owner Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">Business Withdrawal</th>
                  <th className="border border-gray-300 p-2 text-left">Miscellaneous</th>
                  <th className="border border-gray-300 p-2 text-left">Total</th>
                  <th className="border border-gray-300 p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="border border-gray-300 p-2">
                      {format(entry.date, "dd/MM/yyyy")}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {showFinancials ? entry.businessWithdrawal.toLocaleString() : '***'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {showFinancials ? entry.miscellaneous.toLocaleString() : '***'}
                    </td>
                    <td className="border border-gray-300 p-2 font-bold text-red-600">
                      {showFinancials ? entry.totalExpense.toLocaleString() : '***'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.description || '-'}
                    </td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr>
                    <td colSpan={5} className="border border-gray-300 p-4 text-center text-gray-500">
                      No owner expenses yet. Add your first owner expense above.
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

export default OwnerExpense;
