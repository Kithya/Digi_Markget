import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderIcon, toast } from "react-hot-toast";
import { Upload, X } from "lucide-react";

const ManageListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userListings } = useSelector((state) => state.listing);
  const [loadingListing, setLoadingListing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    username: "",
    followers_count: "",
    engagement_rate: "",
    monthly_views: "",
    niche: "",
    price: "",
    description: "",
    verified: false,
    monetized: false,
    country: "",
    age_range: "",
    images: [],
  });
  const platform = [
    "youtube",
    "instagram",
    "tiktok",
    "facebook",
    "twitter",
    "linkedin",
    "snapchat",
    "discord",
  ];

  const niche = [
    "fitness",
    "travel",
    "fashion",
    "food",
    "music",
    "beauty",
    "health",
    "gaming",
    "entertainment",
    "sports",
    "news",
    "others",
  ];
  const ageRanges = [
    "13-17 years",
    "18-24 years",
    "25-34 years",
    "35-44 years",
    "45-54 years",
    "55-64 years",
    "65+ years",
    "Mixed years",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (files.length + formData.images > 5) return toast.error("Max 5 images");

    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  if (loadingListing) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderIcon className="size-7 animate-spin text-indigo-600" />
      </div>
    );
  }

  // get listing data for edit if 'id' is provided (edit mode)
  useEffect(() => {
    if (!id) {
      return;
    }

    setIsEditing(true);
    setLoadingListing(true);

    const listing = userListings.find((listing) => listing.id === id);
    if (listing) {
      setFormData(listing);
      setLoadingListing(false);
    } else {
      toast.error("Listing not found");
      navigate("/my-listings");
    }
  }, [id]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {isEditing ? "Edit Listing" : "List Your Account"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditing
              ? "Update your existing account listing"
              : "Createa mock listing to display your account info"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic information */}
          <Section title={"Basic Information"}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Listing Title"
                value={formData.title}
                placeholder={"e.g., Premuim Instagram Account"}
                onChange={(v) => handleInputChange("title", v)}
                required={true}
              />
              <SelectField
                label="Platform *"
                value={formData.platform}
                onChange={(v) => handleInputChange("platform", v)}
                required={true}
                options={platform}
              />
              <InputField
                label="Username/Handle *"
                value={formData.username}
                placeholder={"@username"}
                onChange={(v) => handleInputChange("username", v)}
                required={true}
              />
              <SelectField
                label="Niche/Category *"
                value={formData.niche}
                onChange={(v) => handleInputChange("niche", v)}
                required={true}
                options={platform}
              />
            </div>
          </Section>

          {/* Account metrics */}
          <Section title={"Account Metrics"}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <InputField
                label="Followers Count *"
                type="number"
                min={0}
                value={formData.followers_count}
                placeholder={"10000"}
                onChange={(v) => handleInputChange("followers_count", v)}
                required={true}
              />
              <InputField
                label="Engagement Rate (%)"
                type="number"
                min={0}
                max={100}
                value={formData.engagement_rate}
                placeholder={"10000"}
                onChange={(v) => handleInputChange("engagement_rate", v)}
                required={true}
              />
              <InputField
                label="Monthly Views/Impressions"
                type="number"
                min={0}
                value={formData.monthly_views}
                placeholder={"100000"}
                onChange={(v) => handleInputChange("monthly_views", v)}
                required={true}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Primary Audience Country"
                value={formData.country}
                placeholder={"United States"}
                onChange={(v) => handleInputChange("country", v)}
                required={true}
              />
              <SelectField
                label="Primary Audience Age Range"
                type="number"
                options={ageRanges}
                value={formData.age_range}
                placeholder={"10000"}
                onChange={(v) => handleInputChange("age_range", v)}
              />
            </div>

            <div className="space-y-3">
              <CheckBoxField
                label={"Account is verified on the platform"}
                checked={formData.verified}
                onChange={(v) => handleInputChange("verified", v)}
              />
              <CheckBoxField
                label={"Account is monetized"}
                checked={formData.monetized}
                onChange={(v) => handleInputChange("monetized", v)}
              />
            </div>
          </Section>

          {/* Pricing */}
          <Section title={"Pricing & Description"}>
            <InputField
              label="Asking Price (USD) *"
              type="number"
              min={0}
              value={formData.price}
              placeholder={"1000"}
              onChange={(v) => handleInputChange("price", v)}
              required={true}
            />

            <TextareaField
              label="Description"
              value={formData.description}
              onChange={(v) => handleInputChange("description", v)}
              required={true}
            />
          </Section>

          {/* Images */}
          <Section title={"Screenshots & Proof"}>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
              <label
                htmlFor="images"
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Choose Files
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Upload screenshots or proof of account analytics
              </p>
            </div>
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {formData.images.map((image, index) => (
                  <div className="relative" key={index}>
                    <img
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
                      alt={`image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button onClick={() => removeImage(index)}>
                      <X className="absolute -top-2 -right-2 size-5 bg-red-600 text-white rounded-full hover:bg-red-700" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <div className="flex justify-end gap-3 text-sm">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {isEditing ? "Update Listing" : "Create Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Common element
const Section = ({ title, children }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    {children}
  </div>
);

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  min = null,
  max = null,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      className="w-full px-3 py-1.5 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
      type={type}
      min={min}
      max={max}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      required={required}
    />
  </div>
);

const SelectField = ({ label, options, value, onChange, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      className="w-full px-3 py-1.5 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
      onChange={(e) => onChange(e.target.value)}
      value={value}
      required={required}
    >
      <option className="text-gray-600">Select...</option>
      {options.map((option, index) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const CheckBoxField = ({ label, checked, onChange, required = false }) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.value)}
      className="size-4"
      required={required}
    />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);
const TextareaField = ({ label, value, onChange, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <textarea
      rows={5}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-1.5 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300 resize-none"
      required={required}
    />
  </div>
);

export default ManageListing;
