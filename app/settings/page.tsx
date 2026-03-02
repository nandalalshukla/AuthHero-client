"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiLock, FiShield, FiUser } from "react-icons/fi";
import ChangePasswordForm from "@/components/settings/ChangePasswordForm";
import MFASection from "@/components/settings/MFASection";

// ─── Settings Page ───
// Central place for account management. Each section maps to a backend feature.
// Protected client-side — redirects to /login if the user is not authenticated.

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-black/40 backdrop-blur-sm pt-24 pb-10">
      <div className="w-full max-w-xl mx-auto px-4 space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-white tracking-wide">
          Account Settings
        </h1>

        {/* Account Info */}
        <SettingsCard
          id="account"
          icon={<FiUser className="text-lg" />}
          title="Account"
        >
          <div className="space-y-3 text-sm">
                      <InfoRow label="Name" value={user.fullname} />
            <InfoRow label="Email" value={user.email} />
            <InfoRow
              label="Email Verified"
              value={user.emailVerified ? "Yes" : "No"}
            />
            <InfoRow
              label="MFA"
              value={user.mfaEnabled ? "Enabled" : "Disabled"}
            />
            <InfoRow
              label="Member Since"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
          </div>
        </SettingsCard>

        {/* Change Password */}
        <SettingsCard
          id="password"
          icon={<FiLock className="text-lg" />}
          title="Change Password"
        >
          <ChangePasswordForm />
        </SettingsCard>

        {/* MFA */}
        <SettingsCard
          id="mfa"
          icon={<FiShield className="text-lg" />}
          title="Two-Factor Authentication"
        >
          <MFASection />
        </SettingsCard>
      </div>
    </div>
  );
}

// ─── Reusable Sub-components ───

interface SettingsCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function SettingsCard({ id, icon, title, children }: SettingsCardProps) {
  return (
    <section
      id={id}
      className="rounded-2xl border border-white/15 bg-white/[0.02] backdrop-blur-3xl p-6 space-y-5"
    >
      <div className="flex items-center gap-2.5 text-white">
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
