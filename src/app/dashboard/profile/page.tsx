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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="h1-std mb-1">Profile Settings</h1>
        <p className="p-std text-xs font-bold uppercase tracking-widest opacity-60">
          Manage your SmartlyTap profile details and active links.
        </p>
      </div>

      <div className="card-std p-8 space-y-8">
        {message && (
          <div className="text-[12px] font-black uppercase tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 shadow-inner">
            {message}
          </div>
        )}
 
        {/* Profile Image */}
        <div>
          <label className="label-std mb-3">Profile Identity</label>
          <div className="flex items-center gap-6">
            <div className="relative group">
              {form.profileImage ? (
                <img src={form.profileImage} alt="Profile" className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/10 shadow-md group-hover:scale-105 transition-transform" />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300">
                  <UploadCloud size={24} />
                </div>
              )}
            </div>
            <div className="flex-1 max-w-xs">
              <label className="cursor-pointer bg-white border border-primary/20 text-primary px-4 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center gap-2 shadow-sm w-max active:scale-95">
                <UploadCloud size={14} />
                {uploading ? "Uploading..." : "Change Image"}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              </label>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter mt-2">JPG, PNG or WEBP. Max 2MB.</p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="label-std">Display Name</label>
            <input
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="input-std"
              placeholder="e.g. John Sebastian"
            />
          </div>
          <div className="space-y-1.5">
            <label className="label-std">Business Title</label>
            <input
              value={form.businessName}
              onChange={(e) => onChange("businessName", e.target.value)}
              className="input-std"
              placeholder="e.g. Creative Director"
            />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <label className="label-std">Professional Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => onChange("bio", e.target.value)}
              rows={3}
              className="input-std min-h-[100px] py-3"
              placeholder="Briefly describe your expertise..."
            />
          </div>
          <div className="space-y-1.5">
            <label className="label-std text-primary">WhatsApp (Phone)</label>
            <input
              value={form.whatsapp}
              onChange={(e) => onChange("whatsapp", e.target.value)}
              className="input-std border-primary/10 focus:ring-primary/20"
              placeholder="e.g. +91 9876543210"
            />
          </div>
          <div className="space-y-1.5">
            <label className="label-std text-accent">Instagram Username</label>
            <input
              value={form.instagram}
              onChange={(e) => onChange("instagram", e.target.value)}
              className="input-std border-accent/10 focus:ring-accent/20"
              placeholder="e.g. @username"
            />
          </div>
          <div className="space-y-1.5">
            <label className="label-std">Website URL</label>
            <input
              value={form.website}
              onChange={(e) => onChange("website", e.target.value)}
              className="input-std"
              placeholder="https://yourwebsite.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="label-std text-yellow-600">Google Review Link</label>
            <input
              value={form.googleReview}
              onChange={(e) => onChange("googleReview", e.target.value)}
              className="input-std border-yellow-200 focus:ring-yellow-100"
              placeholder="https://g.page/r/..."
            />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={save}
            disabled={saving || uploading}
            className="btn-primary-std !px-8 !py-3 !text-xs !shadow-lg active:scale-95 flex items-center gap-2"
          >
            <Save size={14} />
            {saving ? "Synchronizing..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

