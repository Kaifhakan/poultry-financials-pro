
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar as CalendarIcon, Save, Eye, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ChequeManagementProps {
  showFinancials: boolean;
}

interface ChequeEntry {
  id: string;
  fromTo: string;
  amount: number;
  dateGiven: Date;
  dueDate: Date;
  status: 'pending' | 'cleared' | 'bounced';
  type: 'received' | 'given';
  linkedPerson: string;
}

const ChequeManagement = ({ showFinancials }: ChequeManagementProps) => {
  const [fromTo, setFromTo] = useState('');
  const [amount, setAmount] = useState('');
  const [dateGiven, setDateGiven] = useState<Date>(new Date());
  const [dueDate, setDueDate] = useState<Date>();
  const [status, setStatus] = useState<'pending' | 'cleared' | 'bounced'>('pending');
  const [type, setType] = useState<'received' | 'given'>('received');
  const [linkedPerson, setLinkedPerson] = useState('');
  const [entries, setEntries] = useState<ChequeEntry[]>([]);

  const people = ['Bilal Khan', 'Hammad Ali', 'Usman Sheikh', 'Tariq Ahmad', 'Ahmed Khan', 'Muhammad Ali'];

  const handleSubmit = () => {
    if (!fromTo || !amount || !dueDate || !linkedPerson) {
      alert('Please fill all required fields');
      return;
    }

    const newEntry: ChequeEntry = {
      id: Date.now().toString(),
      fromTo,
      amount: parseFloat(amount),
      dateGiven,
      dueDate,
      status,
      type,
      linkedPerson
    };

    setEntries([...entries, newEntry]);
    
    // Reset form
    setFromTo('');
    setAmount('');
    setDateGiven(new Date());
    setDueDate(undefined);
    setStatus('pending');
    setLinkedPerson('');
  };

  const updateStatus = (id: string, newStatus: 'pending' | 'cleared' | 'bounced') => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, status: newStatus } : entry
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'cleared':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Cleared</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'bounced':
        return <Badge className="bg-red-500"><XCircle className="h-3 w-3 mr-1" />Bounced</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === 'received' 
      ? <Badge className="bg-blue-500">Received</Badge>
      : <Badge className="bg-purple-500">Given</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Cheque Management Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Type Selection */}
            <div className="space-y-2">
              <Label>Cheque Type</Label>
              <Select value={type} onValueChange={(value: 'received' | 'given') => setType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="given">Given</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* From/To */}
            <div className="space-y-2">
              <Label>{type === 'received' ? 'From' : 'To'}</Label>
              <Input
                placeholder={`${type === 'received' ? 'Received from' : 'Given to'}...`}
                value={fromTo}
                onChange={(e) => setFromTo(e.target.value)}
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label>Amount (PKR)</Label>
              <Input
                type="number"
                placeholder="e.g., 50000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Date Given */}
            <div className="space-y-2">
              <Label>Date Given</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateGiven && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateGiven ? format(dateGiven, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateGiven}
                    onSelect={(date) => date && setDateGiven(date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick due date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Linked Person */}
            <div className="space-y-2">
              <Label>Linked {type === 'received' ? 'Customer' : 'Farmer'}</Label>
              <Select value={linkedPerson} onValueChange={setLinkedPerson}>
                <SelectTrigger>
                  <SelectValue placeholder="Select person" />
                </SelectTrigger>
                <SelectContent>
                  {people.map((person) => (
                    <SelectItem key={person} value={person}>
                      {person}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(value: 'pending' | 'cleared' | 'bounced') => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cleared">Cleared</SelectItem>
                  <SelectItem value="bounced">Bounced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Cheque Entry
          </Button>
        </CardContent>
      </Card>

      {/* Entries List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Cheque Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left">Type</th>
                  <th className="border border-gray-300 p-2 text-left">From/To</th>
                  <th className="border border-gray-300 p-2 text-left">Amount</th>
                  <th className="border border-gray-300 p-2 text-left">Date Given</th>
                  <th className="border border-gray-300 p-2 text-left">Due Date</th>
                  <th className="border border-gray-300 p-2 text-left">Linked Person</th>
                  <th className="border border-gray-300 p-2 text-left">Status</th>
                  <th className="border border-gray-300 p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="border border-gray-300 p-2">
                      {getTypeBadge(entry.type)}
                    </td>
                    <td className="border border-gray-300 p-2">{entry.fromTo}</td>
                    <td className="border border-gray-300 p-2 font-bold">
                      {showFinancials ? entry.amount.toLocaleString() : '***'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {format(entry.dateGiven, "dd/MM/yyyy")}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {format(entry.dueDate, "dd/MM/yyyy")}
                    </td>
                    <td className="border border-gray-300 p-2">{entry.linkedPerson}</td>
                    <td className="border border-gray-300 p-2">
                      {getStatusBadge(entry.status)}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(entry.id, 'cleared')}
                          className="text-green-600"
                        >
                          Clear
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(entry.id, 'bounced')}
                          className="text-red-600"
                        >
                          Bounce
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr>
                    <td colSpan={8} className="border border-gray-300 p-4 text-center text-gray-500">
                      No cheque entries yet. Add your first cheque entry above.
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

export default ChequeManagement;
