import React, { useEffect, useState } from "react";

const InputComponent = () => {
  const [data, setData] = useState<any[]>([
    {
      id: 1,
      name: "Classic Margherita Pizza",
      ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Basil"],
    },
    {
      id: 2,
      name: "Spaghetti Carbonara",
      ingredients: [
        "Spaghetti",
        "Eggs",
        "Pancetta",
        "Parmesan",
        "Black pepper",
      ],
    },
    {
      id: 3,
      name: "Chicken Biryani",
      ingredients: ["Basmati rice", "Chicken", "Spices", "Onion", "Yogurt"],
    },
    {
      id: 4,
      name: "Veggie Burger",
      ingredients: ["Burger bun", "Lettuce", "Tomato", "Cheese", "Veg patty"],
    },
    {
      id: 5,
      name: "Caesar Salad",
      ingredients: ["Lettuce", "Croutons", "Parmesan", "Caesar dressing"],
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/recipes");
      const json = await response.json();
      setData(json.recipes); // ✅ ensures it's always an array
      console.log("data is" + data);
    } catch (error) {
      alert(String(error));
    }
  };

  const fetchSuggestions = () => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    if (!Array.isArray(data)) return;

    const current = data.filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    );

    setSuggestions(current);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(input);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  useEffect(() => {
    fetchSuggestions();
  }, [search]);
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          placeholder="Search here"
          onChange={handleInput}
          className="w-full px-4 py-2 rounded-md border border-gray-500 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition">
          Search
        </button>
      </div>

      {/* Suggestions */}
      <div className="mt-4 bg-gray-800 rounded-md shadow-lg p-3 space-y-2">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-2 rounded-md cursor-pointer hover:bg-gray-700 transition"
          >
            <p className="text-white">{suggestion.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputComponent;
