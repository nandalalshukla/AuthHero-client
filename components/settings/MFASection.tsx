"use client";

import React, { useState } from "react";
import { FiShield, FiShieldOff } from "react-icons/fi";
import { useAuthStore } from "@/stores/auth.store";
import { useMFASetup, useMFAVerify, useMFADisable } from "@/hooks/useAuth";
import type { MFASetupResponse } from "@/lib/auth.api";

// ─── MFASection ───
// Handles the full MFA lifecycle:
//   1. Setup  → shows QR code + backup codes
//   2. Verify → user enters TOTP code to confirm setup
//   3. Disable → user enters current TOTP code to turn off MFA
// State is kept local — no global store needed for the setup flow.

export default function MFASection() {
  const user = useAuthStore((s) => s.user);
  const mfaEnabled = user?.mfaEnabled ?? false;

  if (mfaEnabled) {
    return <DisableMFA />;
  }

  return <EnableMFA />;
}

// ─── Enable MFA Flow ───

function EnableMFA() {
  const [setupData, setSetupData] = useState<MFASetupResponse | null>(null);
  const [verifyCode, setVerifyCode] = useState("");

  const setupMutation = useMFASetup();
  const verifyMutation = useMFAVerify();

  const handleSetup = () => {
    setupMutation.mutate(undefined, {
      onSuccess: (data) => setSetupData(data),
    });
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyCode.trim()) return;
    verifyMutation.mutate(verifyCode, {
      onSuccess: () => {
        setSetupData(null);
        setVerifyCode("");
      },
    });
  };

  // Step 1: Show setup button
  if (!setupData) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-gray-400">
          Add an extra layer of security to your account with a TOTP
          authenticator app.
        </p>
        <button
          onClick={handleSetup}
          disabled={setupMutation.isPending}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 text-white text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <FiShield className="text-base" />
          {setupMutation.isPending ? "Setting up..." : "Enable MFA"}
        </button>
      </div>
    );
  }

  // Step 2: Show QR code, backup codes, and verification input
  return (
    <div className="space-y-5">
      {/* QR Code */}
      <div className="space-y-2">
        <p className="text-sm text-gray-300">
          Scan this QR code with your authenticator app:
        </p>
        <div className="bg-white rounded-xl p-3 w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={setupData.qrCode}
            alt="MFA QR Code"
            width={200}
            height={200}
          />
        </div>
        <p className="text-xs text-gray-500">
          Or enter this secret manually:{" "}
          <code className="text-gray-300 bg-white/10 px-1.5 py-0.5 rounded text-xs">
            {setupData.secret}
          </code>
        </p>
      </div>

      {/* Backup Codes */}
      <div className="space-y-2">
        <p className="text-sm text-gray-300 font-medium">
          Backup codes (save these somewhere safe):
        </p>
        <div className="grid grid-cols-2 gap-2">
          {setupData.backupCodes.map((code) => (
            <code
              key={code}
              className="text-xs text-gray-300 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-center font-mono"
            >
              {code}
            </code>
          ))}
        </div>
      </div>

      {/* Verify Code */}
      <form onSubmit={handleVerify} className="space-y-3">
        <label
          htmlFor="mfa-verify"
          className="block text-sm font-medium text-gray-200"
        >
          Enter the 6-digit code from your app to confirm:
        </label>
        <input
          id="mfa-verify"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ""))}
          placeholder="000000"
          className="w-full bg-transparent border border-white/20 rounded-xl px-3 py-2 text-white placeholder-gray-400 outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all duration-300 tracking-[0.3em] text-center font-mono"
        />
        <button
          type="submit"
          disabled={verifyCode.length !== 6 || verifyMutation.isPending}
          className="w-full py-2 rounded-xl border border-white/20 hover:bg-white/10 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {verifyMutation.isPending ? "Verifying..." : "Verify & Enable MFA"}
        </button>
      </form>
    </div>
  );
}

// ─── Disable MFA Flow ───

function DisableMFA() {
  const [code, setCode] = useState("");
  const disableMutation = useMFADisable();

  const handleDisable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    disableMutation.mutate(code, {
      onSuccess: () => setCode(""),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FiShield className="text-green-400" />
        <span className="text-sm text-green-400 font-medium">
          MFA is currently enabled
        </span>
      </div>

      <form onSubmit={handleDisable} className="space-y-3">
        <label
          htmlFor="mfa-disable"
          className="block text-sm font-medium text-gray-200"
        >
          Enter your current TOTP code to disable MFA:
        </label>
        <input
          id="mfa-disable"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          placeholder="000000"
          className="w-full bg-transparent border border-white/20 rounded-xl px-3 py-2 text-white placeholder-gray-400 outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all duration-300 tracking-[0.3em] text-center font-mono"
        />
        <button
          type="submit"
          disabled={code.length !== 6 || disableMutation.isPending}
          className="flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <FiShieldOff className="text-base" />
          {disableMutation.isPending ? "Disabling..." : "Disable MFA"}
        </button>
      </form>
    </div>
  );
}
