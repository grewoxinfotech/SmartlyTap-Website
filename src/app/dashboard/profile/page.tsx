"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { Save, UploadCloud } from "lucide-react";

export default function DashboardProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState<any>({
    userId: "",
    name: "",
    businessName: "",
    bio: "",
    profileImage: "",
    whatsapp: "",
    instagram: "",
    website: "",
    googleReview: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (!storedUser) return;
    const user = JSON.parse(storedUser);

    apiClient
      .get(`/profiles/${user.id}`)
      .then((res) => {
        const p = res.data.data.profile || {};
        setForm((prev: any) => ({
          ...prev,
          userId: user.id,
          name: p.name || "",
          businessName: p.businessName || "",
          bio: p.bio || "",
          profileImage: p.profileImage || "",
          whatsapp: p.whatsapp || "",
          instagram: p.instagram || "",
          website: p.website || "",
          googleReview: p.googleReview || "",
        }));
      })
      .catch(() => {
        setForm((prev: any) => ({ ...prev, userId: user.id }));
      })
      .finally(() => setLoading(false));
  }, []);

  const onChange = (key: string, value: string) => {
    setForm((p: any) => ({ ...p, [key]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await apiClient.post("/upload/profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((p: any) => ({ ...p, profileImage: res.data.data.url }));
      setMessage("Image uploaded successfully.");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      await apiClient.put("/profiles/update", form);
      setMessage("Profile updated successfully.");
    } catch (e: any) {
      setMessage(e?.response?.data?.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Profile Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your SmartlyTap profile details and links.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        {message && (
          <div className="text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
            {message}
          </div>
        )}

        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
          <div className="flex items-center gap-4">
            {form.profileImage ? (
              <img src={form.profileImage} alt="Profile" className="w-20 h-20 rounded-full object-cover border border-gray-200" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <label className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-2">
              <UploadCloud size={16} />
              {uploading ? "Uploading..." : "Upload New Image"}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <input
              value={form.businessName}
              onChange={(e) => onChange("businessName", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Acme Corp"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => onChange("bio", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Tell us about yourself..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp URL</label>
            <input
              value={form.whatsapp}
              onChange={(e) => onChange("whatsapp", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://wa.me/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
            <input
              value={form.instagram}
              onChange={(e) => onChange("instagram", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
            <input
              value={form.website}
              onChange={(e) => onChange("website", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Google Review URL</label>
            <input
              value={form.googleReview}
              onChange={(e) => onChange("googleReview", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://g.page/r/..."
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={save}
            disabled={saving || uploading}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition flex items-center gap-2 font-medium disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

