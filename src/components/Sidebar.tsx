import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResposne {
  products: Product[];
}

const Sidebar = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const {
    searchQuery,
    setsearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keywords,
    setKeyword,
  } = useFilter();
  const [keyword] = useState<string[]>([
    "Apple",
    "Watch",
    "Fashion",
    "Trends",
    "Shoes",
    "Shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resposne = await fetch("https://dummyjson.com/products");
        const data: FetchResposne = await resposne.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product: Product) => product.category))
        );
        console.log("uniqueCategories========>", uniqueCategories);
        setCategories(uniqueCategories);
      } catch (error) {
        console.log("Error fetching Products", error);
      }
    };
    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setMinPrice(undefined);
    } else {
      const price = parseInt(value);
      if (!isNaN(price)) {
        setMinPrice(price);
      }
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setMaxPrice(undefined);
    } else {
      const price = parseInt(value);
      if (!isNaN(price)) {
        setMaxPrice(price);
      }
    }
  }

  const handleRadioChange = (category: string) => {
    setSelectedCategory(category);
  }

  const handleKeywordClick = (keyword: string) => {
    setKeyword([keyword]);
  }

  const handleResetFilters = () => {
    setSelectedCategory("");
    setMaxPrice(undefined);
    setKeyword([]);
    setsearchQuery("");
    setMinPrice(undefined);
  }


  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-14 mt-4"></h1>
      <section>
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="Search Products"
          name="search_product"
          value={searchQuery}
          onChange={(e) => setsearchQuery(e.target.value)}
        />
        <div className="flex justify-center item-center">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ''}
            onChange={handleMinPriceChange}>
          </input>
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ''}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* {categories section} */}

        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
        </div>

        <section>
          {categories.map((category, index) => {
            return (
              <div key={index} className="mb-3">
                <input
                  type="radio"
                  name="category"
                  id={category}
                  value={category}
                  onChange={() => handleRadioChange(category)}
                  checked={selectedCategory === category}
                  className="mr-2 w-[16px] h-[16px]"
                />
                <label htmlFor={category} className="ml-2">
                  {category.toUpperCase()}
                </label>
              </div>
            );
          })}
        </section>

        {/* {Keywords section} */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
        </div>
        <div>
          {keyword.map((keyword, index) => {
            return (
              <button
                key={index}
                className="block mb-2 px-4 w-full text-left border rounded hover:bg-gray-200"
                onClick={() => handleKeywordClick(keyword)}
              >
                {keyword}
              </button>
            );
          })}
        </div>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-5" onClick={handleResetFilters}>
            Reset Filter
          </button>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
