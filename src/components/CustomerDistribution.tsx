
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Calendar as CalendarIcon, Save, Eye, Minus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface CustomerDistributionProps {
  showFinancials: boolean;
}

interface CustomerEntry {
  id: string;
  date: Date;
  customerName: string;
  cratesGiven: number;
  kgPerCrate: number;
  totalWeight: number;
  profitPerKg: number;
  totalProfit: number;
  waste: number;
  charbi: number;
  dum: number;
  par: number;
  totalDeductions: number;
  finalAmount: number;
}

const CustomerDistribution = ({ showFinancials }: CustomerDistributionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [customerName, setCustomerName] = useState('');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [cratesGiven, setCratesGiven] = useState('');
  const [kgPerCrate, setKgPerCrate] = useState('10'); // Default 10 KG per crate
  const [profitPerKg, setProfitPerKg] = useState('');
  const [waste, setWaste] = useState('0');
  const [charbi, setCharbi] = useState('0');
  const [dum, setDum] = useState('0');
  const [par, setPar] = useState('0');
  const [entries, setEntries] = useState<CustomerEntry[]>([]);
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  const customers = ['Bilal Khan', 'Hammad Ali', 'Usman Sheikh', 'Tariq Ahmad'];

  const calculateTotals = () => {
    const crates = parseFloat(cratesGiven) || 0;
    const kgCrate = parseFloat(kgPerCrate) || 10;
    const profit = parseFloat(profitPerKg) || 0;
    const wasteAmt = parseFloat(waste) || 0;
    const charbiAmt = parseFloat(charbi) || 0;
    const dumAmt = parseFloat(dum) || 0;
    const parAmt = parseFloat(par) || 0;
    
    const totalWeight = crates * kgCrate;
    const totalProfit = totalWeight * profit;
    const totalDeductions = wasteAmt + charbiAmt + dumAmt + parAmt;
    const finalAmount = totalProfit - totalDeductions;
    
    return {
      totalWeight,
      totalProfit,
      totalDeductions,
      finalAmount
    };
  };

  const handleSubmit = () => {
    if (!customerName || !cratesGiven || !profitPerKg) {
      alert('Please fill all required fields');
      return;
    }

    const totals = calculateTotals();
    
    const newEntry: CustomerEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      customerName,
      cratesGiven: parseFloat(cratesGiven),
      kgPerCrate: parseFloat(kgPerCrate),
      totalWeight: totals.totalWeight,
      profitPerKg: parseFloat(profitPerKg),
      totalProfit: totals.totalProfit,
      waste: parseFloat(waste),
      charbi: parseFloat(charbi),
      dum: parseFloat(dum),
      par: parseFloat(par),
      totalDeductions: totals.totalDeductions,
      finalAmount: totals.finalAmount
    };

    setEntries([...entries, newEntry]);
    
    // Reset form
    setCustomerName('');
    setCratesGiven('');
    setProfitPerKg('');
    setWaste('0');
    setCharbi('0');
    setDum('0');
    setPar('0');
    setSelectedDate(new Date());
  };

  const handleAddCustomer = () => {
    if (newCustomerName.trim()) {
      customers.push(newCustomerName.trim());
      setCustomerName(newCustomerName.trim());
      setNewCustomerName('');
      setShowAddCustomer(false);
    }
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Customer Distribution Entry
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

            {/* Customer Selection */}
            <div className="space-y-2">
              <Label>Customer Name</Label>
              <div className="flex gap-2">
                <Select value={customerName} onValueChange={setCustomerName}>
                  <SelectTrigger className="flex-1">
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
                <Button
                  variant="outline"
                  onClick={() => setShowAddCustomer(!showAddCustomer)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {showAddCustomer && (
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="New customer name"
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                  />
                  <Button onClick={handleAddCustomer}>Add</Button>
                </div>
              )}
            </div>

            {/* Crates Given */}
            <div className="space-y-2">
              <Label>Crates Given</Label>
              <Input
                type="number"
                placeholder="e.g., 20"
                value={cratesGiven}
                onChange={(e) => setCratesGiven(e.target.value)}
              />
            </div>

            {/* KG per Crate */}
            <div className="space-y-2">
              <Label>KG per Crate</Label>
              <Input
                type="number"
                placeholder="e.g., 10"
                value={kgPerCrate}
                onChange={(e) => setKgPerCrate(e.target.value)}
              />
            </div>

            {/* Profit per KG */}
            <div className="space-y-2">
              <Label>Profit per KG (PKR)</Label>
              <Input
                type="number"
                placeholder="e.g., 10"
                value={profitPerKg}
                onChange={(e) => setProfitPerKg(e.target.value)}
              />
            </div>

            {/* Total Weight (Auto-calculated) */}
            <div className="space-y-2">
              <Label>Total Weight (KG)</Label>
              <div className="p-3 bg-blue-50 rounded-md text-lg font-bold text-blue-700">
                {showFinancials ? totals.totalWeight : '***'} KG
              </div>
            </div>
          </div>

          {/* Wastage Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Minus className="h-5 w-5 text-red-500" />
              Wastage Deductions (PKR)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Waste (ضائع گوشت)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={waste}
                  onChange={(e) => setWaste(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Charbi (چربی)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={charbi}
                  onChange={(e) => setCharbi(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Dum (دم)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={dum}
                  onChange={(e) => setDum(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Par (پر)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={par}
                  onChange={(e) => setPar(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Calculation Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <Label>Total Profit (PKR)</Label>
              <div className="p-3 bg-green-100 rounded-md text-lg font-bold text-green-700">
                {showFinancials ? totals.totalProfit.toLocaleString() : '***'}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Total Deductions (PKR)</Label>
              <div className="p-3 bg-red-100 rounded-md text-lg font-bold text-red-700">
                {showFinancials ? totals.totalDeductions.toLocaleString() : '***'}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Final Amount (PKR)</Label>
              <div className="p-3 bg-blue-100 rounded-md text-xl font-bold text-blue-700">
                {showFinancials ? totals.finalAmount.toLocaleString() : '***'}
              </div>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Distribution Entry
          </Button>
        </CardContent>
      </Card>

      {/* Entries List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Recent Customer Distributions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">Customer</th>
                  <th className="border border-gray-300 p-2 text-left">Crates</th>
                  <th className="border border-gray-300 p-2 text-left">Weight (KG)</th>
                  <th className="border border-gray-300 p-2 text-left">Profit/KG</th>
                  <th className="border border-gray-300 p-2 text-left">Deductions</th>
                  <th className="border border-gray-300 p-2 text-left">Final Amount</th>
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
                      {showFinancials ? entry.cratesGiven : '***'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {showFinancials ? entry.totalWeight : '***'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {showFinancials ? entry.profitPerKg : '***'}
                    </td>
                    <td className="border border-gray-300 p-2 text-red-600">
                      {showFinancials ? entry.totalDeductions.toLocaleString() : '***'}
                    </td>
                    <td className="border border-gray-300 p-2 font-bold text-green-600">
                      {showFinancials ? entry.finalAmount.toLocaleString() : '***'}
                    </td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr>
                    <td colSpan={7} className="border border-gray-300 p-4 text-center text-gray-500">
                      No distributions yet. Add your first customer distribution above.
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

export default CustomerDistribution;
