import type React from "react";
import { useState } from "react";
import {
  DollarSign,
  Plus,
  Trash2,
  Utensils,
  Briefcase,
  MapPin,
  Car,
} from "lucide-react";

type ExpenseCategory =
  | "Food & Dining"
  | "Accommodation"
  | "Activities"
  | "Hotel Booking"
  | "Car Rental"
  | "Local Tours";

type BookingMethod = "Direct" | "OurSite";

interface Expense {
  id: number;
  category: ExpenseCategory;
  amount: number;
  bookingMethod: BookingMethod;
}

const iconMap: Record<ExpenseCategory, JSX.Element> = {
  "Food & Dining": <Utensils className="h-5 w-5 text-pink-600" />,
  Accommodation: <Briefcase className="h-5 w-5 text-blue-600" />,
  Activities: <MapPin className="h-5 w-5 text-purple-600" />,
  "Hotel Booking": <Briefcase className="h-5 w-5 text-indigo-600" />,
  "Car Rental": <Car className="h-5 w-5 text-orange-600" />,
  "Local Tours": <MapPin className="h-5 w-5 text-green-600" />,
};

const bgMap: Record<ExpenseCategory, string> = {
  "Food & Dining": "bg-pink-100",
  Accommodation: "bg-blue-100",
  Activities: "bg-purple-100",
  "Hotel Booking": "bg-indigo-100",
  "Car Rental": "bg-orange-100",
  "Local Tours": "bg-green-100",
};

interface AISuggestions {
  [category: string]: number;
}

// ✅ MOCK: Simulate AI API response using Gemini/OpenAI etc.
const mockFetchAISuggestions = async (destination: string, budget: number): Promise<AISuggestions> => {
  await new Promise((res) => setTimeout(res, 1000)); // simulate latency
  return {
    "Food & Dining": Math.round(budget * 0.25),
    Accommodation: Math.round(budget * 0.35),
    Activities: Math.round(budget * 0.2),
    "Car Rental": Math.round(budget * 0.1),
    "Local Tours": Math.round(budget * 0.1),
  };
};

const BudgetTracker: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [totalBudget, setTotalBudget] = useState(25000);
  const [destination, setDestination] = useState("New York");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({
    category: "Food & Dining" as ExpenseCategory,
    amount: "",
    bookingMethod: "Direct" as BookingMethod,
  });

  const [aiSuggestions, setAISuggestions] = useState<AISuggestions | null>(null);
  const [loadingAISuggestions, setLoadingAISuggestions] = useState(false);

  const spent = expenses.reduce((acc, e) => acc + e.amount + (e.bookingMethod === "OurSite" ? e.amount * 0.1 : 0), 0);
  const remaining = totalBudget - spent;

  const handleAddExpense = () => {
    const amount = parseFloat(newExpense.amount);
    if (!amount || amount <= 0) return;
    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        category: newExpense.category,
        amount,
        bookingMethod: newExpense.bookingMethod,
      },
    ]);
    setNewExpense({ ...newExpense, amount: "" });
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const groupedExpenses = expenses.reduce((acc, curr) => {
    acc[curr.category] = acc[curr.category] || [];
    acc[curr.category].push(curr);
    return acc;
  }, {} as Record<ExpenseCategory, Expense[]>);

  const handleGetAISuggestions = async () => {
    setLoadingAISuggestions(true);
    try {
      const data = await mockFetchAISuggestions(destination, totalBudget);
      setAISuggestions(data);
    } catch (err) {
      console.error("AI suggestion fetch failed:", err);
    } finally {
      setLoadingAISuggestions(false);
    }
  };

  const tripPlans = [
    {
      label: "Low Budget (₹10,000)",
      details: ["Hostel stays", "Street food", "Free activities"],
    },
    {
      label: "Medium Budget (₹25,000)",
      details: ["Mid-range hotels", "Restaurants", "Day trips"],
    },
    {
      label: "High Budget (₹50,000+)",
      details: ["Luxury resorts", "Fine dining", "Private tours"],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <DollarSign className={`h-6 w-6 ${isDarkMode ? "text-pink-400" : "text-pink-600"}`} />
        <h1 className="text-2xl font-bold text-gray-600">Trip Budget</h1>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Total Budget (₹)</label>
          <input
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(Number(e.target.value))}
            className="border rounded p-2 text-sm w-48"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border rounded p-2 text-sm w-48"
          />
        </div>
        <button
          onClick={handleGetAISuggestions}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {loadingAISuggestions ? "Loading..." : "Get AI Suggestions"}
        </button>
      </div>

      {/* Summary Panel */}
      <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}>
        <div className="flex justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500">Total Budget</p>
            <p className="text-xl font-bold text-blue-400">₹{totalBudget.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Spent</p>
            <p className="text-xl font-bold text-red-400">₹{spent.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Remaining</p>
            <p className="text-xl font-bold text-green-400">₹{remaining.toLocaleString()}</p>
          </div>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
          <div className="h-full bg-gradient-to-r from-pink-500 to-blue-500 rounded-full" style={{ width: `${(spent / totalBudget) * 100}%` }}></div>
        </div>

        {/* New Expense Input */}
        <div className="flex flex-wrap gap-2 mb-6 items-center">
          <select
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as ExpenseCategory })}
            className="border rounded p-2 text-sm"
          >
            {Object.keys(iconMap).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            className="border rounded p-2 w-32 text-sm"
          />
          <select
            value={newExpense.bookingMethod}
            onChange={(e) => setNewExpense({ ...newExpense, bookingMethod: e.target.value as BookingMethod })}
            className="border rounded p-2 text-sm"
          >
            <option value="Direct">Direct</option>
            <option value="OurSite">Via Our Site</option>
          </select>
          <button onClick={handleAddExpense} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Expenses by Category */}
        <div className="space-y-4">
          {Object.entries(groupedExpenses).map(([category, items]) => (
            <div key={category} className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50"} flex justify-between items-center`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${bgMap[category as ExpenseCategory]}`}>
                  {iconMap[category as ExpenseCategory]}
                </div>
                <div>
                  <p className="font-medium text-purple-400">{category}</p>
                  <p className="text-sm text-gray-500">{items.length} item(s)</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <p className="font-bold text-blue-500">
                  ₹
                  {items.reduce((acc, cur) => acc + cur.amount + (cur.bookingMethod === "OurSite" ? cur.amount * 0.1 : 0), 0).toLocaleString()}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {items.map((exp) => {
                    const extra = exp.bookingMethod === "OurSite" ? exp.amount * 0.1 : 0;
                    return (
                      <div key={exp.id} className="text-xs text-gray-600 flex items-center space-x-1">
                        <span>
                          {exp.amount.toLocaleString()}
                          {extra > 0 && <span className="text-orange-600 font-bold"> +₹{extra.toLocaleString()}</span>}
                        </span>
                        <button onClick={() => handleDeleteExpense(exp.id)} className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Suggestions */}
      {aiSuggestions && (
        <div className="p-6 rounded-xl shadow-sm bg-yellow-50">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">AI Budget Suggestions for {destination}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(aiSuggestions).map(([category, amount]) => (
              <div key={category} className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} flex justify-between`}>
                <span className="text-sm text-gray-500">{category}</span>
                <span className="font-bold text-blue-500">₹{amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Static Plans */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-600">Suggested Trip Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tripPlans.map((plan, idx) => (
            <div key={idx} className={`rounded-xl p-4 ${isDarkMode ? "bg-gray-700 border border-gray-600" : "bg-gray-100"}`}>
              <h3 className="font-bold text-blue-500 mb-2">{plan.label}</h3>
              <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                {plan.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;