import React, { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
import { useNavigate } from "react-router-dom";
import AccountView from "./AccountView";
import type { Order, Stats, UserProfile } from "./types";

type ViteEnv = { VITE_API_URL?: string };

const AccountPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const baseUrl = ((import.meta as unknown as { env: ViteEnv }).env
    .VITE_API_URL ?? "") as string;

  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const [oRes, sRes] = await Promise.all([
          fetch(`${baseUrl}/account/orders`, { credentials: "include" }),
          fetch(`${baseUrl}/account/stats`, { credentials: "include" }),
        ]);
        if (oRes.ok) setOrders((await oRes.json()) as Order[]);
        if (sRes.ok) setStats((await sRes.json()) as Stats);
      } catch {
        // fallbacks
      } finally {
        setOrders((prev) =>
          prev.length
            ? prev
            : [
                {
                  id: "FWB12546798",
                  date: "2024-12-11",
                  price: 499,
                  status: "in_transit",
                },
                {
                  id: "FWB12546777",
                  date: "2024-11-10",
                  price: 3287,
                  status: "cancelled",
                },
                {
                  id: "FWB12546846",
                  date: "2024-11-07",
                  price: 111,
                  status: "completed",
                },
                {
                  id: "FWB12546212",
                  date: "2024-10-18",
                  price: 756,
                  status: "completed",
                },
              ]
        );
        setStats(
          (prev) =>
            prev ?? {
              ordersMade: 24,
              ordersChangePct: 10.3,
              reviewsAdded: 16,
              reviewsChangePct: 8.6,
              favoritesAdded: 8,
              favoritesChangePct: -12,
              returns: 2,
              returnsChangePct: 50,
            }
        );
      }
    })();
  }, [baseUrl]);

  if (loading || !user || !stats) {
    return (
      <section className="min-h-[60vh] grid place-items-center">
        <div className="text-text.secondary">Загрузка…</div>
      </section>
    );
  }

  const profile: UserProfile = {
    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.email,
    email: user.email,
    avatarUrl: user.avatarUrl ?? undefined,
  };

  return (
    <AccountView
      user={profile}
      stats={stats}
      orders={orders}
      onOrderDetails={(id) => console.log("details", id)}
      onOrderRepeat={(id) => console.log("repeat", id)}
      onOrderCancel={(id) => console.log("cancel", id)}
      onSaveProfile={(data) => console.log("save profile", data)}
    />
  );
};

export default AccountPage;
