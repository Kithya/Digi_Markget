import { ChevronDown, Filter, XIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = ({
  showFilterPhone,
  setShowFilterPhone,
  filters,
  setFilters,
}) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [expendedSections, setExpendedSections] = useState({
    platform: true,
    price: true,
    followers: true,
    niche: true,
    status: true,
  });
  const navigate = useNavigate();
  const platforms = [
    { value: "youtube", label: "Youtube" },
    { value: "instagram", label: "Instagram" },
    { value: "tiktok", label: "Tiktok" },
    { value: "facebook", label: "Facebook" },
    { value: "twitter", label: "Twitter" },
    { value: "linkedin", label: "Linkedin" },
    { value: "pinterest", label: "Pinterest" },
    { value: "snapchat", label: "Snapchat" },
    { value: "twitch", label: "Twitch" },
    { value: "discord", label: "Discord" },
  ];

  const niches = [
    { value: "entertainment", label: "Entertainment" },
    { value: "music", label: "Music" },
    { value: "sports", label: "Sports" },
    { value: "news", label: "News" },
    { value: "gaming", label: "Gaming" },
    { value: "fashion", label: "Fashion" },
    { value: "food", label: "Food" },
    { value: "travel", label: "Travel" },
    { value: "health", label: "Health" },
    { value: "beauty", label: "Beauty" },
    { value: "fitness", label: "Fitness" },
    { value: "education", label: "Education" },
    { value: "technology", label: "Technology" },
    { value: "science", label: "Science" },
    { value: "business", label: "Business" },
  ];

  const onSearchChange = (e) => {
    if (e.target.value) {
      setSearchParams({ search: e.target.value });
      setSearch(e.target.value);
    } else {
      navigate("/marketplace");
      setSearch("");
    }
  };
  const toggleSections = (section) => {
    setExpendedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const onFiltersChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const onClearFilters = () => {
    if (search) {
      navigate("/marketplace");
    }
    setFilters({
      platform: null,
      maxPrice: 100000,
      minFollowers: 0,
      niche: null,
      verified: false,
      monetized: false,
    });
  };

  return (
    <div
      className={`${showFilterPhone ? "max-sm:fixed" : "max-sm:hidden"} max-sm:inset-0 z-100 max-sm:h-screen max-sm:overflow-scroll bg-white rounded-lg shadow-sm border border-gray-200 h-fit sticky top-24 md:min-w-[300px]`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-700">
            <Filter className="size-4" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          <div className="flex items-center gap-2">
            <XIcon
              onClick={onClearFilters}
              className="size-6 text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
            />

            <button
              className="sm:hidden text-sm border text-gray-700 px-3 py-1 rounded"
              onClick={() => setShowFilterPhone(false)}
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 sm:max-h-[calc(100vh-200px)] overflow-y-scroll no-scrollbar">
        {/* search bar */}
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search by username, platform, niche, etc."
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md outline-indigo-500"
            onChange={onSearchChange}
            value={search}
          />
        </div>
        {/* platform filter */}
        <div>
          <button
            onClick={() => toggleSections("platform")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-sm font-medium text-gray-800">
              Platform
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${expendedSections.platform && "rotate-180"}`}
            />
          </button>
          {expendedSections.platform && (
            <div className="flex flex-col gap-2">
              {platforms.map((platform, index) => (
                <label
                  key={platform.value}
                  className="flex items-center gap-2 text-gray-700 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={
                      filters.platform?.includes(platform.value) || false
                    }
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const current = filters.platform || [];
                      const updated = checked
                        ? [...current, platform.value]
                        : current.filter((p) => p !== platform.value);
                      onFiltersChange({
                        ...filters,
                        platform: updated.length > 0 ? updated : null,
                      });
                    }}
                  />
                  <span>{platform.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        {/* price range */}
        <div>
          <button
            onClick={() => toggleSections("price")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-sm font-medium text-gray-800">
              Price Range
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${expendedSections.price && "rotate-180"}`}
            />
          </button>
          {expendedSections.price && (
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="100000"
                step="100"
                value={filters.maxPrice || "100000"}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    maxPrice: parseInt(e.target.value),
                  })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{currency}0</span>
                <span>
                  {currency}
                  {(filters.maxPrice || "100000").toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* followers range */}
        <div>
          <button
            onClick={() => toggleSections("followers")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-sm font-medium text-gray-800">
              Minimun Followers
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${expendedSections.followers && "rotate-180"}`}
            />
          </button>
          {expendedSections.followers && (
            <select
              value={filters.minFollowers?.toString() || "0"}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 outline-indigo-500 text-sm"
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  minFollowers: parseInt(e.target.value) || 0,
                })
              }
            >
              <option value="0">Any Amount</option>
              <option value="1000">1K+</option>
              <option value="10000">10K+</option>
              <option value="50000">50K+</option>
              <option value="100000">100K+</option>
              <option value="500000">500K+</option>
              <option value="1000000">1M+</option>
              <option value="10000000">10M+</option>
            </select>
          )}
        </div>
        {/* niche filter */}

        <div>
          <button
            onClick={() => toggleSections("niche")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-sm font-medium text-gray-800">Niche</label>
            <ChevronDown
              className={`size-4 transition-transform ${expendedSections.niche && "rotate-180"}`}
            />
          </button>
          {expendedSections.niche && (
            <select
              value={filters.niche || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 outline-indigo-500 text-sm"
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  niche: e.target.value || null,
                })
              }
            >
              <option value="0">All Niches</option>
              {niches.map((niche) => (
                <option value={niche.value} key={niche.value}>
                  {niche.label}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* verified status */}
        <div>
          <button
            onClick={() => toggleSections("status")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-sm font-medium text-gray-800">
              Account Status
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${expendedSections.status && "rotate-180"}`}
            />
          </button>
          {expendedSections.status && (
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verified || false}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, verified: e.target.checked })
                  }
                />
                <span className="text-sm text-gray-700">
                  Verified accounts only
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.monetized || false}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, monetized: e.target.checked })
                  }
                />
                <span className="text-sm text-gray-700">
                  Monetized accounts only
                </span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
